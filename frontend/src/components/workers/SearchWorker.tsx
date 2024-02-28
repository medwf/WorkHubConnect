"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { RootState } from "@/Redux/store";
import { workers } from "@/helpers/test";
interface Worker {
  id: number;
  name: string;
}


const SearchWorker: React.FC = () => {
  const [activeSearch, setActiveSearch] = useState<Worker[]>([]);
  const userId = useSelector((state: RootState) => state.user);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim().toLowerCase();
    if (!inputValue) {
      setActiveSearch([]);
      return;
    }

    // Filter workers based on input value and limit to 8 results
    const filteredWorkers = workers.filter(worker => worker.name.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 8);
    setActiveSearch(filteredWorkers);
  };

  // const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value.trim();
  //   if (!query) {
  //     setActiveSearch([]);
  //     return;
  //   }

  //   try {
  //     const response = await axios.get<Project[]>(`http://127.0.0.1:5000/api/workers`);
  //     setActiveSearch(response.data);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //     setActiveSearch([]);
  //   }
  // };

  return (
    <form className="w-2/3 md:w-1/3 relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Type Worker Name ..."
        
          onChange={(e) => handleSearch(e)}
          className="w-full p-4 rounded-full bg-slate-700 text-white"
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full">
          <AiOutlineSearch className="text-white" />
        </button>
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute  top-16 p-4 z-50 h-44 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 ">
           {activeSearch.map(worker => (
  <span key={worker.id} className="hover:outline hover:text-gray-100">
    {worker.name}
  </span>
))}
         
          {/* {activeSearch.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`}>
              <a>{project.name}</a>
            </Link>
          ))} */}
        </div>
      )}
    </form>
  );
};

export default SearchWorker;
