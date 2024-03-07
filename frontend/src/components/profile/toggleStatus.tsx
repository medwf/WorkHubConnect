"use client"
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import domain from '@/helpers/constants';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCookies } from 'next-client-cookies';

interface StatusToggleProps {
  userId: string;
}

const StatusToggle: React.FC<StatusToggleProps> = ({ userId }) => {
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [isWorker, setIsWorker] = useState<boolean | null>(null);
  const [confirmChange, setConfirmChange] = useState(false);
  const cookies = useCookies();
  const token = cookies.get('token');

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`${domain}/api/v1/users/${userId}`);
        console.log(response.data);
        setIsActive(response.data.is_available);
        setIsWorker(response.data.type === 'worker');
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUserStatus();
  }, [userId]);

  const toggleStatus = async () => {
    if (confirmChange) {
      try {
        await axios.put(`${domain}/api/v1/worker_status`, { is_available: !isActive },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsActive(prevStatus => !prevStatus); 
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    } else {
      setConfirmChange(true);
    }
  };

  return (
    <div className="flex items-center">
    
      {isActive !== null && isWorker && (
        <>
          <span className="mr-2">{isActive ? 'Active' : 'Inactive'}</span>
          <Dialog>
            <DialogTrigger>
              <button
                onClick={toggleStatus}
                className={`relative w-10 h-6 transition-colors duration-200 ease-in-out rounded-full flex items-center ${isActive ? 'bg-green-500' : 'bg-red-500'}`}
              >
                <span
                  className={`absolute left-0   w-5 h-5 transition-transform duration-200 ease-in-out transform ${isActive ? 'translate-x-full' : 'translate-x-0'} bg-white rounded-full shadow`}
                />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to change the status?</DialogTitle>
              </DialogHeader>
              <DialogFooter>
              <DialogClose asChild>
              <Button onClick={toggleStatus} variant={"outline"} className='bg-blue-400 text-white'>Yes</Button>
              </DialogClose>
              <DialogClose asChild>
              <Button onClick={() => setConfirmChange(false)} variant={"ghost"} className='bg-red-400 text-white'>No</Button>
              </DialogClose>
                  

              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default StatusToggle;
