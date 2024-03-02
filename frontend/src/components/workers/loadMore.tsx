"use client"
import { fetchWorkers } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import {useInView} from "react-intersection-observer"
import { workerProp } from "./WorkerCard";


let page = 2;
function LoadMore() {
  const {ref, inView} = useInView();
  const [data, setData] = useState<workerProp[]>([]);
  // useEffect(() => {
  //   if (inView) {
  //    fetchWorkers(2,2,2,3).then((res) => {
  //      setData([...data,...res]);
  //      page++;
  //    }
  //    )
  //   }
  // },[inView,data])


  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="/static/spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;