import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const AdminProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(data.products);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  }, [token]);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // ✅ Now safe and correct

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="p-3">
                <img
                  src={product.images?.[0]?.url || "https://via.placeholder.com/64?text=No+Image"}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded border"
                />
              </td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">${product.price.toFixed(2)}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3 text-center">
                <Link to={`/admin/products/edit/${product._id}`}>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <IconButton color="error" onClick={() => deleteProduct(product._id)}>
                  <Delete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
