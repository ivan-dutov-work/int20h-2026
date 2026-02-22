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
import { EndScreen } from "./EndScreen";

const getBackendUrl = () =>
  import.meta.env.PUBLIC_BACKEND_URL ||
  import.meta.env.BACKEND_URL ||
  "http://localhost:8000";

const endDateRaw =
  (import.meta.env.PUBLIC_REGISTRATION_END_DATE as string) ??
  "2026-02-22T23:59:59+02:00";
const endDate = new Date(endDateRaw);

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Ім'я має містити щонайменше 2 символи.",
    })
    .max(100, { message: "Ім'я має містити не більше 100 символів." }),
  email: z
    .string()
    .email({
      message: "Будь ласка, введіть коректну електронну пошту.",
    })
    .max(100, {
      message: "Електронна пошта має містити не більше 100 символів.",
    }),
  telegram: z
    .string()
    .min(1, { message: "Вкажіть Telegram-хендл." })
    .refine((val) => /^@?[a-zA-Z0-9_]{5,32}$/.test(val), {
      message:
        "Вкажіть дійсний Telegram-хендл (наприклад @example або example, 5–32 символи).",
    })
    .max(100, {
      message: "Telegram-хендл має містити не більше 100 символів.",
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
    z
      .string()
      .regex(/^\+380\d{9}$/, {
        message:
          "Введіть номер у форматі +380XXXXXXXXX (можна використовувати пробіли або дефіси).",
      })
      .max(100, {
        message: "Номер телефону має містити не більше 100 символів.",
      }),
  ),
  university: z.string().optional(),

  studyYear: z.string().optional(),

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
  teamName: z
    .string()
    .max(100, { message: "Назва команди має містити не більше 100 символів." })
    .optional(),
  description: z.string().optional(),
  wantsCV: z.enum(["yes", "no"]).optional(),
  cv: z
    .string()
    .max(100, {
      message: "Посилання на CV має містити не більше 100 символів.",
    })
    .optional(),
  linkedin: z
    .string()
    .max(100, {
      message: "Посилання на LinkedIn має містити не більше 100 символів.",
    })
    .optional(),
  workConsent: z.boolean().optional(),
  source: z.string().min(1, { message: "Будь ласка, виберіть джерело." }),
  otherSource: z
    .string()
    .max(100, { message: "Інше джерело має містити не більше 100 символів." })
    .optional(),
  comment: z
    .string()
    .max(2000, { message: "Коментар має містити не більше 2000 символів." })
    .optional(),
  personalDataConsent: z.boolean(),
  skills: z.array(z.string()).default([]),
  is_student: z.enum(["yes", "no"]).default("yes"),
  is_over16: z.boolean().optional(),
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

    if (!data.workConsent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["workConsent"],
        message:
          "Потрібно надати згоду на обробку даних для передачі CV/LinkedIn.",
      });
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

  // Student vs non-student logic: require studyYear/university if student
  if (data.is_student === "yes") {
    if (
      !data.university ||
      (typeof data.university === "string" &&
        data.university.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["university"],
        message: "Будь ласка, виберіть університет.",
      });
    }

    if (
      !data.studyYear ||
      (typeof data.studyYear === "string" && data.studyYear.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["studyYear"],
        message: "Будь ласка, виберіть курс.",
      });
    }
  } else {
    // If not a student, require confirmation that user is over 16
    if (data.is_over16 !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["is_over16"],
        message: "Потрібно підтвердити, що вам більше 16 років.",
      });
    }
  }
});

export function ParticipationForm() {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "failure"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/categories/`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(
          (data.categories || []).sort(
            (a: Category, b: Category) => a.id - b.id,
          ),
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/unis/`);
        if (!response.ok) throw new Error("Failed to fetch universities");
        const data = await response.json();
        setUniversities(
          (data.universities || []).sort(
            (a: University, b: University) => a.id - b.id,
          ),
        );
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/skills/`);
        if (!response.ok) throw new Error("Failed to fetch skills");
        const data = await response.json();
        // data is expected to be string[]
        setSkills(data || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchCategories();
    fetchUniversities();
    fetchSkills();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchemaWithRefine),
    defaultValues: {
      firstName: "",
      email: "",
      telegram: "",
      phone: "",
      university: "",
      studyYear: "",
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
      skills: [],
      is_student: "yes",
      is_over16: false,
    },
    mode: "onTouched",
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("participation-form-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        form.reset(parsed);
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, []); // Run only once on mount

  // Save data on change
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("participation-form-data", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const { trigger, getValues, handleSubmit } = form;

  async function handleNext() {
    if (step === 1) {
      // Validate base fields and conditionally validate student/non-student fields
      const baseFields = [
        "firstName",
        "email",
        "telegram",
        "phone",
        "category",
        "format",
        "hasTeam",
      ];

      const isStudent = getValues("is_student");

      let fieldsToValidate = [...baseFields];
      if (isStudent === "yes") {
        fieldsToValidate.push("university", "studyYear");
      } else {
        fieldsToValidate.push("is_over16");
      }

      const ok = await trigger(fieldsToValidate as any);
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
      ]);
      if (!ok) return;
      // Final submit
      handleSubmit(async (values) => {
        setSubmissionStatus("submitting");
        try {
          const categoryId = categories.find(
            (c) => c.name === values.category,
          )?.id;
          const universityId = universities.find(
            (u) => u.name === values.university,
          )?.id;

          const payload = {
            full_name: values.firstName,
            email: values.email,
            telegram: "@" + values.telegram.replace(/^@/, "").toLowerCase(),
            phone: values.phone,
            university_id: universityId,
            category_id: categoryId,
            study_year: values.studyYear ? parseInt(values.studyYear) : null,
            skills: values.skills,
            format: values.format,
            has_team: values.hasTeam === "yes",
            team_leader: values.teamLeader === "yes",
            team_name: values.teamName || "",
            wants_job: values.wantsCV === "yes",
            job_description: values.description || "",
            cv: values.cv || "",
            linkedin: values.linkedin || "",
            work_consent: values.workConsent || false,
            is_student: values.is_student === "yes",
            is_over16: values.is_over16 === true,
            source: values.source,
            otherSource: values.otherSource || null,
            comment: values.comment || null,
            personal_data_consent: values.personalDataConsent,
          };

          console.log(payload);

          const response = await fetch(`${getBackendUrl()}/form/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Submission failed");
          }

          localStorage.removeItem("participation-form-data");
          setSubmissionStatus("success");
        } catch (error: any) {
          console.error("Submission error:", error);
          setSubmissionStatus("failure");
          setErrorMessage(
            error.message || "Щось пішло не так. Спробуйте ще раз.",
          );
        }
      })();
      return;
    }
  }

  if (new Date() > endDate) {
    return (
      <div className="max-w-lg mx-auto text-center border border-accent/40 bg-accent/5 rounded-sm px-8 py-16 flex flex-col gap-4">
        <p className="font-bold text-2xl">❌ Реєстрацію завершено</p>
        <p className="opacity-60">Приєднуйся до хакатону наступного року!</p>
        <a href="/" className="text-accent underline mt-2">
          ← На головну
        </a>
      </div>
    );
  }

  if (submissionStatus === "success") {
    return <EndScreen type="success" />;
  }

  if (submissionStatus === "failure") {
    return (
      <EndScreen
        type="failure"
        message={errorMessage}
        onRetry={() => setSubmissionStatus("idle")}
      />
    );
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
              <span className="text-accent">Формат:</span> гібрид
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {step === 1 && (
              <InitialSection
                categories={categories}
                universities={universities}
                skills={skills}
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
                  disabled={submissionStatus === "submitting"}
                >
                  Назад
                </Button>
              )}
              <div className="flex-1"></div>
              <Button
                className="px-8 font-pixelated"
                type="button"
                onClick={handleNext}
                variant="pixel"
                disabled={submissionStatus === "submitting"}
              >
                {submissionStatus === "submitting"
                  ? "Надсилання..."
                  : step < 4
                    ? "Далі"
                    : "Надіслати"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
