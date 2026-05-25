"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export type ProductImage = {
  id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
};

interface Props {
  productId: string;
  initialImages: ProductImage[];
}

export default function ProductImageGallery({ productId, initialImages }: Props) {
  const [images, setImages] = useState<ProductImage[]>(
    [...initialImages].sort((a, b) => a.sort_order - b.sort_order)
  );
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [orderDirty, setOrderDirty] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(""), 4000);
  };

  // ── Upload ──────────────────────────────────────────────────────────────
  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (!fileArray.length) return;

      setUploading(true);
      setUploadMsg(`Uploading ${fileArray.length} image${fileArray.length > 1 ? "s" : ""}…`);
      setError("");

      const formData = new FormData();
      for (const f of fileArray) formData.append("file", f);

      try {
        const res = await fetch(`/api/admin/products/${productId}/images`, {
          method: "POST",
          body: formData,
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Upload failed");

        const newImages: ProductImage[] = json.uploaded ?? [];
        setImages((prev) =>
          [...prev, ...newImages].sort((a, b) => a.sort_order - b.sort_order)
        );
        setUploadMsg(`✓ ${newImages.length} image${newImages.length !== 1 ? "s" : ""} uploaded`);
        setTimeout(() => setUploadMsg(""), 3000);
      } catch (err) {
        showError(String(err));
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [productId]
  );

  // ── Delete ──────────────────────────────────────────────────────────────
  const handleDelete = async (img: ProductImage) => {
    if (!window.confirm("Delete this image? This cannot be undone.")) return;
    setError("");

    try {
      const res = await fetch(`/api/admin/products/${productId}/images`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: img.id, url: img.url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Delete failed");

      // Re-sequence locally
      setImages((prev) => {
        const next = prev.filter((i) => i.id !== img.id);
        return next.map((i, idx) => ({ ...i, sort_order: idx }));
      });
      setOrderDirty(false);
    } catch (err) {
      showError(String(err));
    }
  };

  // ── Reorder (move up / move down) ───────────────────────────────────────
  const move = (index: number, direction: -1 | 1) => {
    const next = [...images];
    const swapIdx = index + direction;
    if (swapIdx < 0 || swapIdx >= next.length) return;
    [next[index], next[swapIdx]] = [next[swapIdx], next[index]];
    setImages(next.map((img, i) => ({ ...img, sort_order: i })));
    setOrderDirty(true);
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}/images`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: images.map((i) => i.id) }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Reorder failed");
      setOrderDirty(false);
    } catch (err) {
      showError(String(err));
    } finally {
      setSavingOrder(false);
    }
  };

  // ── Drag & drop on upload zone ───────────────────────────────────────────
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    uploadFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      {/* Error banner */}
      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          ✗ {error}
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 ? (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1917]">
              {images.length} image{images.length !== 1 ? "s" : ""} — drag to reorder
            </p>
            {orderDirty && (
              <button
                onClick={saveOrder}
                disabled={savingOrder}
                className="flex items-center gap-2 bg-[#C8A882] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0F2647] hover:bg-[#B8976F] transition-colors disabled:opacity-60"
              >
                {savingOrder ? "Saving…" : "✓ Save order"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img, index) => (
              <div
                key={img.id}
                className={`relative group border-2 bg-white overflow-hidden ${
                  index === 0
                    ? "border-[#C8A882]"
                    : "border-[#E5E4E0] hover:border-[#939EBA]"
                } transition-colors`}
              >
                {/* Primary badge */}
                {index === 0 && (
                  <div className="absolute top-1.5 left-1.5 z-10 bg-[#C8A882] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0F2647]">
                    Primary
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-square bg-[#F8F8F7]">
                  <Image
                    src={img.url}
                    alt={img.alt_text ?? "Product image"}
                    fill
                    className="object-contain p-1"
                    sizes="200px"
                    unoptimized
                  />
                </div>

                {/* Controls — visible on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  {/* Reorder arrows */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      title="Move left / make more primary"
                      className="flex h-7 w-7 items-center justify-center bg-white/90 text-[#0F2647] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs font-bold"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => move(index, 1)}
                      disabled={index === images.length - 1}
                      title="Move right"
                      className="flex h-7 w-7 items-center justify-center bg-white/90 text-[#0F2647] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs font-bold"
                    >
                      →
                    </button>
                  </div>

                  {/* Make primary */}
                  {index > 0 && (
                    <button
                      onClick={() => {
                        const next = [...images];
                        const [moved] = next.splice(index, 1);
                        next.unshift(moved);
                        setImages(next.map((img, i) => ({ ...img, sort_order: i })));
                        setOrderDirty(true);
                      }}
                      className="bg-[#C8A882] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0F2647] hover:bg-[#B8976F] transition-colors"
                    >
                      ★ Make primary
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(img)}
                    className="bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors"
                  >
                    ✕ Delete
                  </button>
                </div>

                {/* Sort order label */}
                <div className="border-t border-[#E5E4E0] bg-[#F8F8F7] px-2 py-1 text-center text-[10px] text-[#939EBA]">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-2 text-xs text-[#939EBA]">
            Hover an image to move, set as primary, or delete. Click "Save order" after reordering.
          </p>
        </div>
      ) : (
        <div className="border border-dashed border-[#D0CFC9] bg-[#F8F8F7] py-10 text-center">
          <p className="text-sm text-[#939EBA]">No images yet — upload below</p>
        </div>
      )}

      {/* Upload zone */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1917] mb-3">
          Upload images
        </p>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative cursor-pointer border-2 border-dashed transition-colors px-6 py-10 text-center ${
            isDragOver
              ? "border-[#C8A882] bg-[#FFF8EE]"
              : uploading
              ? "border-[#E5E4E0] bg-[#F8F8F7] cursor-not-allowed"
              : "border-[#D0CFC9] hover:border-[#C8A882] hover:bg-[#FFF8EE]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C8A882] border-t-transparent" />
              <p className="text-sm font-medium text-[#C8A882]">{uploadMsg}</p>
              <p className="text-xs text-[#939EBA]">
                Resizing to 800×800 WebP — please wait…
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <svg
                className="h-8 w-8 text-[#D0CFC9]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M16.5 3.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
              <p className="text-sm font-medium text-[#1A1917]">
                Drop images here or click to browse
              </p>
              <p className="text-xs text-[#939EBA]">
                JPG, PNG, WebP, HEIC — any size — automatically resized to 800×800 WebP
              </p>
              {uploadMsg && (
                <p className="text-xs font-semibold text-emerald-600">{uploadMsg}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="border border-[#E5E4E0] bg-[#F8F8F7] px-4 py-3 text-xs text-[#6B6966] space-y-1">
        <p className="font-semibold text-[#1A1917]">Image tips</p>
        <p>• First image (Primary) is the card thumbnail shown in the shop and brand pages.</p>
        <p>• All uploads are automatically converted to 800×800 WebP with white padding.</p>
        <p>• You can upload multiple images at once by selecting several files.</p>
        <p>• After reordering, click <strong>Save order</strong> to apply changes.</p>
      </div>
    </div>
  );
}
