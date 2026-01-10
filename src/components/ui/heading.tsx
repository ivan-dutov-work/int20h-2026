import { cn } from "@/util/utils";
import React, { type HTMLAttributes } from "react";

type HeadingProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;
const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h1
      className={cn("font-pixelated text-lg md:text-xl font-black", className)}
    >
      {children}
    </h1>
  );
};

export default Heading;
