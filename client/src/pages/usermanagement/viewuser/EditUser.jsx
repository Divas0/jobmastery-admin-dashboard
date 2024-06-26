import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    Role: "",
    isAdmin: false,
    image: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { data:userData, isLoading, isError, error } = useQuery({
    queryKey: ["userDetail", id],
    queryFn: () =>
      fetch(`http://localhost:4000/user/singleuserdata/${id}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      }),
  });
  
 
  useEffect(() => {
    
    if (userData) {
      setFormData({
        name: userData.user.name || "",
        email: userData.user.email || "",
        password: "", 
        contact: userData.user.contact || "",
        Role: userData.user.Role || "",
        isAdmin: userData.user.isAdmin || false,
        image: userData.user.image || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateUserMutation = useMutation(
    (data) =>
      fetch(`http://localhost:4000/user/updateuser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to update user");
        return res.json();
      }),
    {
      onSuccess: (data) => {
        toast("user updated succesfully")
        navigate("/viewuser"); 
      },
      onError: (error) => {
        console.error("Error updating user:", error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="shadow p-4 rounded-lg bg-white w-full ">
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            Contact
          </label>
          <input
            type="number"
            id="contact"
            name="contact"
            maxLength={10}
            minLength={10}
            
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="Role"
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="isAdmin" className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">isAdmin</span>
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={updateUserMutation.isLoading}
        >
          {updateUserMutation.isLoading ? "Updating..." : "Update User"}
        </button>
      </form>

      {updateUserMutation.isError && (
        <div className="mt-4 text-red-600">
          An error occurred: {updateUserMutation.error.message}
        </div>
      )}
      {updateUserMutation.isSuccess && (
        <div className="mt-4 text-green-600">User updated successfully!</div>
      )}
    </div>
  );
};

export default EditUser;
