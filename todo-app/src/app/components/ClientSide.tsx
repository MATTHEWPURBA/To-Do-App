"use client"; // Ensure this component runs on the client side

import { useState } from "react";
import { Activity } from "../page"; // Import Activity type
import ActivityCard from "./ActivityCard"; // Import ActivityCard component
import Sidebar from "./Sidebar"; // Import Sidebar component

type ClientSideProps = {
  activities: Activity[]; // Define props type
};

const ClientSide = ({ activities }: ClientSideProps) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null); // State to keep track of selected activity

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity); // Set the selected activity
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.add("open"); // Open the sidebar
    }
  };

  return (
    <>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} onClick={() => handleActivityClick(activity)} /> // Render ActivityCard with click handler
        ))}
      </div>
      <Sidebar activity={selectedActivity} /> // Render Sidebar with selected activity
    </>
  );
};

export default ClientSide;
