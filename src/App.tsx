import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout";
import CartList from "./components/carts/CartList";
import AddProduct from "./components/products/AddProduct";
import Home from "./pages/Home";
import CartForm from "./components/carts/CartForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart-list",
          element: <CartList />,
        },
        {
          path: "/cart-form",
          element: <CartForm />,
        },
        {
          path: "/product-form",
          element: <AddProduct />,
        },
        {
          path: "/product-form/:id",
          element: <AddProduct />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
