import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import App from "./App";
import Chat from "./pages/Chat";
import LoginForm from "./pages/Login";
import AuthWrapper from "./components/AuthWrapper";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        <App />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/chat",
        element: (
          <AuthWrapper>
            <Chat />
          </AuthWrapper>
        ),
      },
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
