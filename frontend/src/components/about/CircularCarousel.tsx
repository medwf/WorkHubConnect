"use client"
import React, { useState } from 'react';
import FancyCarousel from "react-fancy-circular-carousel";
import 'react-fancy-circular-carousel/FancyCarousel.css';
import { FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';
import { FaLinkedin } from "react-icons/fa";


const carouselData = [
    {
        name: "Mohamed Wafi",
        title: "Back-end Developer & DevOps",
        description: "will be involved in both front-end and back-end development, ensuring the entire application is well-built and functional. Additionally, as a DevOps engineer, they will focus on the deployment, automation, and maintenance of the project infrastructure.",
        twitter:"https://twitter.com/medwf95",
        github:"https://github.com/medwf",
        linkedin: "https://www.linkedin.com/in/mohamed-wafi-a65277273/",
        whatsapp: "http://wa.me/212663350206",

        
      
    },
    {
        name: "Aboubakr Taibi",
        title: "Back-end Developer & DevOps",
        description: "As a Back-end Developer and DevOps engineer, I am committed to ensuring seamless functionality and efficiency in application development. In my role as a DevOps engineer, I focus on deployment, automation, and maintenance of the project infrastructure.",
        twitter:"https://twitter.com/aboubakr_taibi",
        github: "https://github.com/TaibiAboubakr",
        linkedin: "https://www.linkedin.com/in/aboubakr-taibi-ba5b25149/",
        whatsapp: "http://wa.me/212626003679",
    },
    {
        name: "Essalhi Mustapha",
        title: "Front-end web developer",
        description: "As a frontend developer in this project, my role revolves around crafting the user-facing aspects of the application using Next.js, TypeScript, Redux, Axios, and related technologies. I'm tasked with creating dynamic and responsive interfaces leveraging the power of Next.js's server-side rendering and routing capabilities. TypeScript comes into play to ensure type safety and code reliability, enabling smoother collaboration and scalability.",
        twitter:"https://twitter.com/essalhi_007",
        github: "https://github.com/MEKuroko007",
        linkedin: "linkedin.com/in/essalhi-mustapha-92751a226",
        whatsapp: "http://wa.me/212650130228",
    }
];

const images = [
    "https://avatars.githubusercontent.com/u/131307716?v=4",
    "https://avatars.githubusercontent.com/Taibiaboubakr?s=400&u=777370e7f03dad6a7156793ab67da4138015fd63&v=4",
    "https://avatars.githubusercontent.com/u/98237827?s=400&u=c7da025694959b078c6b3e2e37a5a220dc33aea9&v=4",
];

const CircularCarousel: React.FC = () => {
    const [focusElement, setFocusElement] = useState<number>(0);

    return (
        <div className="carousel flex justify-between">
            <div className="main">
                <FancyCarousel
                    images={images}
                    setFocusElement={setFocusElement}
                    carouselRadius={200}
                    peripheralImageRadius={70}
                    centralImageRadius={1}
                    focusElementStyling={{ border: '2px solid #ba4949' } }
                    autoRotateTime={10}
                    borderWidth={4}
                    borderHexColor={'1c364f'}
                    offsetAngle={270}
                />
            </div>
            <div className="info-box-wrapper ml-32 w-[70vw] h-full  my-16 p-5">
                
                        <h1 className='font-bold font-poppins text-4xl text-center'>Team</h1>
                        <p className='text-muted-foreground text-center font-poppins text-sm mb-6'>ALX Students</p>
                        
                
                <div className='flex flex-col'>
                    <h1 className='font-medium font-poppins md:text-5xl text-gray-950'>
                        {carouselData[focusElement].name}
                    </h1>
                    <h3 className='pb-2 font-semibold font-poppins text-gray-800'>
                        {carouselData[focusElement].title}
                    </h3>
                    <p className='text-sm font-medium pr-20 pl-2'>
                        {carouselData[focusElement].description}
                    </p>
                </div>
                <div className='flex gap-4 justify-center mx-10 w-full h-full mt-20'>
                    <Link href={carouselData[focusElement].twitter}>
                <BsTwitterX className='text-4xl hover:text-blue-500' />

                    </Link>
                    <Link href={carouselData[focusElement].github}>
                <FaGithub className='text-4xl hover:text-gray-700'/>
                    
                    </Link>
                    <Link href={carouselData[focusElement].whatsapp}>
                <FaWhatsapp className='text-4xl hover:text-green-500' />
                    
                    </Link>
                    <Link href={carouselData[focusElement].linkedin}>
                <FaLinkedin  className='text-4xl hover:text-blue-500' />
                    
                    </Link>
                
                </div>
            </div>
        </div>
    );
}

export default CircularCarousel;
