import { X } from "lucide-react";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

interface WorkerIdProps {
  id: number | null;
  show: boolean;
  onClose: () => void;
  data?: any;
}

const WorkerId: React.FC<WorkerIdProps> = ({ id, show, onClose }) => {
  if (!show || id === null) return null;
  //   Worker ID: {id}
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-20 z-[100] ">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-[100]  border border-gray-700 rounded-md bg-white">
        <div className="flex justify-end border-b ">
          <button className="p-2" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="py-40 px-60 relative">
          <MaxWidthWrapper>
            <div className="absolute top-0 left-0 px-2">
              <h1 className="text-md font-bold font-poppins">Mohamed abou</h1>
              <span className="text-sm text-muted-foreground">
                informaticien
              </span>
            </div>
          </MaxWidthWrapper>

          <div className="px-20 py-20"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkerId;
