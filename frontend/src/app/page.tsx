"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getUserDataFromToken } from "@/helpers/authHelp";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/Redux/store";
import { removeToken } from "@/state";
import { isTokenExpired } from "@/helpers/expireToken";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state: RootState) => state.token);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenAndFetchUserInfo = async () => {
      if (isTokenExpired(token)) {
        dispatch(removeToken());

        return;
      }
    };
    checkTokenAndFetchUserInfo();
  }, [token]);

  const perks = [
    {
      name: "Quick Installation",
      icon: ArrowDownToLine,
      description:
        "Receive your aluminum systems installed quickly, ensuring prompt project completion.",
    },
    {
      name: "Premium Durability",
      icon: CheckCircle,
      description:
        "Each aluminum system undergoes rigorous quality controls to meet industry standards. Unsatisfied? We offer a 30-day satisfaction guarantee.",
    },
    {
      name: "Environmentally Friendly",
      icon: Leaf,
      description:
        "We allocate 1% of sales to environmental conservation efforts, promoting sustainability and eco-responsibility.",
    },
  ];

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
  // wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0
  return (
    <>
      <MaxWidthWrapper>
        <section className=" grid grid-cols-1 gap-7 md:grid-cols-2 2xl:gap-0">
          <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your company for high-quality{""}
              <span className="text-blue-600"> WorkHubConnect</span>.
            </h1>
            <p className="mt-6 text-lg max-w-prose text-muted-foreground">
              Welcome to WorkhubConnect, We provide high-quality services related to
             what you need.
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
        </section>
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
    </>
  );
}
