import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (keyword) query.append("keyword", keyword);
      if (category) query.append("category", category);
      if (price) query.append("price", price);

      const { data } = await axios.get(`http://localhost:5000/api/products/search?${query.toString()}`);
      setProducts(data.products || []);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products/categories");
      setCategories(data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [keyword, category, price]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ keyword });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Search Products</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Search
        </button>
      </form>

      <div className="flex gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Prices</option>
          <option value="0-50">$0 to $50</option>
          <option value="50-100">$50 to $100</option>
          <option value="100-500">$100 to $500</option>
          <option value="500-1000">$500 to $1000</option>
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow hover:shadow-md">
              <Link to={`/product/${product._id}`}>
                <img src={product.images[0]?.url} alt={product.name} className="w-full h-40 object-cover mb-2" />
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
