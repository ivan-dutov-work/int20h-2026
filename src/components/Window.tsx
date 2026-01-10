import React, { type HTMLAttributes } from "react";
import closeHandle from "@/assets/windows/close.webp";

type WindowProps = {
  children?: React.ReactNode;
  heading: string;
} & HTMLAttributes<HTMLDivElement>;
const Window = ({ children, heading, className, ...props }: WindowProps) => {
  return (
    <div className="border-4 border-brand-light">
      <div className="pl-1 bg-brand-light flex flex-row gap-8 justify-between items-center">
        <p className="uppercase text-brand-dark font-pixelated">{heading}</p>
        <img className="w-4 h-4" src={closeHandle} alt="Close window" />
      </div>
      <div className={className} {...props}>
        {children}
      </div>
    </div>
  );
};

export default Window;
