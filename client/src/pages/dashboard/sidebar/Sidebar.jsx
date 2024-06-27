import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, User, Newspaper, LayoutDashboard, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/authSlice";

const Sidebar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isUserDropdownActive, setIsUserDropdownActive] = useState(false);
  const [isBlogDropdownActive, setIsBlogDropdownActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    setIsToggled(!isToggled);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownActive(!isUserDropdownActive);
    setIsBlogDropdownActive(false);
  };

  const toggleBlogDropdown = () => {
    setIsBlogDropdownActive(!isBlogDropdownActive);
    setIsUserDropdownActive(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }
      const userData = {
        authorId: "",
        email: "",
        password: "",
        username: "",
        Role: "",
      };

      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser(userData));
      toast.success("Successfully logged out");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(`Error logging out: ${error.message}`);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isToggled ? "w-[4%]" : "w-[20%]"
      } bg-[#141718] text-white  font-xl font-semibold transition-all duration-300`}
    >
      <div className="flex flex-col">
        <button onClick={handleToggleSidebar}>
          <Menu className="text-white ml-[10px]" />
        </button>
      </div>

      <ul className="flex  ml-[10px] p-[10px] flex-col mb-[15px]">
        <li className="p-[5px]">
          <NavLink className="flex gap-[10px]" to={"/dashboard"}>
            <LayoutDashboard className="text-emerald-400 fill-zinc-200" />
            <span className={isToggled ? "hidden" : ""}>Dashboard</span>
          </NavLink>
        </li>

        <li className="p-[5px]" onClick={toggleUserDropdown}>
          <button className="flex gap-[10px]">
            <User className="text-blue-600" />
            <span className={isToggled ? "hidden" : ""}>User Management</span>
          </button>
        </li>
        {isUserDropdownActive && !isToggled && (
          <div className="p-[10px]">
            <li className="p-[7px]">
              <NavLink to={"/adduser"}>Add User</NavLink>
            </li>
            <li className="p-[7px]">
              <NavLink to={"/viewuser"}>View User</NavLink>
            </li>
            <li className="p-[7px]">
              <NavLink to={"/manageuser"}>Manage User</NavLink>
            </li>
          </div>
        )}

        <li className="p-[5px] flex gap-[10px]" onClick={toggleBlogDropdown}>
          <Newspaper className="fill-gray-600" />
          <span className={isToggled ? "hidden" : ""}>Blog Management</span>
        </li>
        {isBlogDropdownActive && !isToggled && (
          <div className="p-[10px]">
            <li className="p-[5px]">
              <NavLink to={"/addblogs"}>Add Blogs</NavLink>
            </li>
            <li className="p-[5px]">
              <NavLink to={"/viewblogs"}>View Blogs</NavLink>
            </li>
            <li className="p-[5px]">
              <NavLink to={"/addcategory"}>Add Category</NavLink>
            </li>
          </div>
        )}

        <li onClick={handleLogout}>
          <button className="text-red flex gap-[10px] p-[5px]">
            <LogOut className="text-red-500" />
            <span className={isToggled ? "hidden" : ""}>LogOut</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
