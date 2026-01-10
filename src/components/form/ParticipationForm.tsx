"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  InitialSection,
  type Category,
  type University,
} from "./sections/InitialSection";
import { HasTeam } from "./sections/HasTeamSection";
import { NoTeam } from "./sections/NoTeamSection";
import { Work } from "./sections/JobSection";
import { FinalSection } from "./sections/FinalSection";

const BACKEND_URL =
  import.meta.env.PUBLIC_BACKEND_URL ||
  import.meta.env.BACKEND_URL ||
  "http://localhost:8000";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Ім'я має містити щонайменше 2 символи.",
  }),
  email: z.string().email({
    message: "Будь ласка, введіть коректну електронну пошту.",
  }),
  telegram: z
    .string()
    .min(1, { message: "Вкажіть Telegram-хендл." })
    .refine((val) => /^@?[a-zA-Z0-9_]{5,32}$/.test(val), {
      message:
        "Вкажіть дійсний Telegram-хендл (наприклад @example або example, 5–32 символи).",
    }),
  phone: z.preprocess(
    (val) => {
      if (typeof val !== "string") return val;
      const digits = val.replace(/\D/g, "");
      if (digits.length === 9) return "+380" + digits;
      if (digits.length === 12 && digits.startsWith("380")) return "+" + digits;
      if (val.startsWith("+") && /^\+\d+$/.test(val)) return val;
      return val;
    },
    z.string().regex(/^\+380\d{9}$/, {
      message:
        "Введіть номер у форматі +380XXXXXXXXX (можна використовувати пробіли або дефіси).",
    })
  ),
  university: z.string().min(1, {
    message: "Будь ласка, виберіть університет.",
  }),
  category: z.string().min(1, {
    message: "Будь ласка, виберіть категорію.",
  }),
  format: z.enum(["offline", "online"], {
    error: "Будь ласка, виберіть формат участі.",
  }),
  hasTeam: z.enum(["yes", "no"], {
    error: "Будь ласка, вкажіть, чи є у вас команда.",
  }),
  teamLeader: z.enum(["yes", "no"]).optional(),
  teamName: z.string().optional(),
  description: z.string().optional(),
  wantsCV: z.enum(["yes", "no"]).optional(),
  cv: z.string().optional(),
  linkedin: z.string().optional(),
  workConsent: z.boolean().optional(),
  source: z.string().min(1, { message: "Будь ласка, виберіть джерело." }),
  otherSource: z.string().optional(),
  comment: z.string().optional(),
  personalDataConsent: z.boolean(),
  photoConsent: z.boolean(),
});

// Cross-field validation
const formSchemaWithRefine = formSchema.superRefine((data, ctx) => {
  // If user has team, require teamName and teamLeader
  if (data.hasTeam === "yes") {
    if (!data.teamName || data.teamName.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["teamName"],
        message: "Будь ласка, вкажіть назву команди.",
      });
    }
    if (!data.teamLeader) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["teamLeader"],
        message: "Будь ласка, вкажіть, чи є Ви тім-лідом.",
      });
    }
  }

  // If CV or LinkedIn provided, require workConsent
  if (
    (data.cv && data.cv.trim() !== "") ||
    (data.linkedin && data.linkedin.trim() !== "")
  ) {
    if (!data.workConsent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["workConsent"],
        message:
          "Потрібно надати згоду на обробку даних для передачі CV/LinkedIn.",
      });
    }
  }

  // If user indicated they want to leave CV, require a CV link and validate it
  if (data.wantsCV === "yes") {
    if (!data.cv || data.cv.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cv"],
        message: "Будь ласка, надайте посилання на CV.",
      });
    } else {
      try {
        const parsed = new URL(data.cv);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["cv"],
            message: "Посилання на CV має починатися з http:// або https://.",
          });
        }
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cv"],
          message: "Будь ласка, вкажіть коректне посилання на CV.",
        });
      }
    }
  }

  // Validate LinkedIn if provided
  if (data.linkedin && data.linkedin.trim() !== "") {
    try {
      const parsed = new URL(data.linkedin);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["linkedin"],
          message:
            "Посилання на LinkedIn має починатися з http:// або https://.",
        });
      }
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["linkedin"],
        message: "Будь ласка, вкажіть коректне посилання на LinkedIn.",
      });
    }
  }

  // Final consents required
  // If source is 'other', require otherSource
  if (data.source === "other") {
    if (!data.otherSource || data.otherSource.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherSource"],
        message: "Будь ласка, вкажіть джерело, якщо обрали 'Other'.",
      });
    }
  }
  if (!data.personalDataConsent) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["personalDataConsent"],
      message: "Потрібно надати згоду на обробку персональних даних.",
    });
  }
  if (!data.photoConsent) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["photoConsent"],
      message: "Потрібно надати згоду на фото- та відеозйомку.",
    });
  }
});

export function ParticipationForm() {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/categories/`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(
          (data.categories || []).sort((a: Category, b: Category) => a.id - b.id)
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/unis/`);
        if (!response.ok) throw new Error("Failed to fetch universities");
        const data = await response.json();
        setUniversities(
          (data.universities || []).sort(
            (a: University, b: University) => a.id - b.id
          )
        );
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchCategories();
    fetchUniversities();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchemaWithRefine),
    defaultValues: {
      firstName: "",
      email: "",
      telegram: "",
      phone: "",
      university: "",
      category: "",
      format: undefined,
      hasTeam: undefined,
      teamLeader: undefined,
      teamName: "",
      description: "",
      cv: "",
      linkedin: "",
      wantsCV: "no",
      workConsent: false,
      source: "",
      otherSource: "",
      comment: "",
      personalDataConsent: false,
      photoConsent: false,
    },
    mode: "onTouched",
  });

  const { trigger, getValues, handleSubmit } = form;

  async function handleNext() {
    if (step === 1) {
      const ok = await trigger([
        "firstName",
        "email",
        "telegram",
        "phone",
        "university",
        "category",
        "format",
        "hasTeam",
      ]);
      if (!ok) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      const hasTeam = getValues("hasTeam");
      if (hasTeam === "yes") {
        const ok = await trigger(["teamLeader", "teamName"]);
        if (!ok) return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      const ok = await trigger([
        "description",
        "cv",
        "linkedin",
        "workConsent",
      ]);
      if (!ok) return;
      setStep(4);
      return;
    }

    if (step === 4) {
      const ok = await trigger([
        "source",
        "otherSource",
        "personalDataConsent",
        "photoConsent",
      ]);
      if (!ok) return;
      // Final submit
      handleSubmit((values) => {
        console.log("Final submission", values);
      })();
      return;
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-background text-brand-light rounded-lg shadow-md overflow-hidden transition-all duration-150">
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-pixelated form-heading-pixel mb-4">
            Registration INT20H Hackathon 2026
          </h1>
          <div className="space-y-4 text-sm">
            <p>
              INT20H - це два дні інтенсивної розробки власного проекту,
              нетворкінгу, знайомства з представниками компаній та обмін ідеями!
              Спробуй свої сили у одній з категорій та поринь у світ
              програмування разом з кращими IT-компаніями на ринку України.
            </p>
            <p>
              <span className="text-accent">Дата проведення:</span> 14-15
              березня
              <br />
              <strong>Формат:</strong> гібрид
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {step === 1 && (
              <InitialSection
                categories={categories}
                universities={universities}
              />
            )}
            {step === 2 &&
              (form.getValues("hasTeam") === "yes" ? <HasTeam /> : <NoTeam />)}
            {step === 3 && <Work />}
            {step === 4 && <FinalSection />}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="pixel-outline"
                  onClick={() => setStep(step - 1)}
                >
                  Назад
                </Button>
              )}
              <div className="flex-1"></div>
              <Button
                className="px-8"
                type="button"
                onClick={handleNext}
                variant="pixel"
              >
                {step < 4 ? "Далі" : "Надіслати"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
