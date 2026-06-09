"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  defaultImage: string;
  defaultAlt: string;
  onImageUrlChange: (url: string) => void;
  onImageAltChange: (alt: string) => void;
}

export default function TreatmentCardImageField({
  slug,
  imageUrl,
  imageAlt,
  defaultImage,
  defaultAlt,
  onImageUrlChange,
  onImageAltChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const preview = imageUrl || defaultImage;
  const isRemote = preview.startsWith("http");

  const handleUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`/api/admin/treatments/${slug}/card-image`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      onImageUrlChange(json.url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden border border-[#E5E4E0] bg-[#F7F7F8]">
        <Image
          src={preview}
          alt={imageAlt || defaultAlt}
          fill
          className="object-cover"
          sizes="400px"
          unoptimized={isRemote}
        />
      </div>

      <p className="text-xs text-[#6B6966]">
        Shown on the <strong className="text-[#1A1917]">homepage</strong> treatment grid and{" "}
        <strong className="text-[#1A1917]">/treatments</strong>. Use a{" "}
        <strong className="text-[#1A1917]">4:3 landscape</strong> image (auto-cropped on upload).
      </p>

      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUpload(f);
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="bg-[#0F2647] text-white text-xs font-semibold uppercase tracking-widest px-4 py-2.5 hover:bg-[#1B3D6E] transition-colors disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload new card image"}
        </button>
        {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium text-[#6B6966] mb-1">Image URL (optional override)</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => onImageUrlChange(e.target.value)}
          className="w-full border border-[#E5E4E0] px-3 py-2 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none"
          placeholder={defaultImage}
        />
        <p className="mt-1 text-xs text-[#6B6966]">
          Upload saves to Supabase Storage (works on live Vercel). Leave blank to use the default site image path.
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#6B6966] mb-1">Image alt text (accessibility &amp; SEO)</label>
        <input
          type="text"
          value={imageAlt}
          onChange={(e) => onImageAltChange(e.target.value)}
          className="w-full border border-[#E5E4E0] px-3 py-2 text-sm text-[#1A1917] focus:border-[#939EBA] focus:outline-none"
          placeholder={defaultAlt}
        />
      </div>
    </div>
  );
}
