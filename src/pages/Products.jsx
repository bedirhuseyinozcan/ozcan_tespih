import { useEffect } from "react";
import ProductList from "../components/ProductList";
import { useState } from "react";
import Loading from "../components/Loading";
import requests from "../api/apiClient";

export default function ProductsPage() {
  const [loadedProducts, setloadedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await requests.products.list();
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
