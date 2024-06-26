import { useState } from "react";

import GuestModal from "./GuestModal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useMutation, useQuery } from "react-query";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

const AddBlog = () => {
  const [editorData, setEditorData] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  // const [selectedReporterName, setSelectedReporterName] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    secondHeading: "",
    reporterName: "",
    guestInfo: [],
    guestName: "",
    newsHashTag: "",
    content: "",
    scheduledPostTime: new Date().toISOString(),
    categories: [],
    featuredImage: null,
    imageCaption: "",
    publishStatus: "draft",
  });

  const [errors, setErrors] = useState({});

  const handleGuestData = (guestData) => {
    setFormData((prevData) => ({
      ...prevData,
      guestInfo: [...prevData.guestInfo, guestData],
    }));
    setIsModalActive(false);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    setFormData((prevData) => ({
      ...prevData,
      content: data,
    }));
  };

  const handleGuest = () => {
    setIsModalActive(true);
  };

  const validate = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.content) errors.content = "Content is required";
    if (formData.categories.category.length === 0)
      errors.categories = "Select at least one category";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // if (name.startsWith("categories.")) {
    //   const [, field] = name.split(".");
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     categories: {
    //       ...prevData.categories,
    //       [field]: checked
    //         ? [...prevData.categories[field], value]
    //         : prevData.categories[field].filter((item) => item !== value),
    //     },
    //   }));
    // } else
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleCategoryChange = (categoryName, isChecked) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: isChecked
        ? [...prevData.categories, { name: categoryName, subcategories: [] }]
        : prevData.categories.filter((cat) => cat.name !== categoryName),
    }));
  };

  const handleSubcategoryChange = (
    categoryName,
    subcategoryName,
    isChecked
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((cat) =>
        cat.name === categoryName
          ? {
              ...cat,
              subcategories: isChecked
                ? [...cat.subcategories, subcategoryName]
                : cat.subcategories.filter(
                    (subcat) => subcat !== subcategoryName
                  ),
            }
          : cat
      ),
    }));
  };
  const handleReporterChange = (e) => {
    setFormData({ ...formData, reporterName: e.target.value });
    // setSelectedReporterName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data:", formData);
    }
  };

  const { data: categoryOptions, isLoading: categoryIsLoading } = useQuery({
    queryKey: ["allcategory"],
    queryFn: () =>
      fetch(`http://localhost:4000/category/allcategory/`).then((res) =>
        res.json()
      ),
  });
  const addBlogMutation = useMutation(
    (data) =>
      fetch("http://localhost:4000/blog/createblog", {
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
        console.log("blog added successfully:", data);
        if (data.blog) {
          toast("blog added successfully");
        }
      },
      onError: (error) => {
        console.error("Error adding blog:", error);
      },
    }
  );
  const { data: userOptions, isLoading: userIsLoading } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch(`http://localhost:4000/user/allusers/`).then((res) => res.json()),
  });

  if (categoryIsLoading) {
    return <h1>Category loading...</h1>;
  }

  const handleChevronDown = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const config = {
    language: "en",
    extraPlugins: [CustomUploadAdapterPlugin],
  };

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, URL);
    };
  }

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addBlogMutation.mutate(formData);
  };

  return (
    <div className="w-full flex justify-between">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between w-full gap-[10px]"
      >
        <div className="w-[60%] mx-auto p-6 bg-white shadow-md rounded-md">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="tagline"
            >
              Tagline
            </label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="secondHeading"
            >
              Second Heading
            </label>
            <input
              type="text"
              id="secondHeading"
              name="secondHeading"
              value={formData.secondHeading}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="reporterName"
            >
              Reporter Name
            </label>
            <input
              type="text"
              id="reporterName"
              name="reporterName"
              value={formData.reporterName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div> */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="reporterName"
            >
              Reporter Name
            </label>
            <select
              id="reporterName"
              name="reporterName"
              value={formData.reporterName}
              onChange={handleReporterChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select a reporter</option>
              {userOptions?.user.map((user) => (
                <option
                  key={user.id}
                  value={user.name}
                  className="font-semibold"
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={handleGuest}
              className="block text-sm px-[14px] py-[12px] bg-blue-600 font-medium rounded-sm text-white"
            >
              Guest Information
            </button>
          </div>

          {isModalActive && (
            <GuestModal
              setIsModalActive={setIsModalActive}
              sendDatatoAddBlog={handleGuestData}
            />
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Guest
            </label>
            <select
              id="guestname"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select a Guest</option>
              {formData.guestInfo.map((guest, index) => (
                <option key={index} value={guest.name}>
                  {guest.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="newsHashTag"
            >
              News Hash Tag
            </label>
            <input
              type="text"
              id="newsHashTag"
              name="newsHashTag"
              value={formData.newsHashTag}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="content"
            >
              Content
            </label>
            <CKEditor
              editor={ClassicEditor}
              config={config}
              name="content"
              data={editorData}
              onChange={handleEditorChange}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="featuredImage"
            >
              Featured Image
            </label>
            <input
              type="file"
              id="featuredImage"
              name="featuredImage"
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="imageCaption"
            >
              Image Caption
            </label>
            <input
              type="text"
              id="imageCaption"
              name="imageCaption"
              value={formData.imageCaption}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            onClick={handleBlogSubmit}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Blog Post
          </button>
        </div>

        {/* Second column */}
        <div className="flex flex-col gap-[10px] w-[40%]">
          <div className="mb-4 overflow-y-auto scroll-smooth h-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Categories
            </label>
            <table className="w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border sticky">All Categories</th>
                </tr>
              </thead>
              <tbody>
                {categoryOptions?.categories?.map((category) => (
                  <tr key={category.id}>
                    <td className="p-[5px] border">
                      <label className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          name="categories"
                          value={category.name}
                          checked={formData.categories.some(
                            (cat) => cat.name === category.name
                          )}
                          onChange={(e) =>
                            handleCategoryChange(
                              category.name,
                              e.target.checked
                            )
                          }
                          className="mr-2"
                        />
                        <span className="flex gap-[5px]">
                          {category.name}
                          {category.subcategories &&
                            category.subcategories.length > 0 && (
                              <button
                                type="button"
                                onClick={() => handleChevronDown(category.id)}
                                className="ml-2"
                              >
                                <ChevronDown />
                              </button>
                            )}
                        </span>
                      </label>
                      {activeCategory === category.id &&
                        category.subcategories?.map((subcategory, index) => (
                          <label
                            key={index}
                            className="flex items-center ml-6 mb-2"
                          >
                            <input
                              type="checkbox"
                              name="subcategories"
                              value={subcategory}
                              checked={formData.categories
                                .find((cat) => cat.name === category.name)
                                ?.subcategories.includes(subcategory)}
                              onChange={(e) =>
                                handleSubcategoryChange(
                                  category.name,
                                  subcategory,
                                  e.target.checked
                                )
                              }
                              className="mr-2"
                            />
                            <span>{subcategory}</span>
                          </label>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {errors.categories && (
              <p className="text-red-500 text-sm">{errors.categories}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="scheduledPostTime"
            >
              Scheduled Post Time
            </label>
            <input
              type="datetime-local"
              id="scheduledPostTime"
              name="scheduledPostTime"
              value={formData.scheduledPostTime}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="publishStatus"
            >
              Publish Status
            </label>
            <select
              id="publishStatus"
              name="publishStatus"
              value={formData.publishStatus}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
