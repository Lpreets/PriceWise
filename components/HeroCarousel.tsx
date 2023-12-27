"use client"

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
    { imgUrL: "/assets/images/hero-1.svg", alt: "smartwatch" },
    { imgUrL: "/assets/images/hero-2.svg", alt: "bag" },
    { imgUrL: "/assets/images/hero-3.svg", alt: "lamp" },
    { imgUrL: "/assets/images/hero-4.svg", alt: "air fryer" },
    { imgUrL: "/assets/images/hero-5.svg", alt: "chair" },
]

const HeroCarousel = () => {
  return (
    <div>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
            <Image 
                src={image.imgUrL}
                alt={image.alt}
                width={484}
                height={484}
                className="object-contain"
                key={image.alt}
            />
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
