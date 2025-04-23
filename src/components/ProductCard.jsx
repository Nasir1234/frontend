import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const renderStars = (rating) => {
  const stars = [];
  const rounded = Math.floor(rating * 2) / 2;

  for (let i = 1; i <= 5; i++) {
    if (rounded >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rounded + 0.5 === i) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return stars;
};

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="border rounded-lg shadow hover:shadow-md transition duration-300 bg-white flex flex-col"
    >
      <img
        src={product.images?.[0]?.url || "/placeholder.jpg"}
        alt={product.name}
        className="h-48 object-cover w-full rounded-t-lg"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {product.name}
        </h3>

        <div className="flex items-center text-sm mb-2">
          {renderStars(product.ratings)}
          <span className="ml-2 text-gray-600">({product.numReviews})</span>
        </div>

        <p className="text-indigo-600 font-bold text-lg mt-auto">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
