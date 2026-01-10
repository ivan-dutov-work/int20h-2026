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

export function HasTeam() {
  const { control, trigger } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="font-pixelated text-md">
        Мати команду на старті завжди добре!🎉 Переконайтесь що всі учасники
        написали назву команди без помилок. Визначіть хто буде тім-лідом
        команди, саме з ним буде йти комунікація з організаторами та менторами.
      </p>

      <FormField
        control={control}
        name="teamLeader"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Ти тім-лід своєї команди? *</FormLabel>
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
                  <RadioGroupItem value="yes" id="teamLeaderYes" />
                  <Label htmlFor="teamLeaderYes">Так</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="teamLeaderNo" />
                  <Label htmlFor="teamLeaderNo">Ні</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="teamName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Назва команди *</FormLabel>
            <FormControl>
              <Input placeholder="Назва команди" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
