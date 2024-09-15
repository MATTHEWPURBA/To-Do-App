'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import IconPicker from '../components/IconPicker';
import { io } from 'socket.io-client';

const iconUrlMap: { [key: string]: string } = {
  alarmClock: '/img/alarm_clock.png',
  books: '/img/books.png',
  coffee: '/img/coffee.png',
  speechBalloon: '/img/speech_balloon.png',
  weightLifter: '/img/weight_lifter.png',
};

const CreateActivity = () => {
  const [formData, setFormData] = useState({
    content: '',
    description: '',
    status: '',
    imgUrl: '', // Added imgUrl field
  });
  const [error, setError] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    let token = Cookies.get('Authorization') as string;
    let tokens = decodeURIComponent(token).split(' ')[1];
    e.preventDefault();
    setError(null);

    try {
      const imgUrl = iconUrlMap[selectedIcon]; // Get local image URL

      const res = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens}`,
        },
        body: JSON.stringify({ ...formData, imgUrl }), // Include the imgUrl in the payload
      });

      if (!res.ok) {
        const { message } = await res.json();
        setError(message || 'Failed to create activity');
        return;
      }

      const newActivity = await res.json();

      const socket = io('http://localhost:8080/');
      socket.emit('activityCreated', newActivity);

      await router.push('/');
      router.refresh();
    } catch (err) {
      setError('An unexpected error occurred');
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
          <input
            type="text"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="default">Status</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="won't do">Won't Do</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Pick an Icon</label>
          <IconPicker
            selectedIcon={selectedIcon}
            onSelectIcon={setSelectedIcon}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Activity
        </button>
      </form>
    </div>
  );
};

export default CreateActivity;
