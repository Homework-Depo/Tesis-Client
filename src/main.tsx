import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import loginRouteProtection from "./utils/loginRouteProtection.ts";
import authRouteProtection from "./utils/authRouteProtection.ts";

import Login from './pages/Login/Login';
import loginAction from "./pages/Login/action";
import AuthCode from './pages/AuthCode/AuthCode'
import authCodeAction from "./pages/AuthCode/action";
import Settings from './pages/Settings/Settings'
import settingsLoader from "./pages/Settings/loader";
import settingsAction from "./pages/Settings/action";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5"
    },
  },
});

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
    loader: loginRouteProtection,
    action: loginAction
  },
  {
    path: "auth-code",
    element: <AuthCode />,
    loader: authRouteProtection,
    action: authCodeAction
  },
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>
      },
      {
        path: "clientes",
        element: <h1>Clientes</h1>
      },
      {
        path: "configuracion",
        element: <Settings />,
        loader: settingsLoader,
        action: settingsAction
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ThemeProvider>
)
