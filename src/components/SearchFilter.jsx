import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchFilter = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (category) params.append("category", category);
    if (minPrice) params.append("price[gte]", minPrice);
    if (maxPrice) params.append("price[lte]", maxPrice);
    if (rating) params.append("rating[gte]", rating);

    navigate(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-6 gap-4">
      <input
        type="text"
        placeholder="Search"
        className="border px-3 py-2 rounded"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <select
        className="border px-3 py-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home">Home</option>
        {/* Add more categories as needed */}
      </select>

      <input
        type="number"
        placeholder="Min Price"
        className="border px-3 py-2 rounded"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="border px-3 py-2 rounded"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <select
        className="border px-3 py-2 rounded"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="">Any Rating</option>
        <option value="4">4 ⭐ & up</option>
        <option value="3">3 ⭐ & up</option>
        <option value="2">2 ⭐ & up</option>
      </select>

      <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Filter
      </button>
    </form>
  );
};

export default SearchFilter;
