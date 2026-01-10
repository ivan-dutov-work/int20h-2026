import { useState } from "react";
import Heading from "@/components/ui/heading";

import uiCat from "@/assets/categories/ui.svg";
import webCat from "@/assets/categories/web.svg";
import aiCat from "@/assets/categories/ai.svg";
import dsCat from "@/assets/categories/ds.svg";
import heart1 from "@/assets/how-participate/heart1.svg";
import heart2 from "@/assets/how-participate/heart2.svg";
import heart3 from "@/assets/how-participate/heart3.svg";
import heart4 from "@/assets/how-participate/heart4.svg";
import timer from "@/assets/windows/time.webp";
import StarEntry from "@/components/StarEntry";
import Window from "@/components/Window";
import Category from "@/components/Category";
import circles from "@/assets/how-participate/circles.webp";
import organizers from "@/assets/organizers/people.webp";
import manyCircles from "@/assets/organizers/many-circles.webp";
import PentaminoIcon from "@/components/PentaminoIcon";
import zigzag from "@/assets/organizers/zigzag.svg";
import FaqEntry from "@/components/FaqEntry";
import { FAQ_ENTRIES } from "@/assets/faq/faqEntries";
import bestKyivLogo from "@/assets/footer/best.svg";
import instagramLogo from "@/assets/footer/instagram.svg";
import linkedinLogo from "@/assets/footer/linkedin.svg";
import telegramLogo from "@/assets/footer/telegram.svg";
import kpiLogo from "@/assets/footer/kpi.svg";
import closeHandle from "@/assets/windows/close.webp";
import useIsMobile from "@/util/useMobile";
import { ParticipationForm } from "@/components/form/ParticipationForm";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#about", label: "Про проєкт" },
  { href: "#categories", label: "Категорії" },
  { href: "#how-to", label: "Умови участі" },
  { href: "#about-us", label: "Про нас" },
  { href: "#faq", label: "FAQ" },
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { isMobile } = useIsMobile();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  if (showForm) {
    return (
      <>
        <header className="px-6 md:px-8 py-2 flex md:flex-col lg:flex-row justify-between gap-4 items-center bg-brand-gray sticky top-0 w-full z-50">
          <img
            className="md:w-1/2 lg:w-fit cursor-pointer"
            src="/logo.svg"
            alt="INT20H Logo"
            onClick={() => setShowForm(false)}
          />
        </header>

        <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <ParticipationForm />
          <div className="mt-6 text-right">
            <button
              onClick={() => setShowForm(false)}
              className="text-sm text-accent hover:underline"
            >
              Повернутися на головну
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="px-6 md:px-8 py-2 flex md:flex-col lg:flex-row justify-between gap-4 items-center bg-brand-gray sticky top-0 w-full z-50">
        <img className="md:w-1/2 lg:w-fit" src="/logo.svg" alt="INT20H Logo" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-row gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-pixelated capitalize text-sm hover:text-accent transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-brand-light"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-brand-gray z-50 flex flex-col p-4 md:hidden">
            <div className="flex justify-between items-center mb-8">
              <img src="/logo.svg" alt="INT20H Logo" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <img src={closeHandle} alt="Close menu" className="w-6 h-6" />
              </button>
            </div>
            <ul className="flex flex-col gap-8 items-center justify-center flex-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-pixelated capitalize text-2xl font-bold hover:text-accent transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-1 gap-8 md:gap-16 py-8 md:py-15 px-6 md:px-16 items-center">
        <img
          className="w-full max-w-md md:max-w-full"
          src="hero.svg"
          alt="INT20H-2026 hero"
        />
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

          <Button
            variant="pixel"
            pixelSize="lg"
            className="font-pixelated font-bold text-lg max-w-md"
            onClick={() => setShowForm(true)}
          >
            Registration
          </Button>
        </div>
      </div>
      {/* form view is rendered in full-page mode above when `showForm` is true */}
      <div
        id="about"
        className="px-6 md:px-16 py-8 md:py-15 flex flex-col gap-8"
      >
        <Heading className="mb-4">INT20H Hackathon</Heading>
        <p className="max-w-3xl">
          Уже понад 10 років ми об'єднуємо молодих талановитих IT-розробників з
          усієї України. Студенти створюють інноваційні рішення, реалізують
          креативні ідеї, навчаються у провідних експертів та знаходять нові
          можливості для кар’єри.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div className="text-lg tracking-[-0.18px] font-black leading-1.4">
            <p className="font-black">
              Дати:{" "}
              <span className="text-accent">15-16 березня 2026&nbsp;р.</span>
            </p>
            <p className="font-black">
              Формат: <span className="text-accent">гібрид*</span>
            </p>
            <p className="font-black">
              Місце: <span className="text-accent">Київ</span>
            </p>
            <p className="font-black">
              Команди: <span className="text-accent">2-4 особи</span>
            </p>
          </div>
          <div className="hidden md:flex">
            <Window
              heading="INT20H.exe"
              className="flex-col items-center justify-center p-6"
            >
              <div className="flex flex-col gap-6 px-10 items-center">
                <img src={timer} alt="Sand timer" />
                <p className="text-[32px] font-bold font-pixelated-secondary text-center">
                  waiting for you
                </p>
              </div>
            </Window>
          </div>
        </div>

        <p>
          * учасники матимуть можливість обрати формат своєї участі:{" "}
          <span className="text-accent">offline</span> або{" "}
          <span className="text-accent">online</span>
        </p>
      </div>
      <div id="categories" className="px-6 md:px-16 py-8 md:py-15">
        <Heading>Категорії</Heading>

        <div className="mt-8 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          <Category imgSrc={webCat} name="Web" withOverlay={!isMobile} />
          <Category imgSrc={aiCat} name="AI" withOverlay={!isMobile} />
          <Category
            imgSrc={dsCat}
            name="Data Science"
            withOverlay={!isMobile}
          />
          <Category
            imgSrc={uiCat}
            name="UI/UX Design"
            withOverlay={!isMobile}
          />
        </div>
      </div>

      <div id="how-to" className="px-6 md:px-16 py-8 md:py-15">
        <Heading className="mb-8">Як взяти участь?</Heading>
        <div className="flex flex-col gap-8 relative">
          <div className="flex justify-between items-center">
            <div className="flex gap-6 items-center">
              <img src={heart1} alt="Heart 1/4" className="w-8 h-8" />
              <p className="font-black uppercase">
                Реєструйся до{" "}
                <span className="text-accent">
                  -&nbsp;17.02.2026&nbsp;23:59
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <img src={heart2} alt="Heart 2/4" className="w-8 h-8" />
            <p className="font-black uppercase">
              Продемонструй свої скіли <br></br> на відбірковому етапі{" "}
              <span className="text-accent">-&nbsp;20.02.2026</span>
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-6 items-center">
              <img src={heart3} alt="Heart 3/4" className="w-8 h-8" />
              <p className="font-black uppercase">
                Отримай запрошення до{" "}
                <span className="text-accent">-&nbsp;08.03.2026</span>
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <img src={heart4} alt="Heart 4/4" className="w-8 h-8" />
            <p className="font-black uppercase">
              До зустрічі на основному етапі{" "}
              <span className="text-accent">15-16.03.2026</span>
            </p>
          </div>
          <div className="absolute right-2">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div
                className="w-64 h-64 rounded-full"
                style={{
                  background:
                    "linear-gradient(0deg, #EFEFEF 0%, #EFEFEF 100%), #EFEFEF",
                  opacity: 0.1,
                  filter: "blur(50px)",
                }}
              />
            </div>
            <img
              className="w-40 h-40 pixelated-image hidden lg:block"
              src={circles}
              alt="Decorative circles with red stars"
            />
          </div>
        </div>
      </div>
      <div className="px-6 md:px-16 py-8 md:py-15">
        <Heading className="my-6">Що ти отримаєш?</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-4 md:gap-8">
          <StarEntry name="Пет-проєкт у твоє портфоліо" />
          <StarEntry name="Нетворкінг" />

          <StarEntry name="Призи від партнерів" />
          <StarEntry name="Нові скіли" />

          <StarEntry name="Кар'єрні можливості" />
          <StarEntry name="Смачні снеки" />
        </div>
      </div>

      <div
        id="about-us"
        className="px-6 md:px-16 py-8 md:py-15 flex flex-col gap-8 md:gap-16"
      >
        <Heading>Організатори</Heading>
        <p className="max-w-3xl">
          <span className="font-pixelated">
            <span className="text-brand-pink">BEST</span> (Board of European
            Students of Technology)
          </span>{" "}
          — міжнародна неприбуткова волонтерська організація, заснована
          студентами технічних спеціальностей, з метою розвитку студентів. BEST
          забезпечує обмін знаннями та співробітництво між студентами,
          компаніями та університетами на теренах Європи. Локальний осередок
          BEST у Києві діє на базі НТУУ "КПІ".
        </p>

        <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-8 justify-between lg:justify-around">
          <div className="relative">
            <img
              src={manyCircles}
              alt="decorative many circles"
              className="absolute -bottom-4 -right-4 -z-10 hidden lg:block"
            />
            <Window heading="IMG003.JPEG">
              <img
                className="w-full"
                src={organizers}
                alt="Organizers, BEST Kyiv"
              />
            </Window>
          </div>
          <div>
            <div className="relative">
              <img
                src={manyCircles}
                alt="decorative many circles"
                className="absolute -bottom-4 -right-4 -z-10 hidden lg:block"
              />
              <Window
                heading="BEST_ABOUT.EXE"
                className="p-4 bg-brand-dark md:min-w-[480px]"
              >
                <p>
                  <span className="font-pixelated text-brand-pink font-bold">
                    Місія
                  </span>{" "}
                  — розвиток студентів
                </p>
                <p>
                  <span className="font-pixelated text-brand-pink font-bold">
                    Візія
                  </span>{" "}
                  — сила в різноманітті
                </p>
                <div className="w-full h-0.5 bg-light my-2"></div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-2">
                    <PentaminoIcon className="text-accent fill-current w-4 h-4" />
                    <p>
                      Локальних осередків:{" "}
                      <span className="text-brand-pink">83+</span>
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <PentaminoIcon className="text-brand-pink fill-current w-4 h-4" />
                    <p>
                      Представників:{" "}
                      <span className="text-brand-pink">3300+</span>
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <PentaminoIcon className="text-accent fill-current w-4 h-4" />
                    <p>
                      В <span className="text-brand-pink">29</span> країнах
                      Європи
                    </p>
                  </div>
                </div>
              </Window>
            </div>
            <img
              className="mt-6 w-full"
              src={zigzag}
              alt="zigzag pattern line"
            />
          </div>
        </div>
      </div>

      <div id="faq" className="px-6 md:px-16 py-8 md:py-15">
        <Heading>FAQ</Heading>
        <div className="flex flex-col gap-8 items-center max-w-4xl md:px-4 lg:px-8">
          {FAQ_ENTRIES.map((entry, index) => (
            <FaqEntry
              key={index}
              question={entry.question}
              answer={entry.answer}
            />
          ))}
        </div>
      </div>

      <footer className="px-6 md:px-16 py-6 flex flex-col-reverse lg:flex-row gap-8 items-center justify-between bg-brand-gray">
        {/* Logo group */}
        <div className="flex flex-row items-center gap-12">
          <a href="https://best-kyiv.org/">
            <img src={bestKyivLogo} alt="BEST Kyiv Logo" />
          </a>

          <div className="hidden lg:block p-px self-stretch bg-brand-light" />

          <a href="https://kpi.ua/">
            <img src={kpiLogo} alt="KPI Logo" />
          </a>
        </div>

        <div className="block lg:hidden w-full h-0.5 bg-brand-light" />

        <div className="flex flex-row gap-12">
          <a href="https://www.instagram.com/best_kyiv/?hl=ua">
            <img
              src={instagramLogo}
              alt="Instagram"
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </a>
          <a href="https://www.linkedin.com/company/best-kyiv/?originalSubdomain=ua">
            <img
              src={linkedinLogo}
              alt="LinkedIn"
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </a>
          <a href="https://t.me/bestkyiv">
            <img
              src={telegramLogo}
              alt="Telegram"
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </a>
        </div>
      </footer>
    </>
  );
};

export default App;
