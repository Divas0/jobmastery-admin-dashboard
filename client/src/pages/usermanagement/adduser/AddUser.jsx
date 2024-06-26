import React, { useState } from "react";
import { useMutation } from "react-query";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    Role: "",
    isAdmin: false,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addUserMutation = useMutation(
    (userData) =>
      fetch("http://localhost:4000/user/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
    {
      onSuccess: (data) => {
        console.log("User added successfully:", data);

        setFormData({
          name: "",
          email: "",
          password: "",
          contact: "",
          Role: "",
          isAdmin: false,
          image: "",
        });
      },
      onError: (error) => {
        console.error("Error adding user:", error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserMutation.mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div className="md:flex">
      <div className="p-8 w-full">
      
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Register Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required />
          </div>
  
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required />
          </div>
  
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required />
          </div>
  
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
            <input type="number" id="contact" name="contact" value={formData.contact} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>
  
          <div>
            <label htmlFor="Role" className="block text-sm font-medium text-gray-700">Role</label>
            <select id="Role" name="Role" value={formData.Role} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required>
              <option value="">Select Role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
  
          <div className="flex items-center">
            <input type="checkbox" id="isAdmin" name="isAdmin" checked={formData.isAdmin} onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">Is Admin</label>
          </div>
  
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" id="image" name="image" value={formData.image} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>
  
          <button type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            disabled={addUserMutation.isLoading}>
            {addUserMutation.isLoading ? "Registering..." : "Register"}
          </button>
        </form>
  
        {addUserMutation.isError && (
          <div className="mt-4 text-sm text-red-600">
            An error occurred: {addUserMutation.error.message}
          </div>
        )}
        {addUserMutation.isSuccess && (
          <div className="mt-4 text-sm text-green-600">User registered successfully!</div>
        )}
      </div>
    </div>
  </div>
  );
};

export default AddUser;
