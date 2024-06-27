import Sidebar from "../dashboard/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../login/ProtectedRoute";

const RootLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <Sidebar />
      <main className="w-full p-4">
        <ProtectedRoute>
          {" "}
          <Outlet />
        </ProtectedRoute>
      </main>
    </div>
  );
};

export default RootLayout;
