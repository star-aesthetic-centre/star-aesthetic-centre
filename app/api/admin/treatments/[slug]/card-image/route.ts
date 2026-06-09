export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import sharp from "sharp";
import { TREATMENT_SLUG_TO_CATEGORY } from "@/lib/treatment-routes";

function isAdmin(req: NextRequest) {
  return req.cookies.get("admin_session")?.value === "authenticated";
}

type Params = { params: Promise<{ slug: string }> };

/** POST — upload 4:3 WebP treatment grid card image to Supabase Storage */
export async function POST(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const supabase = createSupabaseAdmin();

  const { data: treatment, error: tErr } = await supabase
    .from("treatments")
    .select("slug, title")
    .eq("slug", slug)
    .single();

  if (tErr || !treatment) {
    return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const webpBuffer = await sharp(buffer)
    .resize(1200, 900, { fit: "cover", position: "centre" })
    .webp({ quality: 85 })
    .toBuffer();

  const storagePath = `treatment-cards/${slug}.webp`;

  const { error: upErr } = await supabase.storage
    .from("product-images")
    .upload(storagePath, webpBuffer, { contentType: "image/webp", upsert: true });

  if (upErr) {
    console.error("Treatment card upload error:", upErr.message);
    return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  const { data: pub } = supabase.storage.from("product-images").getPublicUrl(storagePath);
  const publicUrl = pub.publicUrl;

  const { error: dbErr } = await supabase
    .from("treatments")
    .update({ card_image: publicUrl })
    .eq("slug", slug);

  if (dbErr) {
    return NextResponse.json({ error: dbErr.message }, { status: 500 });
  }

  const category = TREATMENT_SLUG_TO_CATEGORY[slug] ?? "skin";
  revalidatePath("/");
  revalidatePath("/treatments");
  revalidatePath(`/treatments/${category}/${slug}`);
  revalidatePath("/admin/treatments");
  revalidatePath(`/admin/treatments/${slug}/edit`);

  return NextResponse.json({ url: publicUrl });
}
