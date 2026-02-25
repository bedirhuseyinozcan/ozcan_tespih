import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import CartPage from "./pages/Cart";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AboutPage from "./pages/About";
import ProductDetailsPage from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":id", element: <ProductDetailsPage /> },
        ],
      },

      { path: "product/:id", element: <ProductDetailsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
