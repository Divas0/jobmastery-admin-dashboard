import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const formData = { name: category, subcategory: subcategories };

  const addCategoryMutation = useMutation(
    (data) =>
      fetch("http://localhost:4000/category/addcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
    {
      onSuccess: (data) => {
        console.log("category added successfully:", data);
        if (data?.category) {
          toast("Category added successfully");
        }

        setCategory("");
        setSubcategory("");
        setSubcategories([]);
      },
      onError: (error) => {
        console.error("Error adding category:", error);
        toast.error("Failed to add category");
      },
    }
  );

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const handleAddSubcategory = () => {
    if (subcategory.trim() !== "") {
      setSubcategories((prev) => [...prev, subcategory.trim()]);
      setSubcategory("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addCategoryMutation.mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Category
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            placeholder="Enter category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subcategory"
          >
            Subcategory Name (Optional)
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subcategory"
              type="text"
              placeholder="Enter subcategory name"
              value={subcategory}
              onChange={handleSubcategoryChange}
            />
            <button
              type="button"
              onClick={handleAddSubcategory}
              className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add
            </button>
          </div>
          {subcategories.length > 0 && (
            <ul className="mt-2">
              {subcategories.map((sub, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {sub}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
