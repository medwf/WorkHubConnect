"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { GrProjects } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import https from "https";
import domain from "@/helpers/constants";
import toast from "react-hot-toast";
import { useCookies } from "next-client-cookies";
import StatusToggle from "@/components/profile/toggleStatus";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

const titleClass = "text-muted-foreground text-md text-semibold";
const labelClass = "text-md font-poppins font-semibold w-1/3 overflow-x-hidden";

export default function ProfilePage() {
  const cookies = useCookies();
  const userId = useSelector((state: RootState) => state.user);
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
    linkedin_url: "",
    github_url: "",
    insta_url: "",
    fb_url: "",
    tiktok_url: "",
    website_url: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${domain}/api/v1/users/${userId}`,{
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          }
        );

        setUserInfo(response.data);
      } catch (error) {
        toast.error("invalid user info");
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);



  return (
    <main className="h-screen w-full">
      <div className="hidden md:flex flex-col items-start justify-center mx-auto p-7 ">
        <div>

        </div>
        <h1 className="md:text-3xl text-xl font-semibold font-poppins">
          My Profile
        </h1>
        {userInfo && (
          <section className="flex items-center justify-between gap-4 w-full py-5 border rounded-lg p-4 my-2">
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
          <StatusToggle userId={userId} />
          </div>
          </section>
        )}

        {/* Personal Information */}
        <section className="w-full">
          {/* { userInfo.region || userInfo.city || userInfo.service || userInfo.phone_number || userInfo.email || ? ():(null)} */}
          <div className="flex items-center justify-between w-full">
            <h1 className="md:text-3xl text-md font-semibold font-poppins">
              Personal Information
            </h1>
            
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 p-4 border rounded-lg my-2">
            {userInfo && (
              <>
                <div>
                 
                  {/* {userInfo.service || userInfo.phone_number || userInfo.email && ( */}
                    
                  <div>
                       <h1 className={titleClass}>Email Address</h1>
                  <p className={labelClass}>{userInfo.email}</p>
                  <br />
                  <h1 className={titleClass}>Phone</h1>
                  <p className={labelClass}>{userInfo.phone_number}</p>
                  <br />
                  {userInfo.type === 'workers' && (
                    <div>
                       <h1 className={titleClass}>Profession</h1>
                       <p className={labelClass}>{userInfo.service}</p>
                    </div>

                  )}
                     
                    </div>
                  {/* )} */}
                  

                </div>
                <div>
             
                   
                 
                 
   
                 
                    <div>
                      <h1 className={titleClass}>Region</h1>
                      {userInfo.region ? (
                        <p className={labelClass}>{userInfo.region}</p>
                      ) : (null)}
                    
                      <br />
                      <h1 className={titleClass}>City</h1>
                      {userInfo.city ? (
                        <p className={labelClass}>{userInfo.city}</p>
                      ) : (null)}
                   
                  
                    </div>
                
                </div>
              
              </>
            )}
          </div>
        </section>

        {/* Social Media */}
        {userInfo.fb_url || userInfo.linkedin_url || userInfo.tiktok_url || userInfo.website_url || userInfo.insta_url || userInfo.github_url ? (
          <div className="border rounded-e-lg my-2 ">
            <div className="flex items-center justify-between w-full">
              <h1 className="md:text-3xl text-md font-semibold font-poppins">
                Social media
              </h1>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 p-4">
              {userInfo && (
                <>
                  <div>
                    {userInfo.fb_url && (
                      <div>
                        <h1 className={titleClass}>Facebook</h1>
                        <p className={labelClass}>{userInfo.fb_url}</p>
                      </div>
                    )}
                    <br />
                    {userInfo.tiktok_url && (
                      <div>
                        <h1 className={titleClass}>Tiktok</h1>
                        <p className={labelClass}>{userInfo.tiktok_url}</p>
                      </div>
                    )}
                    <br />
                    {userInfo.insta_url && (
                      <div>
                        <h1 className={titleClass}>Instagram</h1>
                        <p className={labelClass}>{userInfo.insta_url}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    {userInfo.linkedin_url && (
                      <div>
                        <h1 className={titleClass}>Linkedin</h1>
                        <p className={labelClass}>{userInfo.linkedin_url}</p>
                      </div>
                    )}
                    <br />
                    {userInfo.website_url && (
                      <div>
                        <h1 className={titleClass}>Website</h1>
                        <p className={labelClass}>{userInfo.website_url}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Small devices */}
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
               
                {userInfo.first_name[0]}
                {userInfo.last_name[0]}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <h1 className="text-md font-bold text-gray-900 mr-1">{userInfo.first_name} </h1>
            <h1 className="text-md font-bold text-gray-900 mr-1">{userInfo.last_name}  </h1>
          </div>
          <p className="text-[13px] text-muted-foreground">{userInfo.type}</p>
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
          <Link href={'/profile/projects'} className="flex justify-center items-center">
            <GrProjects/>
          <h1 className="text-muted-foreground text-md text-gray-950 font-poppins pl-2">Projects</h1>
          </Link>

        <ChevronRight />

        </div>
        <div className="flex justify-between items-center px-4 py-4 border-y">
        <Link href={'/profile'} className="flex justify-center items-center">
            <CgProfile />
          <h1 className="text-muted-foreground text-md text-gray-950 font-poppins pl-2">Profile Details</h1>
          </Link>
        <ChevronRight />

        </div>
        <div className="flex justify-between items-center px-4 py-4 border-y">
        
          <Link href={'/profile/settings'} passHref className="flex justify-center items-center">
          <IoMdSettings className="h-6 w-6" />
          <h1 className="text-muted-foreground text-md text-gray-950 font-poppins pl-2">Settings</h1>
          </Link>
           
        
        <ChevronRight />
        </div>
      </div>
    </main>
  );
}
