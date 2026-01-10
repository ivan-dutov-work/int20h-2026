"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Combobox from "@/components/ui/combobox";

export function FinalSection() {
  const { control, watch, trigger } = useFormContext();
  const source = watch("source");

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="source"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Звідки ти дізнався/-лася про хакатон? *</FormLabel>
            <FormControl>
              <Combobox
                items={[
                  { value: "best", label: "Соціальні мережі BEST Kyiv" },
                  { value: "otherSocial", label: "Інші соціальні мережі" },
                  { value: "friends", label: "Друзі" },
                  {
                    value: "past",
                    label: "Через минулорічний INT20H/інші івенти BEST Kyiv",
                  },
                  { value: "other", label: "Інше" },
                ]}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  void trigger(field.name);
                }}
                placeholder="Оберіть джерело..."
                emptyText="Джерело не знайдено."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {source === "other" && (
        <FormField
          control={control}
          name="otherSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Інше:</FormLabel>
              <FormControl>
                <Input placeholder="Вкажіть джерело" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Місце для твого коментаря чи мему😎</FormLabel>
            <FormControl>
              <Textarea placeholder="Коментар" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="personalDataConsent"
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
                />
                <label>
                  Я надаю згоду на обробку моїх персональних даних відповідно до{" "}
                  <a
                    className="text-accent underline"
                    href="https://zakon.rada.gov.ua/laws/show/2297-17"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Закону України «Про захист персональних даних»
                  </a>
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
