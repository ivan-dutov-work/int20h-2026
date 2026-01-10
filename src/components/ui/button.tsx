import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/util/utils";

/* -----------------------------------------------------
 * Base button variants (NON-pixel)
 * --------------------------------------------------- */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/30",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        /* handled separately */
        pixel: "",
        "pixel-outline": "",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/* -----------------------------------------------------
 * Pixel button sizing presets
 * --------------------------------------------------- */

const pixelPresets = {
  sm: {
    border: 3,
    shadow: 3,
    padding: "px-3 py-1.5",
  },
  md: {
    border: 4,
    shadow: 4,
    padding: "px-4 py-2",
  },
  lg: {
    border: 6,
    shadow: 6,
    padding: "px-6 py-3",
  },
};

type PixelSize = keyof typeof pixelPresets;

/* -----------------------------------------------------
 * Props
 * --------------------------------------------------- */

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;

    /* pixel-only */
    pixelSize?: PixelSize;
    pixelBorder?: number;
    pixelShadow?: number;
    pixelPadding?: string;
  };

/* -----------------------------------------------------
 * Component
 * --------------------------------------------------- */

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,

  pixelSize = "md",
  pixelBorder,
  pixelShadow,
  pixelPadding,

  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isPixel = variant === "pixel" || variant === "pixel-outline";

  /* ---------------- Pixel button ---------------- */

  if (isPixel && !asChild) {
    const preset = pixelPresets[pixelSize];

    const border = pixelBorder ?? preset.border;
    const shadow = pixelShadow ?? preset.shadow;
    const padding = pixelPadding ?? preset.padding;

    return (
      <Comp
        {...props}
        className={cn(
          "relative inline-block group select-none",
          "focus-visible:outline-none cursor-pointer",
          className
        )}
      >
        {/* Shadow */}
        <div
          aria-hidden
          className="absolute pixelated-corners bg-brand-dark -z-10"
          style={{
            top: shadow,
            left: shadow,
            width: "100%",
            height: "100%",
          }}
        />

        {/* Border */}
        <div
          className={cn(
            "relative pixelated-corners bg-accent",
            "transition-transform duration-75",
            "group-hover:-translate-x-[1px] group-hover:-translate-y-[1px]",
            "group-active:translate-x-[2px] group-active:translate-y-[2px]"
          )}
          style={{ padding: border }}
        >
          {/* Content */}
          <div
            className={cn(
              "pixelated-corners flex items-center justify-center",
              padding,
              variant === "pixel"
                ? "bg-secondary text-secondary-foreground"
                : "bg-background text-foreground"
            )}
          >
            {props.children}
          </div>
        </div>
      </Comp>
    );
  }

  /* ---------------- Normal button ---------------- */

  return (
    <Comp
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
}

export { Button };
