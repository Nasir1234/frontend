import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  // Review form states (moved inside component)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(data);
    } catch (err) {
      console.error("Error loading product", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: qty }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewError(null);
    setReviewSuccess(null);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        { rating, comment },
        config
      );

      setReviewSuccess("Review submitted successfully!");
      setRating(0);
      setComment("");
      fetchProduct();
    } catch (error) {
      setReviewError(error.response?.data?.message || "Something went wrong");
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8">
      <div>
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full max-h-[400px] object-contain"
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-lg text-gray-600 mb-2">
          ${product.price.toFixed(2)}
        </p>
        <p className="mb-4">{product.description}</p>

        <div className="mb-4">
          <label className="block mb-1">Quantity</label>
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {[...Array(product.stock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Add to Cart
        </button>

        {/* Reviews */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Reviews</h3>
          {product.reviews?.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review._id} className="mb-2 border-b pb-2">
                <p className="font-bold">{review.user?.name || "User"}</p>
                <p className="text-sm text-yellow-500">⭐ {review.rating}</p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet</p>
          )}

          {/* Conditionally rendered review form */}
          {user && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Write a Review</h4>

              {reviewSuccess && (
                <p className="text-green-600 mb-2">{reviewSuccess}</p>
              )}
              {reviewError && (
                <p className="text-red-600 mb-2">{reviewError}</p>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border p-2 rounded w-full"
                    required
                  >
                    <option value="">Select...</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r} -{" "}
                        {
                          ["Poor", "Fair", "Good", "Very Good", "Excellent"][
                            r - 1
                          ]
                        }
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  {reviewSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
