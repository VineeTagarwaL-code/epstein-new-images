"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import images from "@/lib/images.json";

function formatFileId(id: number): string {
  return `EFTA${id.toString().padStart(8, "0")}`;
}

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded border border-border bg-muted transition-transform group-hover:scale-[1.02]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-opacity group-hover:opacity-90"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              />
            </div>
            <p className="mt-2 text-sm text-foreground">
              {formatFileId(image.id)}
            </p>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedImage?.alt || "Image"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedImage?.alt || "Full size image view"}
          </DialogDescription>
          {selectedImage && (
            <div className="relative aspect-video w-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
