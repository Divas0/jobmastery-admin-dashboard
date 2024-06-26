import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState([""]);

  const formData = { name: category, subcategory };

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
          toast("category added succesfully");
        }
      },
      onError: (error) => {
        console.error("Error adding category:", error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subcategory"
            type="text"
            placeholder="Enter subcategory name"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleSubmit}
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
