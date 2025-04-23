import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateProduct = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }
      if (image) {
        formData.append("image", image);
      }

      await axios.post("http://localhost:5000/api/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product created successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInput}
          className="w-full p-2 border rounded"
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInput}
          className="w-full p-2 border rounded"
          placeholder="Description"
          rows="4"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleInput}
          className="w-full p-2 border rounded"
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleInput}
          className="w-full p-2 border rounded"
          placeholder="Stock"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleInput}
          className="w-full p-2 border rounded"
          placeholder="Category"
          required
        />
        <div>
          <label className="block mb-2">Product Image</label>
          {preview && (
            <img src={preview} alt="preview" className="h-32 mb-2 rounded" />
          )}
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
