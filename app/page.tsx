"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import localImages from "@/lib/images.json";

function formatFileId(id: number): string {
  return `EFTA${id.toString().padStart(8, "0")}`;
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<(typeof localImages)[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold tracking-tight">
            Epstein Files Browser
          </h1>
          <a
            href="https://github.com/VineeTagarwaL-code/epstein-new-images"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </header>

      <div className="border-b border-border bg-background">
        <div className="container mx-auto flex items-center gap-3 px-6 py-3">
          <span className="text-sm text-muted-foreground">
            {localImages.length} files
          </span>
        </div>
      </div>

      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {localImages.map((image) => (
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
      </main>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl overflow-hidden p-0">
          <DialogTitle className="sr-only">
            {selectedImage?.alt || "Image"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Full size image view
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
    </div>
  );
}
