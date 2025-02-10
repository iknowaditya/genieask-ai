// components/ui/Toast.tsx
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "default" | "success" | "error";
}

export function Toast({ message, type = "default" }: ToastProps) {
  return (
    <ToastPrimitives.Provider>
      <ToastPrimitives.Root
        className={cn(
          "bg-white rounded-lg shadow-lg p-4",
          "data-[type=success]:bg-green-50",
          "data-[type=error]:bg-red-50",
          "fixed bottom-4 right-4 z-50"
        )}
        data-type={type}
      >
        <div className="flex">
          <div className="flex-1">{message}</div>
          <ToastPrimitives.Close>
            <X className="w-4 h-4" />
          </ToastPrimitives.Close>
        </div>
      </ToastPrimitives.Root>
      <ToastPrimitives.Viewport />
    </ToastPrimitives.Provider>
  );
}
