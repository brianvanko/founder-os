"use client";

import { useState } from "react";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  children: (props: { onClick: () => void }) => React.ReactNode;
  variant?: "danger" | "default";
}

export function ConfirmDialog({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  children,
  variant = "default",
}: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
      setIsOpen(false);
    } catch (error) {
      // Error handling is done by parent
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {children({ onClick: () => setIsOpen(true) })}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => !isProcessing && setIsOpen(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              {title}
            </h2>
            <p className="text-slate-600 mb-6">{description}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isProcessing}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 transition-colors ${
                  variant === "danger"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                {isProcessing ? "Processing..." : confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
