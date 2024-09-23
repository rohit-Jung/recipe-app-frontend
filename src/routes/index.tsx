import App from "@/App";
import { ProtectedLayout, PublicRoute } from "@/components";
import {
  AddRecipePage,
  AllRecipePage,
  EditRecipePage,
  HomePage,
  LoginPage,
  MyRecipesPage,
  ProfileManagementPage,
  RegisterPage,
  ShoppingListsPage,
  ViewRecipePage,
} from "@/pages";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "recipes",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <AllRecipePage/>,
          },
          {
            path: ":recipeId",
            element: <ViewRecipePage />,
          },
        ],
      },
      {
        path: "/add",
        element: (
          <ProtectedLayout authenticated={true}>
            <AddRecipePage />
          </ProtectedLayout>
        ),
      },
      { path: "/contact", element: <h1>Contact Page</h1> },
      {
        path: "/shopping-lists",
        element: (
          <ProtectedLayout authenticated={true}>
            <ShoppingListsPage />
          </ProtectedLayout>
        ),
      },
      {
        path: "/profile",
        element: <ProfileManagementPage />,
      },
      {
        path: "/recipes",
        element: <ProfileManagementPage />,
      },
      {
        path: "my-recipes",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: (
              <ProtectedLayout authenticated>
                {" "}
                <MyRecipesPage />
              </ProtectedLayout>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedLayout authenticated={true}>
                <EditRecipePage />
              </ProtectedLayout>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
]);
