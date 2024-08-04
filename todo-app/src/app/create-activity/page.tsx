"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
type Status = "in progress" | "completed" | "won't do";
import Cookies from "js-cookie";


const CreateActivity = () => {
  const [formData, setFormData] = useState({
    content: "",
    description: "",
    status: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => {
    const { name, value } = e.target;
 // Handling different types of form elements
 if (e.target instanceof HTMLSelectElement) {
    setFormData({
      ...formData,
      [name]: value,
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    let token = Cookies.get("Authorization") as string;
    console.log(token,"ini token nih")
    token = decodeURIComponent(token);
    const tokenParts = token.split(" ");
    const tokens = tokenParts[1];
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tokens}`, // Replace with your actual token if needed
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setError(message || "Failed to create activity");
        return;
      }

      router.push("/");
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Activity</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700" htmlFor="content">
            Content
          </label>
          <input type="text" id="content" name="content" value={formData.content} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="status">
            Status
          </label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required>
            <option value="default">status  </option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="won't do">Won't Do</option>
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Activity
        </button>
      </form>
    </div>
  );
};

export default CreateActivity;
