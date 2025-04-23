import { useState } from "react";
import { useGetAllOrdersQuery, useMarkAsDeliveredMutation } from "../../redux/api/orderApi";
import { FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa";

const AdminOrders = () => {
  const [feedback, setFeedback] = useState("");

  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useGetAllOrdersQuery();

  const [deliverOrder] = useMarkAsDeliveredMutation();

  const markAsDelivered = async (orderId) => {
    try {
      await deliverOrder(orderId).unwrap();
      setFeedback("Order marked as delivered.");
      refetch();
    } catch (err) {
      setFeedback("Failed to mark as delivered.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Order Management
      </h2>

      {feedback && <p className="text-sm text-green-600 mb-2">{feedback}</p>}
      {error && <p className="text-sm text-red-500 mb-2">Error loading orders</p>}

      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Paid</th>
                <th className="py-3 px-4 text-left">Delivered</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">{order.user?.name || "N/A"}</td>
                  <td className="py-2 px-4">${order.totalPrice.toFixed(2)}</td>
                  <td className="py-2 px-4">
                    {order.isPaid ? (
                      <FaCheckCircle className="text-green-600 inline" />
                    ) : (
                      <FaTimesCircle className="text-red-600 inline" />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {order.isDelivered ? (
                      <FaCheckCircle className="text-green-600 inline" />
                    ) : (
                      <span className="text-gray-600">No</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {!order.isDelivered && (
                      <button
                        onClick={() => markAsDelivered(order._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-2"
                      >
                        <FaTruck /> Deliver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
