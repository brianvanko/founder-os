"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseAutosaveOptions {
  onSave: () => Promise<void>;
  delay?: number; // milliseconds, default 30000 (30 seconds)
}

export function useAutosave({ onSave, delay = 30000 }: UseAutosaveOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const saveInProgressRef = useRef(false);

  const scheduleSave = useCallback(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Schedule new save
    timeoutRef.current = setTimeout(async () => {
      if (!saveInProgressRef.current) {
        saveInProgressRef.current = true;
        try {
          await onSave();
        } catch (error) {
          console.error("Autosave failed:", error);
        } finally {
          saveInProgressRef.current = false;
        }
      }
    }, delay);
  }, [onSave, delay]);

  const saveNow = useCallback(async () => {
    // Clear any pending saves
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Save immediately
    if (!saveInProgressRef.current) {
      saveInProgressRef.current = true;
      try {
        await onSave();
      } catch (error) {
        console.error("Save failed:", error);
      } finally {
        saveInProgressRef.current = false;
      }
    }
  }, [onSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { scheduleSave, saveNow };
}
