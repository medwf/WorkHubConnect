"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const handleSearch = () => {
  //   const mockData = [
  //     { id: 1, title: "electricity" },
  //     { id: 2, title: "plombie" },
  //     { id: 3, title: "it" },
  //   ];
  //   const filteredResults = mockData.filter((item) =>
  //     item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  //   setSearchResults(filteredResults);
  // };
  return (
    <>
      <MaxWidthWrapper>
        <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="flex flex-col justify-center gap-8 ">
              <h1 className="text-2xl font-bold text-gray-900">
                Host, Connect to worker in your network, Our Platform!
              </h1>
              <p className="p-regular-20 md:p-regular-24">
                helpfully connect and do your work with quality services and
                solve your problems
              </p>
              <div className="flex gap-3 mx-5 ">
                <Input
                  type="text"
                  placeholder="Search ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" >Search</Button>
              </div>
              {/* {searchResults.length > 0 && (
                 <div className="mt-5">
                 <h2 className="text-lg font-semibold">Search Results:</h2>
                 {searchResults.slice(0, 5).map(result => (
                   <SearchResultCard key={result.id} title={result.title} />
                 ))}
               </div>
              )} */}
            </div>
            <Image
              src={"/assets/hero.jpg"}
              alt="hero"
              width={1500}
              height={1500}
              className="max-h-[70vh object-contain object-center 2xl:max-h-[50vh]"
            />
          </div>
        </section>
      </MaxWidthWrapper>
    </>
  );
}
