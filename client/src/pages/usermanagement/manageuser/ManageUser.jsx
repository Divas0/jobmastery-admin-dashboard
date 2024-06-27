import { useState, useEffect } from "react";
import { toast } from "sonner";

const ManageUser = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const options = [
    { id: "addusers", label: "Add Users" },
    { id: "viewusers", label: "View All Users" },
    { id: "editusers", label: "Edit Users" },
    { id: "deleteusers", label: "Delete Users" },
  ];

  const blogOptions = [
    { id: "addblogs", label: "Add Blogs" },
    { id: "viewblogs", label: "View All Blogs" },
    { id: "editblogs", label: "Edit Blogs" },
    { id: "deleteblogs", label: "Delete Blogs" },
  ];

  useEffect(() => {
    if (selectedRole) {
      setSelectedOptions([]);
    }
  }, [selectedRole]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedOptions((prevState) =>
      checked ? [...prevState, id] : prevState.filter((option) => option !== id)
    );
  };

  const handleRole = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("Please select a role.");
      return;
    }

    if (selectedOptions.length === 0) {
      toast.error("Please select at least one permission.");
      return;
    }

    const permissionData = {
      role: selectedRole.toUpperCase(),
      permissions: selectedOptions,
    };
    console.log(permissionData);

    try {
      const response = await fetch(
        "http://localhost:4000/user/addpermissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(permissionData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add permissions.");
      }

      const result = await response.json();
      toast.success("Permissions updated successfully.");
      setSelectedRole("");
      setSelectedOptions([]);
      return result;
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="shadow p-4 rounded-lg w-full bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Manage Roles and Permissions
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="p-[20px]">
          <label htmlFor="role" className="font-semibold block mb-2">
            Select Role
          </label>
          <select
            id="role"
            value={selectedRole}
            onChange={handleRole}
            className="block w-full p-2 border rounded mb-4"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <h3 className="font-semibold mb-2">User Actions</h3>
        <div className="mb-4 flex flex-col flex-wrap gap-[5px]">
          {options.map((option) => (
            <label key={option.id} className="flex  items-center mb-2">
              <input
                type="checkbox"
                id={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={handleCheckboxChange}
                className="mr-2 "
              />
              <span className="text-sm font-medium text-gray-700">
                {option.label}
              </span>
            </label>
          ))}
        </div>

        <h3 className="font-semibold mb-2">Blog Actions</h3>
        <div className="mb-4 flex flex-col flex-wrap gap-[5px]">
          {blogOptions.map((option) => (
            <label key={option.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                {option.label}
              </span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ManageUser;
