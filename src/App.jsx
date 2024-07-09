import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { lazy, useEffect } from "react";
import { Layout } from "./Components/Layout/Layout";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import { Loader } from "./Components/Loader/Loader";

const Home = lazy(() => import("./pages/Home/Home"));
const Psychologists = lazy(() => import("./pages/Psychologists/Psychologists"));
const Favorites = lazy(() => import("./pages/Favorite/Favorites"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "psychologists", element: <Psychologists /> },
      {
        path: "favorites",
        element: <PrivateRoute redirectTo="/" component={Favorites} />,
      },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];

const routerOptions = {
  basename: "/",
};

function App() {
  const { isRefreshing, getCurrent } = useAuth();

  useEffect(() => {
    getCurrent();
  }, [getCurrent]);

  const router = createBrowserRouter(routes, routerOptions);

  return !isRefreshing ? <RouterProvider router={router} /> : <Loader />;
}

export default App;
