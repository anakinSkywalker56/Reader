import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import BookProfile from "./Pages/Book Profile.jsx";
import Library from "./Pages/Library.jsx";
import AuthorProfile from "./Pages/AuthorProfile.jsx";
import Read from "./Pages/Read.jsx";
import Edit from "./Pages/Edit.jsx";
import Chapters from "./Pages/Chapters.jsx";
import Register from "./Pages/Register.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },

  // dynamic URL
  { path: "/home/:id", element: <Home /> },
  { path: "/bookprofile/:id", element: <BookProfile /> },
  { path: "/library/:id", element: <Library /> },
  { path: "/edit/", element: <Edit /> },
  { path: "/volumes/:id/chapters", element: <Chapters /> },
  { path: "/read/:volumeId/:chapterNum", element: <Read /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
