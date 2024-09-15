import './globals.css';
import { Metadata } from 'next';
import ClientSide from './components/ClientSide';
import { cookies } from 'next/headers';

export type Activity = {
  _id: string;
  content: string;
  authorId: string;
  imgUrl?: string;
  typeColor: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  status: 'in progress' | 'completed' | "won't do";
};

export const metadata: Metadata = {
  title: 'ToDoApp - Activity Management',
  description: 'Manajemen Aktivitas',
};

async function getData(headers: HeadersInit): Promise<Activity[]> {
  const res = await fetch('http://localhost:3000/api/todo', {
    cache: 'no-store',
    headers,
  });

  // console.log(res, "ini adalah res");
  if (!res.ok) {
    throw new Error('failed to fetch data');
  }
  const data = await res.json();
  return data.activities;
}

export default async function Home() {
  try {
    const headersList = new Headers();
    // Get cookies on the server side using next/headers
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization')?.value as string;
    if (token) {
      const decodedToken = decodeURIComponent(token);
      const tokenParts = decodedToken.split(' ');
      if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        headersList.set('Authorization', `Bearer ${tokenParts[1]}`);
      } else {
        throw new Error('Unauthorized');
      }
    } else {
      throw new Error('Unauthorized');
    }

    // console.log(token, 'ini token nih'); // Check if the token is retrieved correctly

    const activities = await getData(headersList); // Fetch activities

    return (
      <div className="min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto p-4 w-full flex-1">
          <h1 className="text-4xl font-bold mb-4">My Task Board</h1>
          <p className="text-lg mb-6">Tasks to keep organized</p>
          <ClientSide activities={activities} />
          {/* Render ClientSide component with activities */}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto p-4 w-full flex-1">
          <h1 className="text-4xl font-bold mb-4">My Task Board</h1>
          <p className="text-lg mb-6">
            Failed to fetch tasks. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
