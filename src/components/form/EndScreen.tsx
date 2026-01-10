"use client";

import { Button } from "@/components/ui/button";

interface EndScreenProps {
  type: "success" | "failure";
  message?: string;
  onRetry?: () => void;
}

export function EndScreen({ type, message, onRetry }: EndScreenProps) {
  if (type === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="rounded-full bg-green-500/20 p-4 border border-green-500/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-400"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-pixelated text-brand-light">Успіх!</h2>
          <p className="text-brand-gray max-w-md">
            {message ||
              "Дякуємо за реєстрацію! Перевіряй пошту/Telegram для отримання подальших інструкцій."}
          </p>
        </div>
        <Button
          variant="pixel-outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          На головну
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="rounded-full bg-red-500/20 p-4 border border-red-500/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-400"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-pixelated text-red-400">Помилка</h2>
        <p className="text-brand-gray max-w-md">
          {message || "Щось пішло не так. Спробуйте ще раз."}
        </p>
      </div>
      {onRetry && (
        <Button variant="pixel" onClick={onRetry} className="mt-4">
          Спробувати ще раз
        </Button>
      )}
    </div>
  );
}
