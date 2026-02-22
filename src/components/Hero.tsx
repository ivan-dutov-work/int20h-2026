import { Button } from "./ui/button";
import heroImg from "@/assets/hero/hero.svg";
import handImg from "@/assets/hero/hand.svg";

const endDateRaw =
  (import.meta.env.PUBLIC_REGISTRATION_END_DATE as string) ??
  "2026-02-22T23:59:59+02:00";
const endDate = new Date(endDateRaw);

export function Hero() {
  const isRegistrationClosed = new Date() > endDate;

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-1 gap-8 md:gap-16 py-8 md:py-15 px-6 md:px-16 items-center">
      <div className="relative w-full max-w-2/3 md:max-w-full">
        <img
          className="w-full max-w-md md:max-w-full"
          src={heroImg.src}
          alt="INT20H-2026 hero"
          loading="eager"
          fetchPriority="high"
        />
        <div className="blur-[95px] absolute top-0 left-1/3 right-0 bottom-1/4 bg-accent z-[-1] opacity-10 rounded-full" />
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h2 className="font-black text-lg leading-1.2 tracking-[-0.72px] max-w-xl">
            Ставай частинкою найбільшого студентського IT-хакатону в Україні!
          </h2>
          <div>
            <p className="mt-4">14-15 березня 2026, Київ</p>
            <p className="text-accent font-bold">Гібридний формат</p>
          </div>
        </div>

        {isRegistrationClosed ? (
          <div className="border border-accent/40 bg-accent/5 rounded-sm px-6 py-4 flex flex-col gap-2 w-fit">
            <p className="font-pixelated font-bold text-lg">
              ❌ Реєстрація завершена
            </p>
            <p className="text-sm opacity-60">
              Приєднуйся до хакатону наступного року!
            </p>
          </div>
        ) : (
          <a href="/form" className="w-full">
            <div className="relative w-fit max-w-md group">
              <Button
                variant="pixel"
                pixelSize="lg"
                className="font-pixelated font-bold text-lg w-full"
              >
                Registration
              </Button>
              <img
                src={handImg.src}
                alt="Hand"
                className="w-16 h-16 md:w-24 md:h-24 absolute top-1/2 right-0 translate-x-1/3 z-20 pointer-events-none"
              />
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
