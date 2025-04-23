import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productAPI";
import ProductCard from "../components/ProductCard"; // You can create this reusable component
import SearchFilter from "../components/SearchFilter"; // We'll build this next

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  const { data, isLoading, error } = useGetProductsQuery(query);
  const products = data?.products || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Products</h2>

      <SearchFilter />

      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load products.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
