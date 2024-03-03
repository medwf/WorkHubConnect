"use client"
// ProjectReel.tsx
import { RootState } from '@/Redux/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProjectListing from './ProjectListing';
import { testProjects2 } from '../../helpers/Mytest';
import domain from '@/helpers/constants';



interface Project {
  id: number;
  name: string;
  images: {
    image: string;
  };
}


interface ProjectReelProps {
  title?: string;
  subtitle?: string;
  href?: string;
  page?: number; 
  limit?: number; 
  projects?: Project[]; // Changed to Project[]
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 4;

const ProjectReel = (props: ProjectReelProps) => {
  const { title, subtitle, href, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = props;
  const userId = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Project[]>(
          `${domain}/api/projects?page=${page}&limit=${limit}&userid=${userId}`
        );
        // setProjects(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, limit, userId]);


  return (
    <section className='py-12'>
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title ? (
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>{title}</h1>
          ) : null}
          {subtitle ? (
            <p className='mt-2 text-sm text-muted-foreground'>{subtitle}</p>
          ) : null}
        </div>

        {/* {href ? (
          <Link href={href} className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'>
            Shop the collection <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null} */}
      </div>

      <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
            {/* {isLoading ? (
              <div>Loading...</div>
            ) : testProjects2.length === 0 ? (
              <div>No projects found.</div>
            ) : (
              testProjects2.map((project, i) => (
                <ProjectListing project={project}  key={`project-${i}`}  index={i} />
              ))
            )} */}
            {testProjects2.map((project, i) => (
              <ProjectListing project={project}  key={`project-${i}`}  index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectReel;
