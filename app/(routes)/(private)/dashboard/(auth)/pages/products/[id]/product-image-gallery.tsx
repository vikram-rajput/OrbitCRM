"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Card, CardContent } from "@/components/ui/card";

export default function ProductImageGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const images = [
    `https://bundui-images.netlify.app/products/01.jpeg`,
    `https://bundui-images.netlify.app/products/02.jpeg`,
    `https://bundui-images.netlify.app/products/03.jpeg`,
    `https://bundui-images.netlify.app/products/04.jpeg`,
    `https://bundui-images.netlify.app/products/05.jpeg`,
    `https://bundui-images.netlify.app/products/06.jpeg`
  ];

  return (
    <div className="sticky top-20 space-y-4">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "var(--primary)",
            "--swiper-pagination-color": "var(--primary)"
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2">
        {images.map((image, key) => (
          <SwiperSlide key={key}>
            <Image
              src={image}
              className="aspect-3/2 w-full rounded-lg object-contain lg:aspect-square"
              width={300}
              height={300}
              alt="shadcn/ui"
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-2">
        {images.map((image, key) => (
          <SwiperSlide key={key} className="group">
            <figure className="group-[.swiper-slide-thumb-active]:border-primary overflow-hidden rounded-lg border opacity-70 group-[.swiper-slide-thumb-active]:opacity-100!">
              <Image
                className="aspect-square w-full object-contain"
                src={image}
                width={300}
                height={300}
                alt="shadcn/ui"
                unoptimized
              />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
