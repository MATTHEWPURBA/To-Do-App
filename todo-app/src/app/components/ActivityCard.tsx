"use client"; // Ensure this component runs on the client side

// import { Activity } from "../page"; // Import Activity type
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaQuestionCircle } from "react-icons/fa"; // Import icons
import { Activity } from "../page";


type ActivityCardProps = {
  activity: Activity; // Define props type
  onClick: () => void; // Define onClick handler type
};

// Helper function to get border color class
const getBorderColorClass = (typeColor: string) => {
  switch (typeColor) {
    case "green":
      return "border-green-500";
    case "yellow":
      return "border-yellow-500";
    case "red":
      return "border-red-500";
    case "blue":
      return "border-blue-500";
    default:
      return "border-gray-500";
  }
};

// Helper function to get background color class
const getBackgroundColorClass = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100";
    case "in progress":
      return "bg-yellow-50";
    case "won't do":
      return "bg-red-100";
    default:
      return "bg-gray-200";
  }
};

// Helper function to get status icon color class
const getStatusColorIconClass = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-600";
    case "in progress":
      return "bg-yellow-500";
    case "won't do":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
};

const ActivityCard = ({ activity, onClick }: ActivityCardProps) => {
  let StatusIcon = FaQuestionCircle;

  switch (activity.status) {
    case "completed":
      StatusIcon = FaCheckCircle;
      break;
    case "in progress":
      StatusIcon = FaHourglassHalf;
      break;
    case "won't do":
      StatusIcon = FaTimesCircle;
      break;
    default:
      StatusIcon = FaQuestionCircle;
      break;
  }

  const borderColorClass = getBorderColorClass(activity.typeColor);
  const backgroundColorClass = getBackgroundColorClass(activity.status);
  const statusColorIconClass = getStatusColorIconClass(activity.status);

    // Logging for debugging
    console.log("ActivityCard Debug Info:");
    console.log("Activity ID:", activity._id);
    console.log("Activity Status:", activity.status);
    console.log("Type Color:", activity.typeColor);
    console.log("Computed Border Color Class:", borderColorClass);
    console.log("Computed Background Color Class:", backgroundColorClass);
    console.log("Computed Status Icon Color Class:", statusColorIconClass);

  return (
    <div
      key={activity._id}
      className={`bg-white shadow-md rounded-lg p-4 border-l-4 ${borderColorClass} ${backgroundColorClass} flex items-center cursor-pointer`}
      onClick={onClick} // Handle card click
    >
      {activity.imgUrl && <img src={activity.imgUrl} alt={activity.content} className="w-20 h-20 object-cover rounded-lg mr-4" />}
      <div className="flex-grow">
        <p className="text-lg font-semibold">{activity.content}</p>
      </div>
      <div className={`${statusColorIconClass} p-2 rounded-md ml-4`}>
        <StatusIcon className="text-3xl text-white" />
      </div>
    </div>
  );
};

export default ActivityCard;
