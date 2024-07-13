import "./globals.css";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Activity Management</h1>
        <p className="text-lg">Welcome to the Activity Management homepage. Use the links above to navigate.</p>
      </div>
    </div>
  );
}
