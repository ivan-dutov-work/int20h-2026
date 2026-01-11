"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/util/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import closeIcon from "@/assets/windows/close.webp";

export interface ComboboxItem {
  value: string;
  label: string;
}

interface MultiSelectComboboxProps {
  items: ComboboxItem[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  emptyText?: string;
  className?: string;
}

export function MultiSelectCombobox({
  items,
  selectedValues,
  onChange,
  placeholder = "Select items...",
  emptyText = "No items found.",
  className,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [localItems, setLocalItems] = React.useState<ComboboxItem[]>(items);

  // Update local items when items prop changes
  React.useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
    setInputValue("");
  };

  const handleCreateCustom = (customValue: string) => {
    const trimmedValue = customValue.trim();
    if (!trimmedValue) return;

    // Create a new item with the custom value
    const newItem: ComboboxItem = {
      value: trimmedValue.toLowerCase(),
      label: trimmedValue,
    };

    // Add to local items if not already present
    if (!localItems.some((item) => item.value === newItem.value)) {
      setLocalItems([...localItems, newItem]);
    }

    // Add to selected values
    if (!selectedValues.includes(newItem.value)) {
      onChange([...selectedValues, newItem.value]);
    }

    setInputValue("");
  };

  const handleRemove = (valueToRemove: string) => {
    onChange(selectedValues.filter((v) => v !== valueToRemove));
  };

  // Check if input matches any existing items
  const hasExactMatch = localItems.some(
    (item) => item.label.toLowerCase() === inputValue.toLowerCase()
  );
  const showCreateOption = inputValue.trim() !== "" && !hasExactMatch;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-auto min-h-10 px-3 py-2 hover:bg-background",
            className
          )}
        >
          <div className="flex flex-wrap gap-1 items-center w-full">
            {selectedValues.length > 0 ? (
              selectedValues.map((value) => {
                const item = localItems.find((i) => i.value === value);
                return (
                  <span
                    key={value}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item?.label || value}
                    <div
                      role="button"
                      tabIndex={0}
                      className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRemove(value);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemove(value);
                      }}
                    >
                      <img
                        src={closeIcon.src}
                        alt="Remove"
                        className="h-2 w-2 invert"
                      />
                    </div>
                  </span>
                );
              })
            ) : (
              <span className="text-muted-foreground font-normal">
                {placeholder}
              </span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {showCreateOption && (
                <CommandItem
                  className="group"
                  value={inputValue}
                  onSelect={() => handleCreateCustom(inputValue)}
                >
                  <Check className="mr-2 h-4 w-4 opacity-0" />
                  Створити "{inputValue}"
                </CommandItem>
              )}
              {localItems.map((item) => (
                <CommandItem
                  key={item.value}
                  className="group"
                  value={item.label}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 group-data-[selected=true]:text-black text-foreground",
                      selectedValues.includes(item.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
