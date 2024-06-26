import React, { useState } from "react";

const ManageUser = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { id: "addusers", label: "add users" },
    { id: "viewusers", label: "view all users" },
    { id: "editusers", label: "edit users" },
    { id: "deleteusers", label: "delete users" },
  ];
  const blogOptions = [
    { id: "addblogs", label: "add blogs" },
    { id: "viewblogs", label: "view all blogs" },
    { id: "editblogs", label: "edit blogs" },
    { id: "deleteblogs", label: "delete blogs" },
  ];

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedOptions((prevState) =>
      checked ? [...prevState, id] : prevState.filter((option) => option !== id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Selected Options:", selectedOptions);
  };

  return (
    <div className="shadow p-4 rounded-lg w-full  bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center ">
        Manage users Roles and permissions{" "}
      </h2>
      <form onSubmit={handleSubmit}>
        <h1 className="font-semibold"> user actions</h1>
        <div className="mb-4 flex gap-[5px]">
          {options.map((option) => (
            <label key={option.id} className="flex  items-center mb-2">
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

        <h1 className="font-semibold"> blogs actions</h1>
        <div className="mb-4 flex gap-[5px]">
          {blogOptions.map((option) => (
            <label key={option.id} className="flex  items-center mb-2">
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
          className="w-[10%] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ManageUser;
