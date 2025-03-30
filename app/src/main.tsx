import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Song from "./Song.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// create route for song - so in the URL, we can pass in the song ID to another URL for another component.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tracks/:id",
    element: <Song />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
