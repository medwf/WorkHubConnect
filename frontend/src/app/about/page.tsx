import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
import CircularCarousel from "@/components/about/CircularCarousel";
import Image from "next/image";
export default function About() {
  const aboutData = [
    {
      id: 1,
      name: "Mohamed Wafi",
      title: "Back-end Developer & DevOps",
      description:
        "Will be involved in both front-end and back-end development, ensuring the entire application is well-built and functional. Additionally, as a DevOps engineer, they will focus on the deployment, automation, and maintenance of the project infrastructure.",
      twitter: "https://twitter.com/medwf95",
      github: "https://github.com/medwf",
      linkedin: "https://www.linkedin.com/in/mohamed-wafi-a65277273/",
      whatsapp: "http://wa.me/212663350206",
    },
    {
      id: 2,
      name: "Aboubakr Taibi",
      title: "Back-end Developer & DevOps",
      description:
        "As a Back-end Developer and DevOps engineer, I am committed to ensuring seamless functionality and efficiency in application development. In my role as a DevOps engineer, I focus on deployment, automation, and maintenance of the project infrastructure.",
      twitter: "https://twitter.com/aboubakr_taibi",
      github: "https://github.com/TaibiAboubakr",
      linkedin: "https://www.linkedin.com/in/aboubakr-taibi-ba5b25149/",
      whatsapp: "http://wa.me/212626003679",
    },
    {
      id: 3,
      name: "Essalhi Mustapha",
      title: "Front-end Developer",
      description:
        "As a front-end web developer, I have the privilege of leading a talented team in crafting compelling front-end experiences for our projects. Together, we build dynamic web applications using Next.js and seamlessly integrate them with APIs to deliver robust functionalities. Our collaborative approach ensures that every aspect of the project, from design to deployment, meets the highest standards. Let's work together to bring your vision to reality!",
      twitter: "https://twitter.com/essalhi_007",
      github: "https://github.com/MEKuroko007",
      linkedin: "linkedin.com/in/essalhi-mustapha-92751a226",
      whatsapp: "http://wa.me/212650130228",
    },
  ];

  return (
    <MaxWidthWrapper>
      <div className="relative w-full h-full">
        <div className="relative my-6 border rounded-md shadow-md w-[90vw] md:h-[78vh] h-full mb-12  overflow-hidden">
          <div className="md:flex hidden">
            <div className="h-full w-full overflow-hidden">
              <div className="absolute -ml-56 ">
                <CircularCarousel />
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="flex flex-col">
              <h1 className="text-center font-bold font-poppins text-3xl">
                Team
              </h1>
              <p className="text-center font-medium text-sm">ALX Students</p>
              <div className="p-2 h-full grid grid-cols-1 py-10">
                {aboutData.map((item) => (
                  <div key={item.id}>
                    <h1 className="text-md font-medium border-t pt-4">
                      {item.name}
                    </h1>
                    <p className="text-sm pb-3">{item.title}</p>
                    <p>{item.description}</p>
                    <div className="flex gap-4 justify-center mx-10 w-full h-full mt-10 py-4">
                      {item.twitter && (
                        <Link href={item.twitter}>
                          <BsTwitterX className="text-xl hover:text-blue-500" />
                        </Link>
                      )}
                      {item.github && (
                        <Link href={item.github}>
                          <FaGithub className="text-xl hover:text-gray-700" />
                        </Link>
                      )}
                      {item.whatsapp && (
                        <Link href={item.whatsapp}>
                          <FaWhatsapp className="text-xl hover:text-green-500" />
                        </Link>
                      )}
                      {item.linkedin && (
                        <Link href={item.linkedin}>
                          <FaLinkedin className="text-xl hover:text-blue-500" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 mx-auto w-full">
            <div className="flex justify-center items-center gap-4 py-2  ">
              <Image src="/static/next.svg" alt="next" width={100} height={100} className="p-4"/>
              <Image src="/static/vercel.svg" alt="next" width={100} height={100} className="p-4"/>
              <Image src="/static/flask.png" alt="next" width={100} height={100} className="p-4" />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
