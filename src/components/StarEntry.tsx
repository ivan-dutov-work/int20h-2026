import star from "@/assets/benefits/star.webp";

const StarEntry = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-8 items-center">
      <img className="w-8 h-8" src={star} alt="Star bullet point" />
      <p className="text-accent-secondary font-black uppercase">{name}</p>
    </div>
  );
};

export default StarEntry;
