"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { useCookies } from "next-client-cookies";

import { testProjects } from "@/helpers/Mytest";
interface Project {
  id: number;
  name: string;
}


const SearchProject: React.FC = () => {
  const [activeSearch, setActiveSearch] = useState<Project[]>([]);
  const cookies = useCookies();
  const userId = cookies.get("userId");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();

    if (!query) {
      setActiveSearch([]);
      return;
    }

    // try {
    //   const response = await axios.get<Project[]>(`http://127.0.0.1:5000/api/projects?query=${query}?userid=${userId}`);
    //   setActiveSearch(response.data);
    // } catch (error) {
    //   console.error("Error fetching search results:", error);
    //   setActiveSearch([]);
    // }
  };

  return (
    <form className="w-2/3 md:w-1/3 relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Type Here"
          onChange={handleSearch}
          className="w-full p-4 rounded-full bg-slate-800 text-white"
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full">
          <AiOutlineSearch className="text-white" />
        </button>
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute  top-16 p-4 z-50 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 ">
          {activeSearch.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`}>
              <a>{project.name}</a>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchProject;