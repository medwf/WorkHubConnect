import { Check, Shield, X } from "lucide-react";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "../projects/ImageSlider";
import ProjectReel from "../projects/ProjectReel";
interface WorkerIdProps {
  id: number | null;
  show: boolean;
  onClose: () => void;
  data?: any;
}
const BREADCRUMBS = [
  { id: 1, name: "Workers", href: "/workers" },
  { id: 2, name: "Mohamed", href: "/projects" },
];
const WorkerId: React.FC<WorkerIdProps> = ({ id, show, onClose }) => {
  if (!show || id === null) return null;

  //   Worker ID: {id}
  return (
    <div className="fixed flex justify-center items-center bg-gray-300 bg-opacity-20 z-[100] ">
      <div className="fixed h-[80vh] w-[70vw]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-[100]  border border-gray-700 rounded-md bg-white">
        <div className="flex justify-end border-b ">
          <button className="p-2" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className=" relative mt-0">
          <MaxWidthWrapper>
            {/* <div className="absolute top-0 left-0 px-2">
              <div className="bg-red-200"> */}
            <div className=" flex mx-auto  px-4 py-2 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-4 lg:px-4">
              {/* Project Details */}
              <div className="lg:max-w-lg ">
                <div className="">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    mohamed wafi
                  </h1>
                </div>
                <section className="mt-4">
                  <div className="flex items-center">
                    Informaticien
                    <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                      {/* {label} */}
                      <p className="font-medium text-gray-900">100$</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-6">
                    <p className="text-base text-muted-foreground">
                      {/* {project.description} */}i am working on some projects
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <Check
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-green-500"
                    />
                    <p className="ml-3 font-medium text-gray-900">Available</p>
                  </div>
                  <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-2 lg:self-start lg:max-w-lg ">
                    <div>
                      <div className="mt-10">contact</div>
                      <div className="mt-6 text-center flex items-center">
                        <Shield
                          aria-hidden="true"
                          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                        />
                        <span className="text-muted-foreground hover:text-gray-700">
                          Guarantee
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {/* Project Image */}
              <div className="mt-2 lg:mt-0  ">
                <div className="aspect-square rounded-lg">
                  <Image
                    src="/assets/29.jpg"
                    width={400}
                    height={400}
                    alt="profile image"
                  />
                </div>
              </div>

              {/* add to cart part */}
            </div>
            {/* </div> */}
            {/* </div> */}
            <div className="absolute bottom-0 max-w-4xl max-h-xl">
              <ProjectReel
                href="/projects"
                title={"The latest 3 projects"}
                subtitle={""}
              />
            </div>
          </MaxWidthWrapper>

          <div className="px-20 py-20"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkerId;
