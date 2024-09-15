'use client'; // Ensure this component runs on the client side

// import { Activity } from "../page"; // Import Activity type
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaQuestionCircle,
} from 'react-icons/fa'; // Import icons
import { Activity } from '../page';
import styles from './ActivityCard.module.css'; // Import the CSS module


type ActivityCardProps = {
  activity: Activity; // Define props type
  onClick: () => void; // Define onClick handler type
};

// Helper function to get the background color class
const getBackgroundColorClass = (status: string) => {
  switch (status) {
    case 'completed':
      return styles.bgGreen;
    case 'in progress':
      return styles.bgYellow;
    case "won't do":
      return styles.bgRed;
    default:
      return styles.bgGray;
  }
};

// Helper function to get the border color class
const getBorderColorClass = (typeColor: string) => {
  switch (typeColor) {
    case 'green':
      return styles.borderGreen;
    case 'yellow':
      return styles.borderYellow;
    case 'red':
      return styles.borderRed;
    default:
      return styles.borderGray;
  }
};


// Helper function to get status icon color class
const getStatusColorIconClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-600';
    case 'in progress':
      return 'bg-yellow-500';
    case "won't do":
      return 'bg-red-600';
    default:
      return 'bg-gray-500';
  }
};

const ActivityCard = ({ activity, onClick }: ActivityCardProps) => {
  let StatusIcon = FaQuestionCircle;

  switch (activity.status) {
    case 'completed':
      StatusIcon = FaCheckCircle;
      break;
    case 'in progress':
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


  return (
    <div
      key={activity._id}
      className={`bg-white shadow-md rounded-lg p-4 border-l-4 ${borderColorClass} ${backgroundColorClass} flex items-center cursor-pointer`}
      onClick={onClick} // Handle card click
    >
      {activity.imgUrl && (
        <img
          src={activity.imgUrl}
          alt={activity.content}
          className={styles.activityImage}
        />
      )}
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
