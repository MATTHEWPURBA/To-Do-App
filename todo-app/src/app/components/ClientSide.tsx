'use client'; // Ensure this component runs on the client side

import { useEffect, useState } from 'react';
import ActivityCard from './ActivityCard';
import Sidebar from './Sidebar';
import { Activity } from '../page';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

type ClientSideProps = {
  activities: Activity[];
};

const ClientSide = ({ activities: initialActivities }: ClientSideProps) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const router = useRouter(); // Initialize the router

  const handleAddTask = () => {
    router.push('/create-activity');
  };

  useEffect(() => {
    const socket = io('http://localhost:8080/');
    console.log(socket, 'ini socket nih');
    console.log('Socket connected:', socket.connected);
    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('activityUpdated', (updatedActivity: Activity) => {
      console.log('Received activityUpdated event:', updatedActivity);
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity._id === updatedActivity._id ? updatedActivity : activity
        )
      );
      router.refresh(); // Refresh the page to reflect the updated activity
    });

    socket.on('activityDeleted', (id: string) => {
      removeActivityFromList(id);
    });

    return () => {
      socket.disconnect();
      console.log('Socket disconnected in cleanup');
    };
  }, [router]);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.add('open');
    }
  };

  const removeActivityFromList = (id: string) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity._id !== id)
    );
  };

  return (
    <>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center p-4 border border-dashed border-gray-300 rounded-lg">
            <p className="text-xl font-semibold text-gray-700">
              No activities yet. Start by adding a new activity!
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              onClick={() => handleActivityClick(activity)}
            />
          ))
        )}
      </div>
      <Sidebar
        activity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
        onUpdate={(updatedActivity: Activity) => {
          setActivities((prevActivities) =>
            prevActivities.map((activity) =>
              activity._id === updatedActivity._id ? updatedActivity : activity
            )
          );
          router.refresh(); // Refresh the page after updating activity
        }}
      />

      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-300 max-w-4xl mx-auto w-full mt-16">
        <button
          onClick={handleAddTask}
          className="flex items-center bg-orange-100 text-opacity-80 text-black py-4 px-5 rounded-2xl w-full justify-start text-xl font-semibold border border-gray-200"
        >
          <span className="bg-orange-400 p-3 rounded-full mr-4">
            <FaPlus className="text-4xl text-white" />
            {/* Render Plus icon */}
          </span>
          Add New Task
        </button>
      </div>
    </>
  );
};

export default ClientSide;
