import { useEffect } from "react";
import ProductList from "../components/ProductList";
import { useState } from "react";
import Loading from "../components/Loading";

export default function ProductsPage() {
  const [loadedProducts, setloadedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        console.log(data);
        setloadedProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <Loading message="Loading products..." />;

  return <ProductList products={loadedProducts} />;
}
