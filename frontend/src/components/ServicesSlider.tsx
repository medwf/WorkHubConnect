import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MaxWidthWrapper from "./MaxWidthWrapper";

const services = [
    {
      title: "Web Design",
      description: "Web Design",
      image: "/assets/hero.jpg",
    },
    {
        title: "Web Design",
        description: "Web Design",
        image: "/assets/hero.jpg",
    },
    {
        title: "Web Design",
        description: "Web Design",
        image: "/assets/hero.jpg",
    },
    {
        title: "Web Design",
        description: "Web Design",
        image: "/assets/hero.jpg",
    }
]


export default function ServicesSlider() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )
    return (
      <>
        <MaxWidthWrapper>
          <Carousel
         plugins={[plugin.current]}
         className="w-full"
         onMouseEnter={plugin.current.stop}
         onMouseLeave={plugin.current.reset}
          
          >
            <CarouselContent className="-ml-1">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="absolute text-2xl font-semibold">{service.title}</span>
                        <Image src={service.image} alt={service.title}  width={1500} height={1500} className="relative object-contain w-full"/>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
              
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </MaxWidthWrapper>
      </>
    );
  }