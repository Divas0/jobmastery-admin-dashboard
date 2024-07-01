import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BlogCard = ({ title, author, image, content, createdAt, blogid }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={
          image ??
          "https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?q=80&w=1516&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">
          By {author} {createdAt}
        </p>

        <div
          className="text-gray-700 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Link
          to={`/blog/${blogid}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
