"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector hook from React Redux
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import { RootState } from "@/Redux/store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";
import { GrProjects } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
const titleClass = "text-muted-foreground text-md text-semibold";
const labelClass = "text-md font-poppins font-semibold";
export default function ProfilePage() {
  const userId = useSelector((state: RootState) => state.user); // Access userId from Redux state
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    region: "",
    type: "",
    image: "",
    service: "",
  });

  // useEffect(() => {
  //   console.log("Inside useEffect"); // Log when useEffect is executed
  //   const fetchUserInfo = async () => {
  //     try {
  //       console.log(`Fetching user info ${userId}`); // Log before making the API call
  //       const response = await axios.get(
  //         `http://localhost:5000/api/v1/users/${userId}`
  //       );
  //       // const response = await axios(`/api/users/profile/${userId}`);
  //       console.log(`response ${response}`);
  //       console.log("API response:", response.data); // Log the response data
  //       setUserInfo(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user information:", error);
  //     }
  //   };

  //   if (userId) {
  //     fetchUserInfo();
  //   }
  // }, [userId]);

  console.log("userInfo:", userInfo);

  return (
    <main className="h-screnn w-screen">
      <div className="hidden md:flex flex-col items-start justify-center mx-auto p-7 ">
        <h1 className="md:text-3xl text-xl font-semibold font-poppins">
          My Profile
        </h1>
        {userInfo && (
          <section className="flex items-center justify-between gap-4 w-full py-5">
            <div className="flex items-center gap-4">
              <div className="md:min-h-20 md:min-w-20 min-h-14 min-w-14 rounded-full border flex justify-center items-center">
                {userInfo.image ? (
                  <Image
                    src={userInfo.image}
                    alt="Avatar"
                    width={100}
                    height={100}
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    {userInfo.first_name[0]}
                    {userInfo.last_name[0]}
                  </div>
                )}
              </div>
              <div>
                <p className="md:text-[16px] font-bold">
                  {userInfo.first_name} {userInfo.last_name}
                </p>
                <p className="text-[13px] text-muted-foreground">
                  {userInfo.type}
                </p>
              </div>
            </div>
            <div>
              <Button
                variant="outline"
                type="button"
                className="flex gap-1 rounded-lg hover:bg-slate-400 hover:text-white"
              >
                <p>Edit</p>
                <CiEdit />
              </Button>
            </div>
          </section>
        )}
        <section className="w-full">
          <div className="flex items-center justify-between w-full">
            <h1 className="md:text-3xl text-md font-semibold font-poppins">
              Personal Information
            </h1>
            <Button
              variant="outline"
              type="button"
              className="flex gap-1 rounded-lg hover:bg-slate-400 hover:text-white"
            >
              <p>Edit</p>
              <CiEdit />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 p-4">
            {userInfo && (
              <>
                <div>
                  <h1 className={titleClass}>First Name</h1>
                  <p className={labelClass}>{userInfo.first_name}</p>
                  <br />
                  <h1 className={titleClass}>Last Name</h1>
                  <p className={labelClass}>{userInfo.last_name}</p>
                  <br />
                  {userInfo.service ? (
                    <div>
                      <h1 className={titleClass}>Bio</h1>
                      <p className={labelClass}>{userInfo.service}</p>
                    </div>
                  ) : null}

                  <br />
                </div>
                <div>
                  <h1 className={titleClass}>Email Address</h1>
                  <p className={labelClass}>{userInfo.email}</p>
                  <br />
                  <h1 className={titleClass}>Phone</h1>
                  <p className={labelClass}>{userInfo.phone_number}</p>
                  <br />
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {/* small devices */}
      <div className="md:hidden  h-screen bg-slate-100">
        <div className=" bg-sky-200  h-[20vh] relative"></div>
        <div className="flex items-center justify-center gap-4">
          <div className=" min-h-[120px] min-w-[120px] rounded-full border-8 border-stone-100  flex justify-center items-center bg-sky-100 -mt-14 z-40">
            {userInfo.image ? (
              <Image
                src={"/assets/hero.jpg"}
                alt="profile"
                width={130}
                height={130}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                HP
                {userInfo.first_name[0]}
                {userInfo.last_name[0]}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <h1 className="text-md font-bold text-gray-900 mr-1">{userInfo.first_name} ESSALHI</h1>
            <h1 className="text-md font-bold text-gray-900 mr-1">{userInfo.last_name} MUSTAPHA </h1>
          </div>
          <p className="text-[13px] text-muted-foreground">{userInfo.type} client</p>
        </div>
        <div className="flex justify-between items-center px-4 py-2">
          <h1 className="text-muted-foreground text-md text-gray-950 font-poppins">Phone</h1>
          <h1>{userInfo.phone_number}</h1>
        </div>
        <div className="flex justify-between items-center px-4 py-3">
          <h1 className="text-muted-foreground text-md text-gray-950 font-poppins">Mail</h1>
          <h1>{userInfo.email}</h1>
        </div>
        <div className="flex justify-between items-center px-4 py-4 border-y hover:bg-sky-300">
          <div className="flex justify-center items-center">
            <GrProjects/>
          <h1 className="text-muted-foreground text-md text-gray-950 font-poppins pl-2">Projects</h1>
          </div>
       
        <ChevronRight />

        </div>
        <div className="flex justify-between items-center px-4 py-4 border-y">
        <div className="flex justify-center items-center">
            <CgProfile />
          <h1 className="text-muted-foreground text-md text-gray-950 font-poppins pl-2">Profile Details</h1>
          </div>
        <ChevronRight />

        </div>
        <div className="flex justify-between items-center px-4 py-4 border-y">
        <div className="flex justify-center items-center">
            <IoMdSettings className="h-6 w-6" />
          <h1 className="text-muted-foreground text-md text-gray-950 font-poppins pl-2">Settings</h1>
          </div>
        <ChevronRight />
        </div>
      </div>
    </main>
  );
}
