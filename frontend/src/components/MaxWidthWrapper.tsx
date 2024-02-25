import { ReactNode } from "react";
import { cn } from "@/lib/utils";
const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-2.5 md:px-8 lg:px-10 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
