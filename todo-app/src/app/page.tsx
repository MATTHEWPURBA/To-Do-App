import { ObjectId } from "mongodb";
import { Metadata } from "next";
import ActivityCard from "./components/ActivityCard";
import { FaPlus } from "react-icons/fa";

export type Activity = {
  _id: number;
  content: string;
  authorId: ObjectId;
  imgUrl?: string;
  typeColor: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  status: "in progress" | "completed" | "won't do";
};

export const metadata: Metadata = {
  title: "ToDoApp - Activity Management",
  description: "Manajemen Aktivitas",
};

async function getData(): Promise<Activity[]> {
  const res = await fetch("http://localhost:3000/api/public/todo/", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  const data = await res.json();
  console.log(data);
  return data.activities;
}

export default async function Home() {
  const activities = await getData();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto p-4 w-full flex-1">
        <h1 className="text-4xl font-bold mb-4">My Task Board</h1>
        <p className="text-lg mb-6">Tasks to keep organized</p>
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-300 max-w-4xl mx-auto w-full">
        <button className="flex items-center bg-orange-100 text-opacity-80 text-black py-4 px-5 rounded-2xl w-full justify-start text-xl font-semibold border border-gray-200">
          <span className="bg-orange-400 p-3 rounded-full mr-4">
            <FaPlus className="text-4xl text-white" />
          </span>
          Add New Task
        </button>
      </div>
    </div>
  );
}
