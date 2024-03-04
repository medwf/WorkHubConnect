"use client"
import React, { useState } from 'react';
import FancyCarousel from "react-fancy-circular-carousel";
import 'react-fancy-circular-carousel/FancyCarousel.css';


const images = [
  "/assets/29.jpg",
    "https://avatars.githubusercontent.com/u/98237827?s=400&u=c7da025694959b078c6b3e2e37a5a220dc33aea9&v=4",
    "https://avatars.githubusercontent.com/u/98237827?s=400&u=c7da025694959b078c6b3e2e37a5a220dc33aea9&v=4",
    "https://avatars.githubusercontent.com/u/98237827?s=400&u=c7da025694959b078c6b3e2e37a5a220dc33aea9&v=4",
];

const CircularCarousel: React.FC = () => {
    const [focusElement, setFocusElement] = useState<number>(0);
    const info: (JSX.Element | string)[] = [ 'Mumbai', 'Bengaluru', 'Kolkata', 'gujarat', 'vadodara', 'anand'];

    return (
        <div className="carousel flex justify-between">
            <div className="main">
                <FancyCarousel
                    images={images}
                    setFocusElement={setFocusElement}
                    carouselRadius={200}
                    peripheralImageRadius={70}
                    centralImageRadius={50}
                    focusElementStyling={{ border: '2px solid #ba4949' }}
                    autoRotateTime={5}
                    borderWidth={4}
                    borderHexColor={'1c364f'}
                />
                
            </div>
            <div className="info-box-wrapper ml-32 w-[60vw] border ">
                    <p> {info[focusElement]} </p>
                </div>
        </div>
    );
}

export default CircularCarousel;
