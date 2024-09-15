'use client';

import React, { useEffect, useState } from 'react';
import { Activity } from '../page'; // Import Activity type
import { deleteActivity, updateActivity } from './EditActivity';
import { useRouter } from 'next/navigation';
import IconPicker from './IconPicker'; // Import IconPicker component

type SidebarProps = {
  activity: Activity | null;
  setSelectedActivity: (activity: Activity | null) => void;
  onUpdate: (activity: Activity) => void;
  onDelete: (id: string) => void;
};

type Status = 'in progress' | 'completed' | "won't do";

// Helper function to get icon name from URL
const getIconNameFromUrl = (url: string): string => {
  const iconUrlMap: { [key: string]: string } = {
    alarm_clock: '/img/alarm_clock.png',
    books: '/img/books.png',
    coffee: '/img/coffee.png',
    speech_balloon: '/img/speech_balloon.png', // Ensure this matches the actual filename
    weight_lifter: '/img/weight_lifter.png',
  };

  return (
    Object.entries(iconUrlMap).find(([iconUrl]) => iconUrl === url)?.[1] ?? ''
  );
};

const Sidebar = ({
  activity,
  setSelectedActivity,
  onUpdate,
  onDelete,
}: SidebarProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    content: '',
    description: '',
    status: '' as Status,
    imgUrl: '',
  });

  const [selectedIcon, setSelectedIcon] = useState<string>('');

  useEffect(() => {
    if (activity) {
      const iconName = getIconNameFromUrl(activity?.imgUrl ?? '');
      setFormData({
        content: activity.content,
        description: activity.description,
        status: activity.status,
        imgUrl: activity.imgUrl ?? '',
      });
      setSelectedIcon(iconName);
    }
  }, [activity]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Selected Icon before submit:', selectedIcon); // Debugging log

    const updatedData = {
      content: formData.content,
      description: formData.description,
      status: formData.status,
      imgUrl: selectedIcon ? `/img/${selectedIcon}.png` : formData.imgUrl,
    };

    console.log('Updated Data:', updatedData); // Debugging log to inspect data before updating

    if (activity?._id) {
      try {
        const updatedActivity = await updateActivity(activity._id, updatedData);
        onUpdate(updatedActivity);
        console.log('Activity updated successfully:', updatedActivity);
        handleClose();
        window.location.href = '/';
      } catch (error) {
        console.error('Error updating activity:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (activity?._id) {
      try {
        await deleteActivity(activity._id);
        onDelete(activity._id);
        setSelectedActivity(null);
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  const handleClose = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.remove('open');
    }
    setSelectedActivity(null);
  };

  return (
    <div
      id="sidebar"
      className="fixed right-0 top-0 w-1/3 h-full bg-gray-100 shadow-lg transform transition-transform duration-300 translate-x-full"
    >
      <div className="p-4">
        <button onClick={handleClose} className="text-red-500 font-bold mb-4">
          Close
        </button>
        {activity && (
          <>
            <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <input
                  type="text"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="won't do">Won't Do</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Pick an Icon
                </label>
                <IconPicker
                  selectedIcon={selectedIcon}
                  onSelectIcon={setSelectedIcon}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
