import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Test from "./Pages/users.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import BookProfile from "./Pages/Book Profile.jsx";
import Library from "./Pages/Library.jsx";
import AuthorProfile from "./Pages/AuthorProfile.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },

  // dynamic URL
  { path: "/home/:id", element: <Home /> },
  { path: "/bookprofile/:id", element: <BookProfile /> },
  { path: "/library/", element: <Library /> },
  { path: "/author/", element: <AuthorProfile />},
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
