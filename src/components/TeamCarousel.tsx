import React, { useCallback, useRef, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TeamMemberCard } from "./TeamMemberCard";
import upArrow from "@/assets/faq/uparrow.svg";

export interface TeamMember {
  name: string;
  role: string;
  imageSrc?: string;
  imagePosition?: string;
}

interface TeamCarouselProps {
  members: TeamMember[];
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({ members }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    align: "start",
    loop: false,
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Wheel handling: only intercept when the carousel is fully visible,
  // and translate pixel delta into fractional slide movement for velocity-sensitive scrolling.
  const wheelAccum = useRef(0);
  const rafPending = useRef(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !emblaApi) return;

    const handler = (ev: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      const windowH =
        window.innerHeight || document.documentElement.clientHeight;
      const fullyVisible = rect.top >= 0 && rect.bottom <= windowH;

      if (!fullyVisible) {
        // Let the page scroll when the carousel is not fully visible
        return;
      }

      // If the carousel is fully visible but we are at its start/end and the
      // user scrolls outward (up at start, down at end), allow the page to
      // scroll normally instead of intercepting the wheel.
      const canScrollPrev =
        typeof emblaApi.canScrollPrev === "function"
          ? emblaApi.canScrollPrev()
          : true;
      const canScrollNext =
        typeof emblaApi.canScrollNext === "function"
          ? emblaApi.canScrollNext()
          : true;

      // If we're at the start and the user scrolls up, or at the end and the
      // user scrolls down, don't intercept — let the page handle it.
      if (!canScrollPrev && ev.deltaY < 0) return;
      if (!canScrollNext && ev.deltaY > 0) return;

      // Prevent the page from scrolling while the carousel is fully visible
      ev.preventDefault();

      // Accumulate deltaY and process on RAF for smooth, proportional scrolling
      wheelAccum.current += ev.deltaY;
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        const pixelDelta = wheelAccum.current;
        const viewportH = el.clientHeight || 1;

        // Map pixel delta to slide count, then apply damping to reduce velocity
        // while keeping `scrollNext`/`scrollPrev`. Require a larger pixel
        // threshold for a single-slide move so small wheel ticks don't always
        // trigger navigation.
        const slidesFloat = pixelDelta / (viewportH * 0.5);
        const VELOCITY_DAMPING = 0.28; // smaller -> fewer slides moved
        const RAW_MOVES = Math.abs(slidesFloat) * VELOCITY_DAMPING;

        // Convert to integer slide moves and only allow a single-slide move
        // when the accumulated pixel delta exceeds a fraction of the viewport.
        let slidesToMove = Math.round(RAW_MOVES);
        const MIN_PIXEL_THRESHOLD = viewportH * 0.25; // require 25% viewport for 1 slide
        if (slidesToMove === 0 && Math.abs(pixelDelta) > MIN_PIXEL_THRESHOLD) {
          slidesToMove = 1;
        }
        slidesToMove = Math.min(slidesToMove, 3);

        // Use emblaApi.scrollNext/scrollPrev as before, but with damped count.
        if (slidesToMove > 0) {
          if (pixelDelta > 0) {
            for (let i = 0; i < slidesToMove; i++) emblaApi.scrollNext();
          } else {
            for (let i = 0; i < slidesToMove; i++) emblaApi.scrollPrev();
          }

          // Remove the consumed portion of the accumulated wheel delta so
          // small leftover values don't immediately trigger another slide.
          const consumed =
            Math.sign(pixelDelta) * slidesToMove * (viewportH * 0.5);
          wheelAccum.current = pixelDelta - consumed;
          // If leftover is tiny, clear it to avoid noisy repeats.
          if (Math.abs(wheelAccum.current) < 8) wheelAccum.current = 0;
        } else {
          // Nothing consumed, keep the accumulated value for next RAF.
          // Do not zero it here.
        }

        rafPending.current = false;
      });
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler as EventListener);
  }, [emblaApi]);

  // Track whether we can scroll prev/next to show/hide buttons with fade
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const prev =
        typeof emblaApi.canScrollPrev === "function"
          ? emblaApi.canScrollPrev()
          : true;
      const next =
        typeof emblaApi.canScrollNext === "function"
          ? emblaApi.canScrollNext()
          : true;
      setCanPrev(prev);
      setCanNext(next);
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Left-side arrow stack (smaller, with shadow) */}
      <div className="absolute left-[12%] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <button
          onClick={scrollPrev}
          className={`bg-gray-800/80 rounded-full p-2 shadow-lg hover:scale-105 transition-transform transition-opacity duration-300 ${
            canPrev ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Previous team member"
        >
          <img
            src={upArrow.src}
            alt=""
            className="w-8 h-8"
            aria-hidden="true"
          />
        </button>

        <button
          onClick={scrollNext}
          className={`bg-gray-800/80 rounded-full p-2 shadow-lg hover:scale-105 transition-transform transition-opacity duration-300 rotate-180 ${
            canNext ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Next team member"
        >
          <img
            src={upArrow.src}
            alt=""
            className="w-8 h-8"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Vertical carousel */}
      {/* Set an explicit viewport height so each vertical slide can fill it */}
      <div
        className="overflow-hidden aspect-[1420/1531] w-full"
        ref={(el) => {
          emblaRef(el);
          viewportRef.current = el;
        }}
      >
        <div className="flex flex-col gap-6 h-full">
          {members.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="flex-[0_0_100%] min-h-0 h-full"
            >
              <TeamMemberCard
                name={member.name}
                role={member.role}
                imageSrc={member.imageSrc}
                imagePosition={member.imagePosition}
                blur="small"
                className="h-full p-8"
              />
            </div>
          ))}
        </div>
      </div>

      {/* (buttons moved to left-side stack above) */}
    </div>
  );
};
