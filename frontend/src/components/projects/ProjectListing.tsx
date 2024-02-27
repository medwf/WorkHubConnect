"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageObject {
  image: string;
}

interface Project {
  id: number;
  name: string;
  images: ImageObject[];
}

interface ProjectListingProps {
  project: Project | null;
  index: number;
}

const ProjectListing = ({ project, index }: ProjectListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
    // console.log(` image project ${project}`)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!isVisible || !project) return <ProjectPlaceholder />;

//   const validUrls = project.images.map((imageObj) => imageObj.image);
  const validUrls = project.images.map((imageUrl) => imageUrl);

  console.log(validUrls);
  console.log(project);
  return (
    <Link
      className={cn("invisible h-full w-full cursor-pointer group/main", {
        "visible animate-in fade-in-5": isVisible,
      })}
      href={`/projects/${project.id}`}
    >
      <div className="flex flex-col w-full">
        <ImageSlider urls={validUrls} />
        <h3 className="mt-4 font-medium text-sm text-gray-700">
          {project.name}
        </h3>
      </div>
    </Link>
  );
};

const ProjectPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProjectListing;
