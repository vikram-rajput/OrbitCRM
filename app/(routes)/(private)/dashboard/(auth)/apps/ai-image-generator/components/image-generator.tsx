"use client";

import React from "react";
import { Wand2, DownloadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";

import { ImageGeneratorForm, GenerationParams } from "./image-generator-form";
import { ImageGallery, GeneratedImage } from "./image-gallery";
import HistorySheet from "./history-sheet";

export default function ImageGenerator() {
  const [images, setImages] = React.useState<GeneratedImage[]>([
    {
      id: "sample-1",
      url: "https://picsum.photos/512/512?random=1001",
      prompt:
        "A majestic mountain landscape at sunset with golden light reflecting on a pristine lake",
      style: "realistic",
      aspectRatio: "1:1",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "sample-2",
      url: "https://picsum.photos/512/512?random=1002",
      prompt: "Cyberpunk cityscape with neon lights and flying cars in a futuristic metropolis",
      style: "digital-art",
      aspectRatio: "1:1",
      createdAt: new Date(Date.now() - 60 * 60 * 1000)
    },
    {
      id: "sample-3",
      url: "https://picsum.photos/512/512?random=1003",
      prompt: "Adorable corgi puppy playing in a field of colorful wildflowers on a sunny day",
      style: "photographic",
      aspectRatio: "1:1",
      createdAt: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: "sample-4",
      url: "https://picsum.photos/512/512?random=1004",
      prompt: "Abstract geometric patterns with vibrant colors and flowing organic shapes",
      style: "abstract",
      aspectRatio: "1:1",
      createdAt: new Date(Date.now() - 15 * 60 * 1000)
    }
  ]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [mobileFormOpen, setMobileFormOpen] = React.useState(false);

  const handleGenerate = async (params: GenerationParams) => {
    setIsGenerating(true);

    try {
      // Simulate image generation (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock images
      const newImages: GeneratedImage[] = Array.from({ length: params.count }, (_, index) => ({
        id: `${Date.now()}-${index}`,
        url: `https://picsum.photos/512/512?random=${Date.now() + index}`,
        prompt: params.prompt,
        style: params.style,
        aspectRatio: params.aspectRatio,
        seed: params.seed || undefined,
        createdAt: new Date()
      }));

      setImages((prev) => [...newImages, ...prev]);
      setMobileFormOpen(false); // Close mobile form after generation
      toast.success(`Generated ${params.count} image${params.count > 1 ? "s" : ""} successfully!`);
    } catch (error) {
      toast.error("Failed to generate images. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Image deleted successfully");
  };

  const handleDownload = async (image: GeneratedImage) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-image-${image.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const handleDownloadAll = async () => {
    if (images.length === 0) {
      toast.error("No images to download");
      return;
    }

    toast.promise(Promise.all(images.map((image) => handleDownload(image))), {
      loading: "Downloading all images...",
      success: "All images downloaded successfully!",
      error: "Failed to download some images"
    });
  };

  return (
    <>
      <div className="grid h-[calc(100vh-var(--header-height)-3rem)] grid-cols-1 gap-4 lg:grid-cols-[400px_1fr]">
        <div className="lg:col-span-2">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="from-primary to-primary-glow flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br lg:size-10">
                <span className="text-primary-foreground text-lg font-bold">AI</span>
              </div>
              <div>
                <h1 className="font-bold lg:text-xl">AI Image Generator</h1>
                <p className="text-muted-foreground hidden text-sm sm:block">
                  Create stunning images with artificial intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* mobile generator form */}
              <Drawer
                open={mobileFormOpen}
                onOpenChange={setMobileFormOpen}
                repositionInputs={false}>
                <DrawerTrigger asChild className="flex lg:hidden">
                  <Button variant="default" size="sm">
                    <Wand2 />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Generate Image</DrawerTitle>
                    <DrawerDescription>Create stunning AI-generated images</DrawerDescription>
                  </DrawerHeader>
                  <div className="overflow-y-auto lg:mt-6 lg:h-[calc(90vh-120px)]">
                    <ImageGeneratorForm onGenerate={handleGenerate} isGenerating={isGenerating} />
                  </div>
                </DrawerContent>
              </Drawer>

              {images.length > 0 && (
                <Button variant="outline" size="sm" onClick={handleDownloadAll}>
                  <DownloadCloud />
                  <span className="hidden lg:inline">Download All</span>
                </Button>
              )}

              <HistorySheet />
            </div>
          </header>
        </div>

        <div className="hidden h-full min-h-0 lg:block">
          <ImageGeneratorForm onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>

        <div className="min-h-0">
          <ImageGallery
            images={images}
            isGenerating={isGenerating}
            onDeleteImage={handleDeleteImage}
          />
        </div>
      </div>
    </>
  );
}
