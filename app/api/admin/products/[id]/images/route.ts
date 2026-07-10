export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import sharp from "sharp";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/security/admin-auth";

async function isAdmin(req: NextRequest): Promise<boolean> {
  return isValidAdminSession(req.cookies.get(ADMIN_COOKIE)?.value);
}

type Params = { params: Promise<{ id: string }> };

/** Extract the storage path from a Supabase public URL */
function extractStoragePath(publicUrl: string): string {
  const match = publicUrl.match(/\/product-images\/(.+)$/);
  return match ? match[1] : "";
}

// ── POST: upload one or more images ──────────────────────────────────────────
export async function POST(req: NextRequest, { params }: Params) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: productId } = await params;
  const supabase = createSupabaseAdmin();

  const { data: product, error: pErr } = await supabase
    .from("products")
    .select("id, slug, brand_slug, name")
    .eq("id", productId)
    .single();

  if (pErr || !product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const formData = await req.formData();
  const files = formData.getAll("file") as File[];
  if (!files.length)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  // Current max sort_order
  const { data: existing } = await supabase
    .from("product_images")
    .select("sort_order")
    .eq("product_id", productId)
    .order("sort_order", { ascending: false })
    .limit(1);

  let nextSort = (existing?.[0]?.sort_order ?? -1) + 1;

  // Storage folder — mirrors the upload script convention
  const slugWithoutBrand = product.slug.replace(
    new RegExp(`^${product.brand_slug}-`),
    ""
  );
  const folderPath = `${product.brand_slug}/${slugWithoutBrand}`;

  const uploaded: Array<{ id: string; url: string; alt_text: string; sort_order: number }> = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const webpBuffer = await sharp(buffer)
      .resize(800, 800, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .webp({ quality: 85 })
      .toBuffer();

    const filename = `${slugWithoutBrand}-admin-${Date.now()}-${nextSort}.webp`;
    const storagePath = `${folderPath}/${filename}`;

    const { error: upErr } = await supabase.storage
      .from("product-images")
      .upload(storagePath, webpBuffer, { contentType: "image/webp", upsert: false });

    if (upErr) {
      console.error("Storage upload error:", upErr.message);
      continue;
    }

    const { data: pub } = supabase.storage
      .from("product-images")
      .getPublicUrl(storagePath);

    const { data: imgRow, error: insErr } = await supabase
      .from("product_images")
      .insert({
        product_id: productId,
        url: pub.publicUrl,
        alt_text: `${product.name} — view ${nextSort + 1}`,
        sort_order: nextSort,
      })
      .select("id, url, alt_text, sort_order")
      .single();

    if (!insErr && imgRow) {
      uploaded.push(imgRow);
      nextSort++;
    }
  }

  return NextResponse.json({ uploaded });
}

// ── DELETE: remove one image ──────────────────────────────────────────────────
export async function DELETE(req: NextRequest, { params }: Params) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: productId } = await params;
  const { imageId, url } = (await req.json()) as { imageId: string; url: string };

  const supabase = createSupabaseAdmin();

  // Remove from Supabase Storage
  const storagePath = extractStoragePath(url);
  if (storagePath) {
    await supabase.storage.from("product-images").remove([storagePath]);
  }

  // Delete DB row
  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId)
    .eq("product_id", productId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Re-sequence sort_order for remaining images
  const { data: remaining } = await supabase
    .from("product_images")
    .select("id")
    .eq("product_id", productId)
    .order("sort_order");

  if (remaining?.length) {
    for (let i = 0; i < remaining.length; i++) {
      await supabase
        .from("product_images")
        .update({ sort_order: i })
        .eq("id", remaining[i].id);
    }
  }

  return NextResponse.json({ success: true });
}

// ── PATCH: reorder images ─────────────────────────────────────────────────────
export async function PATCH(req: NextRequest, { params }: Params) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: productId } = await params;
  const { orderedIds } = (await req.json()) as { orderedIds: string[] };

  const supabase = createSupabaseAdmin();

  for (let i = 0; i < orderedIds.length; i++) {
    await supabase
      .from("product_images")
      .update({ sort_order: i })
      .eq("id", orderedIds[i])
      .eq("product_id", productId);
  }

  return NextResponse.json({ success: true });
}
