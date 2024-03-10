"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/Redux/store";
// import { removeToken } from "@/state";
// import { isTokenExpired } from "@/helpers/expireToken";
import { ArrowDownToLine, Bold, Leaf } from "lucide-react";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdOutlineWifiProtectedSetup } from "react-icons/md";
import ServicesSlider from "@/components/ServicesSlider";
import domain from "@/helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "@/state";
import { RootState } from "@/Redux/store";
import BestService from "@/components/services/BestService";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const perks = [
    {
      name: "Innovation",
      icon: MdOutlineWifiProtectedSetup,
      description:
        " Constantly evolving to meet your needs. Join us in embracing creativity as we shape the future of collaboration.",
    },
    {
      name: "SwiftConnect",
      icon: MdOutlineConnectWithoutContact,
      description:
        "Efficiency at your fingertips. Discover SwiftConnect by WorkHubConnect for instant connections and seamless collaboration.",
    },
    {
      name: "Simplicity",
      icon: FaHandshakeSimple,
      description:
        "Effortless collaboration made simple. Explore WorkHubConnect for an intuitive and streamlined experience, connecting clients and workers seamlessly.",
    },
  ];

  // )
  const id = useSelector((state: RootState) => state.user);
  
  return (
    <>
      <MaxWidthWrapper>
        <div className=" grid grid-cols-1 gap-7 md:grid-cols-2 2xl:gap-0">
          <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
            <h1 className="text-blue-600 text-3xl font-bold tracking-tight sm:text-5xl">
              {" "}
              WorkHubConnect
            </h1>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Your company for high-quality{""}.
            </h1>
            <p className="mt-6 text-lg max-w-prose text-muted-foreground">
              Welcome to WorkhubConnect, We provide high-quality services
              related to what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/workers" className={buttonVariants()}>
                browse our workeres
              </Link>
              <Button variant="ghost">Our quality promise &rarr;</Button>
            </div>
          </div>
          <div className="mx-auto md:my-auto  ">
            <Image
              src={"/assets/hero.jpg"}
              alt="hero"
              width={1700}
              height={1700}
              className="max-h-[70vh  object-contain 2xl:max-h-[60vh]"
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-col-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0   flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-4 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground max-w-prose text-gray-500">
                    {perk.description}
                  </p>
                </div>
                {/* <Image       src='/media/108390987.png' width={400} height={400} alt="hi" /> */}
                {/* <img src="http://localhost:3000/media/360_F_528497035_nLlQZuLfgffHqI8beFqQldQnYGujpuag-removebg-preview.png"/> */}
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <div></div>
        </MaxWidthWrapper>
      </section>
      <section className="border-t border-gray-100  h-full bg-gradient-to-t from-slate-100 to-gray-100">
        <MaxWidthWrapper className="py-10">
          <div className="flex flex-col justify-center items-center">
            <span className=" w-16  border-b border-2 border-gray-600 "></span>
            <h1 className="py-4 text-center md:text-3xl text-2xl font-semibold font-poppins">
              Our Services
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:px-auto ">
            <div className="flex flex-col justify-center max-w-md">
              <h1 className="font-meduim font-poppins text-4xl ">
                Embark on a Journey to Excellence
              </h1>
              <p className="font-meduim font-poppins text-md py-4">
                Explore our curated selection of top-tier services, meticulously
                crafted to exceed your expectations. Unveil the highest-rated
                options driven by unparalleled expertise and dedication.
              </p>
              <Button >
                <Link href="/services" className={buttonVariants()}>
                  browse our services &rarr;
                </Link>
              </Button>
            </div>
            <div className="mx-auto">
              <BestService />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <MaxWidthWrapper>
        <div className=" grid grid-cols-1 gap-7 md:grid-cols-2 2xl:gap-0">
          <div className="py-16 max-w-xl px-6 ">
            <h1 className="text-center font-semibold font-poppins text-3xl">
              The best? Everything.
            </h1>
            <div className="flex justify-start items-center gap-2 pt-3">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h1 className="font-semibold font-poppins">
                Respect your budget
              </h1>
            </div>
            <h4 className="text-sm font-poppins font-medium py-1">
              Find high-quality services at all prices. No hourly rates, but
              project-based pricing.
            </h4>
            <div className="flex justify-start items-center gap-2 pt-3">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h1 className="font-semibold font-poppins">
                Quality work done quickly
              </h1>
            </div>
            <h4 className="text-sm font-poppins font-medium py-1">
              Entrust your project to a talented freelancer in minutes and get
              lasting results.
            </h4>
            <div className="flex justify-start items-center gap-2 pt-3">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h1 className="font-semibold font-poppins">Pay once satisfied</h1>
            </div>
            <h4 className="text-sm font-poppins font-medium py-1">
              Quotes are provided in advance, avoiding surprises. Payment is
              released only when you approve it.
            </h4>
            <div className="flex justify-start items-center gap-2 pt-3">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h1 className="font-semibold font-poppins">24/7 Support</h1>
            </div>
            <h4 className="text-sm font-poppins font-medium py-1">
              Our support team is available 24/7 to assist you anytime,
              anywhere.
            </h4>
          </div>

          <div className="mx-auto md:my-auto  ">
            <Image
              src={"/assets/home2.jpg"}
              alt="hero"
              width={1700}
              height={1700}
              className="max-h-[70vh  object-contain 2xl:max-h-[60vh]"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
