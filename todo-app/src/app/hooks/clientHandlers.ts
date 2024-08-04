"use client";
import { useRouter } from "next/navigation";

export const useHandleAddTask = () => {
  const router = useRouter();

  const handleAddTask = () => {
    router.push("/create-activity");
  };

  return handleAddTask;
};
