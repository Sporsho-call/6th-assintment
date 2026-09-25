"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { Workout, ToastMessage } from "../types";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  completed: number[];
  toast: ToastMessage | null;
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (workout: Workout) => void;
  showToast: (
    message: string,
    type?: "success" | "error" | "info"
  ) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const isLoaded = useRef(false);

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog_plan");
      const savedSaved = localStorage.getItem("fitlog_saved");
      const savedCompleted = localStorage.getItem("fitlog_completed");

      if (savedPlan) {
        setPlan(JSON.parse(savedPlan));
      }

      if (savedSaved) {
        setSaved(JSON.parse(savedSaved));
      }

      if (savedCompleted) {
        setCompleted(JSON.parse(savedCompleted));
      }
    } catch (error) {
      console.error("Failed to load FitLog data:", error);
    } finally {
      isLoaded.current = true;
    }
  }, []);

  // Save data only after the initial localStorage load is completed
  useEffect(() => {
    if (!isLoaded.current) return;

    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
      localStorage.setItem("fitlog_completed", JSON.stringify(completed));
    } catch (error) {
      console.error("Failed to save FitLog data:", error);
    }
  }, [plan, saved, completed]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToPlan = (workout: Workout): boolean => {
    if (plan.length >= 5) {
      showToast(
        "Plan is full! Maximum 5 workouts allowed for today.",
        "error"
      );
      return false;
    }

    if (plan.some((w) => w.id === workout.id)) {
      showToast("Already in today's plan!", "info");
      return false;
    }

    setPlan((currentPlan) => [...currentPlan, workout]);
    showToast(`Added "${workout.name}" to today's plan`);

    return true;
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) {
      showToast("Already saved for later!", "info");
      return;
    }

    setSaved((currentSaved) => [...currentSaved, workout]);
    showToast(`Saved "${workout.name}" for later`);
  };

  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );

    showToast("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );

    showToast("Removed from saved list");
  };

  const markAsDone = (workout: Workout) => {
    if (!completed.includes(workout.id)) {
      setCompleted((currentCompleted) => [
        ...currentCompleted,
        workout.id,
      ]);
    }

    setPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== workout.id)
    );

    showToast(`Completed "${workout.name}"! Great job! 🎉`);
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        completed,
        toast,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        showToast,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = (): PlanContextType => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }

  return context;
};