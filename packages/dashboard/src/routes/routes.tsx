import { lazy } from "react";
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
const Home = lazy(() => import("../pages/Home/Home"));

export const routes: RouteObject[] = [
  { path: "home", element: <Home /> },
  { path: "*", element: <Navigate to={"/home"} /> },
];
