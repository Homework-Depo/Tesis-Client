import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login/Login';
import loginAction from "./pages/Login/action";
import AuthCode from './pages/AuthCode/AuthCode'
import authCodeAction from "./pages/AuthCode/action";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
    action: loginAction
  },
  {
    path: "auth-code",
    element: <AuthCode />,
    action: authCodeAction
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
