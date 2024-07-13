import { Activity } from "../page";

type ActivityCardProps = {
  activity: Activity;
};

const ActivityCard = ({ activity }: ActivityCardProps) => {
  let statusColorClass = "";
  switch (activity.status) {
    case "completed":
      statusColorClass = "bg-green-100";
      break;
    case "in progress":
      statusColorClass = "bg-yellow-100";
      break;
    case "won't do":
      statusColorClass = "bg-red-100";
      break;
    default:
      statusColorClass = "bg-gray-100";
      break;
  }

  return (
    <div key={activity._id} className={`bg-white shadow-md rounded-lg p-4 border-l-4 border-${activity.typeColor}-500 ${statusColorClass} flex items-start`}>
      {activity.imgUrl && <img src={activity.imgUrl} alt={activity.content} className="w-20 h-20 object-cover rounded-lg mr-4" />}
      <div>
        <p className="text-lg font-semibold">{activity.content}</p>
        <p className="text-gray-800">{activity.description}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
