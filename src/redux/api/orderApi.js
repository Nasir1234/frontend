import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🚀 Create a new order
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),

    // 👤 Get logged-in user's orders
    getUserOrders: builder.query({
      query: () => "/orders/myorders",
      providesTags: ["Order"],
    }),

    // 📦 Get single order by ID
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // ✅ Mark order as paid
    payOrder: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `/orders/${orderId}/pay`,
        method: "PUT",
        body: paymentResult,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
      ],
    }),

    // 🛵 Admin: mark as delivered
    markAsDelivered: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // 🔐 Admin: get all orders
    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useMarkAsDeliveredMutation,
  useGetAllOrdersQuery,
} = orderApi;
