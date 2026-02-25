import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import Reserve from "./pages/Reserve";
import MyRentals from "./pages/MyRentals";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "reserve",
        Component: Reserve,
      },
      {
        path: "my-rentals",
        Component: MyRentals,
      },
      {
        path: "admin",
        Component: Admin,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
]);