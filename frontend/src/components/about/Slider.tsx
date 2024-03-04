"use client"
import React, { useRef, useState } from "react";
import Image from "next/image";

const Slider = () => {
  const images = [
    "https://avatars.githubusercontent.com/u/98237827?s=400&u=c7da025694959b078c6b3e2e37a5a220dc33aea9&v=4",
    "https://avatars.githubusercontent.com/u/98237827?s=400&u=c7da025694959b078c6b3e2e37a5a220dc33aea9&v=4",
    "https://avatars.githubusercontent.com/u/98237827?s=400&u=c7da025694959b078c6b3e2e37a5a220dc33aea9&v=4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const rotate = () => {
    const angle = (360 / images.length) * currentIndex;
    return `rotate(${angle}deg)`;
  };

  return (
    <div className="h-full w-full relative">
      <div
        className="w-18 h-18 rounded-full p-2 border absolute top-4 left-4 shadow-lg"
        style={{ transform: rotate() }}
        ref={sliderRef}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{ transform: `rotate(${360 / images.length * index}deg)` }}
          >
            <Image
              src={image}
              width={200}
              height={200}
              alt={`github image ${index}`}
              className="object-contain rounded-full"
            />
          </div>
        ))}
      </div>
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2" onClick={handlePrev}>
        Prev
      </button>
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Slider;
