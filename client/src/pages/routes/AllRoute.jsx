import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Login from '../login/Login'
import RootLayout from '../rootlayout/RootLayout'
import UserLayout from '../usermanagement/UserLayout'
import NewsLayout from '../newsmanagement/NewsLayout'
import AddBlogs from '../newsmanagement/addblog/AddBlogs'
import ViewBlogs from '../newsmanagement/viewblogs/ViewBlogs'
import AddUser from '../usermanagement/adduser/AddUser'
import ViewUser from '../usermanagement/viewuser/ViewUser'
import ManageUser from '../usermanagement/manageuser/ManageUser'
import EditUser from '../usermanagement/viewuser/EditUser'
import ProtectedRoute from '../login/ProtectedRoute'
import AddCategory from '../newsmanagement/addcategory/Addcategory'

const AllRoute = () => {
  return (
    <Routes>
     
      <Route path="/" element={<Login />} />
      
      
      <Route element={<RootLayout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/user" element={<UserLayout />} />
        <Route path="/news" element={<NewsLayout />} />
        <Route path="/addblogs" element={<AddBlogs />} />
        <Route path="/viewblogs" element={<ViewBlogs />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/viewuser" element={<ViewUser />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path='/addcategory' element={<AddCategory/>}/>
      </Route>
    </Routes>
  )
}

export default AllRoute