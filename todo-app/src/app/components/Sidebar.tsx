'use client'; // Ensure this component runs on the client side

import React, { useEffect, useState } from 'react';
import { Activity } from '../page'; // Import Activity type
import { deleteActivity, updateActivity } from './EditActivity';
import { useRouter } from 'next/navigation';
import IconPicker from './IconPicker'; // Import IconPicker component

// Define the props type for Sidebar
type SidebarProps = {
  activity: Activity | null; // The activity to be edited
  setSelectedActivity: (activity: Activity | null) => void; // Function to clear the selected activity
  // onUpdate: (id: string, updatedData: Record<string, any>) => void;
  onUpdate: (activity: Activity) => void; // Add onUpdate prop
  onDelete: (id: string) => void;
};

// Define the possible status values
type Status = 'in progress' | 'completed' | "won't do";
// Sidebar component definition
const Sidebar = ({
  activity,
  setSelectedActivity,
  onUpdate,
  onDelete,
}: SidebarProps) => {
  //     // State to manage form data

  // #1 Way
  //   const [formData, setFormData] = useState<FormData>(new FormData());

  //   // Effect to initialize form data when activity changes
  //   useEffect(() => {
  //     if (activity) {
  //       const newFormData = new FormData();
  //       newFormData.append("content", activity.content);
  //       newFormData.append("description", activity.description);
  //       newFormData.append("status", activity.status);
  //       setFormData(newFormData);
  //     }
  //   }, [activity]);

  //useEffect nya belom paham ni gua fungsi nya
  // #1 Way

  // #2 Way
  const router = useRouter(); // Initialize the router

  const [formData, setFormData] = useState({
    content: '',
    description: '',
    status: '' as Status,
    imgUrl: '', // Added imgUrl field
  });
  const [selectedIcon, setSelectedIcon] = useState<string>(
    activity?.imgUrl ?? ''
  );

  useEffect(() => {
    if (activity) {
      setFormData({
        content: activity.content,
        description: activity.description,
        status: activity.status,
        imgUrl: activity.imgUrl ?? '', // Provide a default empty string if imgUrl is undefined
      });
      setSelectedIcon(activity.imgUrl ?? ''); // Provide a default empty string if imgUrl is undefined
    }
  }, [activity]);

  // #2 Way

  // Function to close the sidebar
  const handleClose = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.remove('open'); // Close the sidebar
    }
    setSelectedActivity(null); // Clear the selected activity
  };

  //  #1 Way

  // // Function to handle form field changes
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   formData.set(name, value);
  //   setFormData(new FormData(formData)); // Update form data state
  // };

  // // Function to handle form submission
  // const onSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   updateActivity(formData, activity?._id || null, handleClose); // Update the activity
  // };

  // #1 Way

  //#2 Way

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
    // const updatedFormData = new FormData();
    // updatedFormData.append("content", formData.content);
    // updatedFormData.append("description", formData.description);
    // updatedFormData.append("status", formData.status);
    // updateActivity(updatedFormData, activity?._id || null, handleClose);
    const updatedData = {
      content: formData.content,
      description: formData.description,
      status: formData.status,
      imgUrl: selectedIcon, // Include selectedIcon
    };

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

  //#2 Way

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
                className="bg-blue-500 text-white px-4 py-2 rounded mr-4" // Add more space between buttons with `mr-4`
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
