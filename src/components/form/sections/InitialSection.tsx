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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Combobox } from "../../ui/combobox";

const categories = [
  { value: "web", label: "Web Development" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "data-science", label: "Data Science" },
  { value: "ui-ux", label: "UI/UX Design" },
];

const universities = [
  {
    value: "kpi",
    label:
      "National Technical University of Ukraine “Igor Sikorsky Kyiv Polytechnic Institute”",
  },
  {
    value: "knu",
    label: "Taras Shevchenko National University of Kyiv",
  },
  {
    value: "naukma",
    label: "National University of Kyiv-Mohyla Academy",
  },
  {
    value: "lviv-polytechnic",
    label: "Lviv Polytechnic National University",
  },
  {
    value: "lnu",
    label: "Ivan Franko National University of Lviv",
  },
  {
    value: "khpi",
    label: "National Technical University “Kharkiv Polytechnic Institute”",
  },
  {
    value: "karazin",
    label: "V.N. Karazin Kharkiv National University",
  },
];

export function InitialSection() {
  const { control, trigger } = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Твої прізвище та ім'я *</FormLabel>
            <FormControl>
              <Input placeholder="Прізвище Ім'я" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Електрона адреса *</FormLabel>
            <FormControl>
              <Input placeholder="email@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="telegram"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Нік в телеграмі (@...) *</FormLabel>
            <FormControl>
              <Input placeholder="@username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Твій телефон (+380...) *</FormLabel>
            <FormControl>
              <Input placeholder="+380..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="university"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Твій навчальний заклад *</FormLabel>
            <FormControl>
              <Combobox
                items={universities}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  void trigger(field.name);
                }}
                placeholder="Оберіть університет..."
                emptyText="Університет не знайдено."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>В якій категорії плануєш змагатися? *</FormLabel>
            <FormControl>
              <Combobox
                items={categories}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  void trigger(field.name);
                }}
                placeholder="Оберіть категорію..."
                emptyText="Категорію не знайдено."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="format"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>В якому форматі плануєш приймати участь? *</FormLabel>
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
                  <RadioGroupItem value="offline" id="offline" />
                  <Label htmlFor="offline">Офлайн на плейсі в Києві</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">Онлайн</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="hasTeam"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Чи є у тебе команда? *</FormLabel>
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
                  <RadioGroupItem value="yes" id="hasTeamYes" />
                  <Label htmlFor="hasTeamYes">Так</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hasTeamNo" />
                  <Label htmlFor="hasTeamNo">Ні</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
