import { createBrowserRouter, Navigate } from "react-router-dom";

import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginView } from "@/views/auth/LoginView";
import { SearchView } from "@/views/search/SearchView";
import { DeleteUserView } from "@/views/user/DeleteUserView";
import { RegisterUserView } from "@/views/auth/RegisterUserView";
import { UpdateProfileView } from "@/views/user/UpdateProfileView";
import { UpdatePasswordView } from "@/views/user/UpdatePasswordView";

import { DashboardLayout } from "@/layouts/DashboardLayout";

import NotFoundView from "@/views/404/NotFoundView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/search" />,
      },
      {
        path: "register-user",
        element: <RegisterUserView />,
      },
      {
        path: "/user/edit-profile",
        element: <UpdateProfileView />,
      },
      {
        path: "/user/edit-password",
        element: <UpdatePasswordView />,
      },
      {
        path: "/user/delete",
        element: <DeleteUserView />,
      },
      {
        path: "/search",
        element: <SearchView />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginView />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
]);
