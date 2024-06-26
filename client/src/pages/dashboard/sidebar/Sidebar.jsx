import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, User, Newspaper, LayoutDashboard, LogOut } from "lucide-react";

const Sidebar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isUserDropdownActive, setIsUserDropdownActive] = useState(false);
  const [isBlogDropdownActive, setIsBlogDropdownActive] = useState(false);
  const navigate = useNavigate();

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
  const handleLogout = () => {
    try {
      fetch("http://localhost:4000/user/logout", {
        method: "POST",
      });
      toast("succesfully logged out");
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast("error logging out", error);
    }
  };

  //   if (isLoading) {
  //     return (
  //       <div>
  //         {" "}
  //         <Loader />
  //       </div>
  //     );
  //   }
  // };
  return (
    <div
      className={`min-h-screen ${
        isToggled ? "w-[4%]" : "w-[20%]"
      } bg-slate-900 text-gray-100`}
    >
      <div className="flex flex-col ">
        <button onClick={handleToggleSidebar}>
          <Menu className="text-white ml-[10px]" />
        </button>
      </div>

      <ul className="flex ml-[10px] p-[5px] flex-col mb-[10px] ">
        <li className="p-[5px]">
          <NavLink className="flex gap-[10px] " to={"/dashboard"}>
            {" "}
            <span>
              {" "}
              <LayoutDashboard />{" "}
            </span>
            Dashboard{" "}
          </NavLink>
        </li>

        <li className="p-[5px] " onClick={toggleUserDropdown}>
          <button className="flex gap-[10px]">
            {" "}
            <span>
              {" "}
              <User />{" "}
            </span>
            User Management{" "}
          </button>
        </li>
        {isUserDropdownActive && (
          <div className="p-[10px]">
            <li className="p-[7px]">
              <NavLink to={"/adduser"}> Add User </NavLink>
            </li>
            <li className="p-[7px]">
              <NavLink to={"/viewuser"}> View User </NavLink>
            </li>
            <li className="p-[7px]">
              <NavLink to={"/manageuser"}> Manage User </NavLink>
            </li>
          </div>
        )}

        <li className="p-[5px] flex gap-[10px] " onClick={toggleBlogDropdown}>
          <span>
            {" "}
            <Newspaper />{" "}
          </span>
          Blog Management
        </li>
        {isBlogDropdownActive && (
          <div className="p-[10px]">
            <li className="p-[5px]">
              <NavLink to={"/addblogs"}> Add Blogs </NavLink>
            </li>
            <li className="p-[5px]">
              <NavLink to={"/viewblogs"}> View Blogs </NavLink>
            </li>
            <li className="p-[5px]">
              <NavLink to={"/addcategory"}> Add Category </NavLink>
            </li>
          </div>
        )}
        <li onClick={handleLogout}>
          {" "}
          <button className="text-red  flex gap-[10px] p-[5px]">
            {" "}
            <span>
              {" "}
              <LogOut />{" "}
            </span>
            LogOut
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
