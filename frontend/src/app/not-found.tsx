import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <MaxWidthWrapper>
        <section className="wrapper flex flex-col justify-center  items-center gap-4 mx-auto ">
          <div>
            <Link href="/" className="text-sky-400 text-bold text-3xl">
              {" "}
              <Image
                src={"/assets/notFound.jpg"}
                width={700}
                height={700}
                alt="404"
                className=" rounded-full"
              />
            </Link>
          </div>
        </section>
      </MaxWidthWrapper>
    </>
  );
}
