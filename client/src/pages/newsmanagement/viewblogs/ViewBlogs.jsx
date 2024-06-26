import { useQuery } from "react-query";
import BlogCard from "./BlogsCard";
import Loader from "@/pages/loader/Loader";

const ViewBlogs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allblogs"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/blog/getallblog");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-800">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-800 text-white">
        <p>Error loading blogs: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-800 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Latest Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.blogs.map((blog) => (
            <BlogCard
              key={blog?.id}
              title={blog?.title}
              author={blog?.author}
              image={blog?.image}
              content={blog?.content}
              createdAt={blog?.createdAt}
              blogid={blog?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewBlogs;
