import { Link } from "react-router-dom";

const BlogCard = ({ title, author, image, content, createdAt, blogid }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={image ?? null}
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
