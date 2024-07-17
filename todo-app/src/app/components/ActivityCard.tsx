"use client"; // Ensure this component runs on the client side

import { Activity } from "../page"; // Import Activity type
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaQuestionCircle } from "react-icons/fa"; // Import icons

type ActivityCardProps = {
  activity: Activity; // Define props type
  onClick: () => void; // Define onClick handler type
};

const ActivityCard = ({ activity, onClick }: ActivityCardProps) => {
  let statusColorClass = "";
  let StatusIcon = FaQuestionCircle;
  let statusColorIcon = "";

  switch (activity.status) {
    case "completed":
      statusColorClass = "bg-green-200";
      StatusIcon = FaCheckCircle;
      statusColorIcon = "bg-green-600";
      break;
    case "in progress":
      statusColorClass = "bg-yellow-100";
      StatusIcon = FaHourglassHalf;
      statusColorIcon = "bg-yellow-500";
      break;
    case "won't do":
      statusColorClass = "bg-red-200";
      StatusIcon = FaTimesCircle;
      statusColorIcon = "bg-red-600";
      break;
    default:
      statusColorClass = "bg-gray-200";
      StatusIcon = FaQuestionCircle;
      break;
  }

  return (
    <div
      key={activity._id}
      className={`bg-white shadow-md rounded-lg p-4 border-l-4 border-${activity.typeColor}-500 ${statusColorClass} flex items-center cursor-pointer`}
      onClick={onClick} // Handle card click
    >
      {activity.imgUrl && <img src={activity.imgUrl} alt={activity.content} className="w-20 h-20 object-cover rounded-lg mr-4" />}
      <div className="flex-grow">
        <p className="text-lg font-semibold">{activity.content}</p>
      </div>
      <div className={`${statusColorIcon} p-2 rounded-md ml-4`}>
        <StatusIcon className="text-3xl text-white" />
      </div>
    </div>
  );
};

export default ActivityCard;
