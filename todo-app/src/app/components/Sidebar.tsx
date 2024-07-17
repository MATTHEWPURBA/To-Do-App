    "use client"; // Ensure this component runs on the client side

    import { Activity } from "../page"; // Import Activity type

    type SidebarProps = {
    activity: Activity | null; // Define props type
    };

    const Sidebar = ({ activity }: SidebarProps) => {
    const handleClose = () => {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
        sidebar.classList.remove("open"); // Close the sidebar
        }
    };

    return (
        <div id="sidebar" className="fixed right-0 top-0 w-1/3 h-full bg-gray-100 shadow-lg transform transition-transform duration-300 translate-x-full">
        <div className="p-4">
            <button onClick={handleClose} className="text-red-500 font-bold mb-4">
            Close
            </button>
            {activity && (
            <>
                <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
                <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <input type="text" value={activity.content} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea value={activity.description} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                {/* Add other fields as necessary */}
                <div className="mt-4">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">
                    Save
                    </button>
                </div>
                </form>
            </>
            )}
        </div>
        </div>
    );
    };

    export default Sidebar;
