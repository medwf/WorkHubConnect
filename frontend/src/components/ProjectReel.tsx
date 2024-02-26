"use client";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductReelProps {
  title: string
  subtitle?: string
  href?: string
  WNumber?: string
  description?: string
}

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, WNumber,description } = props
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            New Workers
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">Popular</p>
        </div>

        <Link
          href={"/services"}
          className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
        >
          browse our Services <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8 hover:hidden">
            <Card className="w-[350px]">
              <CardHeader></CardHeader>
              <CardContent>
                <Image
                  src={"/assets/hero.jpg"}
                  alt="service"
                  width={130}
                  height={130}
                  className="object-container w-full object-cover"
                />
              </CardContent>
              <CardFooter className="flex justify-between">

              </CardFooter>
            </Card>
          </div>
          <div className=" absolute    w-full h-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
          <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          {title ? (
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              {title}
            </h1>
          ) : null}
          </CardTitle>
        
      </CardHeader>
      <CardContent>
      {description? (
            <p className='mt-2 text-sm text-muted-foreground'>
              {description}
            </p>
          ) : null}
      </CardContent>
      <CardFooter className="flex justify-between">
        
      </CardFooter>
    </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
