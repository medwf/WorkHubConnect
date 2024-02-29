import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

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
    title: "CARPENTER",
    description: "Web Design",
    image: "/servicesImg/carpenter - woodworker.jpg",
  },
  {
    title: "CLEANING THE HOUSE",
    description: "Web Design",
    image: "/servicesImg/cleaning the house.jpg",
  },
  {
    title: "CONSTRUCTION",
    description: "Web Design",
    image: "/servicesImg/Construction 1.jpg",
  },
  {
    title: "ELECTRICIEN",
    description: "Web Design",
    image: "/servicesImg/Electrician.jpg",
  },
  {
    title: "GARDNER",
    description: "Web Design",
    image: "/servicesImg/Gardner.jpg",
  },
  {
    title: "INFORMATICIEN",
    description: "Web Design",
    image: "/servicesImg/Informaticien.jpg",
  },
  {
    title: "Plomber",
    description: "Web Design",
    image: "/servicesImg/Plomber.jpg",
  },
];

export default function ServicesSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
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
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className=" relative flex aspect-square items-start justify-start p-0 bg-transparent">
                      <span className="absolute p-2 text-xl font-bold text-white font-poppins bg-slate-800 bg-opacity-10 rounded-br-md ">
                        {service.title}
                      </span>
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={1500}
                        height={1500}
                        className=" h-full w-full object-cover object-center rounded-md"
                      />
                      
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
