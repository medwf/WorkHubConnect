"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SearchWorker from "@/components/workers/SearchWorker";
import { SlidersHorizontal } from "lucide-react";
import WorkerCard, { workerProp } from "@/components/workers/WorkerCard";
import { regions } from "@/helpers/regions";
import { cities } from "@/helpers/cities";
import {useInView} from "react-intersection-observer"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchServices, fetchWorkers } from "../action";
interface Service {
  id: string;
  en_name: string;
}

interface City {
  id: number;
  ville: string;
  region: number;
}
interface Region {
  id: number;
  region: string;
}

export default function Workers() {
  const [workers, setWorkers] = useState<workerProp[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState("");
  const [cityPopoverOpen, setCityPopoverOpen] = React.useState(false);
  const [regionPopoverOpen, setRegionPopoverOpen] = React.useState(false);
  const {ref, inView} = useInView();
  const handleMenu = () => {
    setOpen(!open);
  };


  const handleServiceChange = (value: string) => {
    const selectedService = services.find(service => service.id === value);
    setSelectedService(selectedService || null);
    setOpen(!open);
  };
  
  

  const handleRegionChange = (regionName: string) => {
    console.log(regionName + " region selected");
    const normalize = regionName.toLowerCase().trim();
    const foundRegion = regions.find(
      (r) => r.region.toLowerCase().trim() === normalize
    );

    setSelectedRegion(foundRegion || null);
    setOpen(!open);
  };
  let page = 1;
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const services = await fetchServices();
        setServices(services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchInitialData();
  }, [selectedService]);
  
  useEffect(() => {
    const handleFetchWorkers = async () => {
      if (inView) {
        try {
          const data = await fetchWorkers(
            page,
            selectedService,
            selectedRegion,
            selectedCity
          );
          setWorkers(data);
          page++;
        } catch (error) {
          console.error("Error fetching workers:", error);
        }
      }
      
    };
    handleFetchWorkers();
  }, [inView,selectedRegion,selectedCity]);
  return (
    <>
      <MaxWidthWrapper>
        <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="flex-1 md:pt-10 pt-6 px-10 padding-x">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Host, Connect, and find your worker to do what you need to do
                with high quality.
              </h1>
              <p className="p-regular-20 md:p-regular-24 text-muted-foreground">
                helpfully connect and do your work with quality services and
                solve your problems
              </p>
              <Button variant={"default"} className="my-4">
                <Link href="/services">Explore our Services</Link>
              </Button>
            </div>
            <Image
              src={"/assets/worker_.jpg"}
              alt="hero"
              width={1600}
              height={1600}
              className="max-h-[75vh object-contain object-center 2xl:max-h-[60vh]"
            />
          </div>
          <div className="flex justify-center items-center">
            <SearchWorker />
          </div>
        </section>
      </MaxWidthWrapper>
      <section className="h-full py-20">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl font-poppins text-gray-900 py-4">
              Workers
            </h1>
     
            <div className="z-50 relative">
              <SlidersHorizontal className="my-2" onClick={handleMenu} />
              {open && (
                <div className="absolute z-50 top-10 right-2 flex flex-col items-center border border-spacing-1 border-gray-500 bg-white rounded-md p-2">
                  <h3 className="font-medium py-2">Filter Workers</h3>
               <div className="flex flex-col gap-2">

               <Select
   value={selectedService?.id || ""}
  onValueChange={handleServiceChange}
>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="services" />
  </SelectTrigger>
  <SelectContent>
    {services && services.map((service) => (
      <SelectItem key={service.id} value={service.id}>
        {service.en_name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

              <Popover
                open={regionPopoverOpen}
                onOpenChange={setRegionPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={regionPopoverOpen}
                    className="w-[200px] justify-between"
                  >
                    {value !== "" ? value : "Select region..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search region..."
                      className="h-9"
                    />
                    <CommandEmpty>No region found.</CommandEmpty>
                    <CommandGroup>
                      {regions.map((region) => (
                        <CommandItem
                          key={region.id}
                          value={region.region}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setRegionPopoverOpen(false);
                            handleRegionChange(currentValue);
                          }}
                        >
                          {region.region}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === region.region
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <Popover open={cityPopoverOpen} onOpenChange={setCityPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={cityPopoverOpen}
                    className="w-[200px] justify-between"
                  >
                    {selectedCity ? selectedCity.ville : "Select city..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search city..."
                      className="h-9"
                    />
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup>
                      {cities
                        .filter((city) => city.region === selectedRegion?.id)
                        .map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.ville}
                            onSelect={(currentValue) => {
                              setSelectedCity(
                                currentValue === selectedCity?.ville
                                  ? null
                                  : city
                              );
                              setCityPopoverOpen(false);
                            }}
                          >
                            {city.ville}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedCity === city
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              </div>
                </div>
              )}
            </div>
          </div>
          <div  className="relative">
            <div className="mt-6 flex items-center w-full">
              <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
                
              {workers && workers.map((item: workerProp, index) => (
  <WorkerCard key={item.id} worker={item} index={index} />
))}

              </div>
            </div>
            <div ref={ref}>
          <Image
            src="/static/spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
