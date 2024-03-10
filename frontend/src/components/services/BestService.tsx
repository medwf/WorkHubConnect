import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MaxWidthWrapper from "../MaxWidthWrapper";
import domain from "@/helpers/constants";
import axios from "axios";
import { useState, useEffect } from "react";

// const services = [
//   {
//     title: "CARPENTER",
//     description: "Web Design",
//     image: "/servicesImg/carpenter - woodworker.jpg",
//   },
//   {
//     title: "CLEANING THE HOUSE",
//     description: "Web Design",
//     image: "/servicesImg/cleaning the house.jpg",
//   },
//   {
//     title: "CONSTRUCTION",
//     description: "Web Design",
//     image: "/servicesImg/Construction 1.jpg",
//   },
//   {
//     title: "ELECTRICIEN",
//     description: "Web Design",
//     image: "/servicesImg/Electrician.jpg",
//   },
//   {
//     title: "GARDNER",
//     description: "Web Design",
//     image: "/servicesImg/Gardner.jpg",
//   },
//   {
//     title: "INFORMATICIEN",
//     description: "Web Design",
//     image: "/servicesImg/Informaticien.jpg",
//   },
//   {
//     title: "Plomber",
//     description: "Web Design",
//     image: "/servicesImg/Plomber.jpg",
//   },
// ];

export default function BestService() {
    const [services, setServices] = useState<{ 
        id: number;
        en_name?: string;
        href?: string;
        description?: string;
        image?: string;
        numWorkers?: number;
    
      }[]>([]);
    useEffect(() => {
        const fetchServices = async () => {
          try {
            const response = await axios.get(
              `${domain}/api/v1/services`
            );
            const services = response.data;
            console.log(services)
            setServices(services);
          } catch (error) {
            console.error("Error fetching services:", error);
          }
        };
        
          fetchServices();
        
      }, []);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <>
      <MaxWidthWrapper>
        <Carousel
          className="w-full max-w-xs select-none mt-6 md:max-w-md"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index}>
                <div className="">
                  <Card className="w-full bg-transparent border-none">
                    {/* <CardHeader>
                      <CardTitle>{service.en_name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader> */}
                    <CardContent className="relative flex aspect-square items-start justify-start  bg-transparent">
                      <Image
                        src={`${domain}/api/v1/get_image/${service.image}`}
                        alt={`${service.en_name}`}
                        width={1500}
                        height={1500}
                        className=" h-full w-full object-cover object-center rounded-md"
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-1">
                    <CardTitle>{service.en_name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* <Carousel
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
        </Carousel> */}
      </MaxWidthWrapper>
    </>
  );
}
