import React from "react";

interface Props {
  imgSrc: string;
  name: string;
  alt?: string;
  sizeClass?: string;
  withOverlay?: boolean;
  className?: string;
}

const Category: React.FC<Props> = ({
  imgSrc,
  name,
  alt,
  sizeClass = "w-full max-w-[180px] aspect-square",
  withOverlay = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center gap-2 relative ${className}`}>
      {withOverlay && (
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div
            className={`${sizeClass} rounded-full`}
            style={{
              background:
                "linear-gradient(0deg, #EFEFEF 0%, #EFEFEF 100%), #EFEFEF",
              opacity: 0.2,
              filter: "blur(40px)",
            }}
          />
        </div>
      )}

      <img className={sizeClass} src={imgSrc} alt={alt ?? name} />

      <p className="font-black font-pixelated text-lg leading-1.2 tracking-[-0.72px] text-center">
        {name}
      </p>
    </div>
  );
};

export default Category;
