"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Work() {
  const { control, watch, trigger } = useFormContext();
  const cv = watch("cv");
  const linkedin = watch("linkedin");
  const wantsCV = watch("wantsCV");

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-pixelated font-semibold">
        В пошуку роботи?😉
      </h2>
      <p>
        INT20H співпрацює з різними компаніями, що зацікавлені в пошуку
        початківців спеціалістів. Якщо розглядаєш пошук роботи, то залиш своє
        CV.
      </p>

      <FormField
        control={control}
        name="wantsCV"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Хочеш залишити своє CV?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  void trigger(field.name);
                }}
                onBlur={field.onBlur}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="wantsCVYes" />
                  <Label htmlFor="wantsCVYes">Так</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="wantsCVNo" />
                  <Label htmlFor="wantsCVNo">Ні</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {wantsCV === "yes" && (
        <>
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Коротко про те, яку роботу шукаєш"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CV</FormLabel>
                <FormControl>
                  <Input placeholder="Посилання на CV" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Посилання на твій LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="workConsent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => {
                        field.onChange(!!v);
                        void trigger(field.name);
                      }}
                      onBlur={() => field.onBlur()}
                    />
                    <label>
                      Я погоджуюсь на обробку та передачу мого CV
                      компаніям-партнерам для пошуку роботи згідно з умовами{" "}
                      <a
                        className="text-accent underline"
                        href="https://drive.google.com/file/d/15C9IuDwTQCrgWCaMgOrpIKbTujgVIM5x/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Політики конфіденційності
                      </a>
                      .
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {cv || linkedin ? (
            <p className="text-sm text-muted-foreground">
              Якщо ви надали CV або LinkedIn, треба надати згоду для передачі
              даних.
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
