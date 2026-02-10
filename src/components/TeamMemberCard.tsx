import React from "react";
import { cn } from "@/util/utils";
import frameSvgUrl from "@/assets/organizers/frame.svg?url";
// Use native <img> inside React components to avoid passing props to Astro components

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageSrc?: string;
  className?: string;
  imagePosition?: string;
  blur?: "large" | "small";
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  imageSrc,
  className,
  imagePosition = "object-center",
  blur = "large",
}) => {
  return (
    <div className={cn("flex flex-col items-center gap-2 w-full", className)}>
      {/* Card container with decorative border */}
      <div className="relative w-full h-full">
        {/* soft aqua blurred background layer (from Figma) */}
        <div
          className={cn(
            "absolute inset-0 z-0 bg-brand-cyan opacity-40 filter",
            {
              "blur-[32px]": blur === "large",
              "blur-[16px]": blur === "small",
            },
          )}
        />

        {/* frame sits above the blur */}
        <img
          src={frameSvgUrl}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover z-30"
        />

        {/* inner padded image */}
        <div className="relative p-[3.125%] md:p-[10%] z-20 h-full flex items-center">
          {imageSrc ? (
            <img
              src={imageSrc}
              className={cn(
                "w-full h-full block object-contain",
                imagePosition,
              )}
              alt={name.toUpperCase()}
              width={1420}
              height={1531}
            />
          ) : (
            <img src="https://placehold.co/1420x1531" alt="Placeholder" />
          )}
        </div>
      </div>
      {/* Name and role */}
      <p className="text-white text-center font-bold whitespace-nowrap">
        {name.toUpperCase()} | {role}
      </p>
    </div>
  );
};
