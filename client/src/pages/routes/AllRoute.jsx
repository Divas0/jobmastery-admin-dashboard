import { Route, Routes } from "react-router-dom";
import Login from "@/pages/login/Login";
import RootLayout from "@/pages/rootlayout/RootLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import UserLayout from "@/pages/usermanagement/UserLayout";
import NewsLayout from "@/pages/newsmanagement/NewsLayout";
import AddBlogs from "@/pages/newsmanagement/addblog/AddBlogs";
import ViewBlogs from "@/pages/newsmanagement/viewblogs/ViewBlogs";
import AddUser from "@/pages/usermanagement/adduser/AddUser";
import ViewUser from "@/pages/usermanagement/viewuser/ViewUser";
import ManageUser from "@/pages/usermanagement/manageuser/ManageUser";
import EditUser from "@/pages/usermanagement/viewuser/EditUser";
import AddCategory from "@/pages/newsmanagement/addcategory/Addcategory";
import ForgetPassword from "../login/ForgetPassword";

const AllRoute = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route element={<RootLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="user" element={<UserLayout />} />
      <Route path="news" element={<NewsLayout />} />
      <Route path="addblogs" element={<AddBlogs />} />
      <Route path="viewblogs" element={<ViewBlogs />} />
      <Route path="adduser" element={<AddUser />} />
      <Route path="viewuser" element={<ViewUser />} />
      <Route path="manageuser" element={<ManageUser />} />
      <Route path="edituser/:id" element={<EditUser />} />
      <Route path="addcategory" element={<AddCategory />} />
    </Route>
    <Route path="/forgetpassword" element={<ForgetPassword />} />
  </Routes>
);

export default AllRoute;
