import React, { useState } from "react";
import faqArrow from "@/assets/faq/uparrow.svg";
interface FaqEntryProps {
  question: string;
  answer: string | React.ReactNode;
}

const FaqEntry = ({ question, answer }: FaqEntryProps) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <div className="pixelated-corners bg-brand-gray w-full">
      <button
        type="button"
        aria-expanded={open}
        onClick={toggle}
        className="p-1 pixelated-corners bg-brand-gold w-full text-left cursor-pointer"
      >
        <div className="pixelated-corners bg-brand-dark px-4 py-1 flex flex-row justify-between items-center transition-colors duration-150">
          <p className="font-pixelated text-sm md:text-md lg:text-lg text-brand-pink font-bold">
            {question}
          </p>
          <img
            className={`w-8 h-8 transform transition-transform duration-200 ${
              open ? "" : "rotate-180"
            }`}
            src={faqArrow}
            alt={open ? "Up Arrow" : "Down Arrow"}
          />
        </div>
      </button>

      {open && <div className="px-9 py-2 lg:text-[32px]">{answer}</div>}
    </div>
  );
};

export default FaqEntry;
