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
import Main from './pages/Main/Main'
import Clients from "./pages/Clients/list/Clients"
import clientsLoader from "./pages/Clients/list/loader";
import NewClient from './pages/Clients/new/NewClient'
import newClientAction from "./pages/Clients/new/action";
import DetailsClient from './pages/Clients/details/DetailsClient'
import detailsClientLoader from "./pages/Clients/details/loader";
import UpdateClient from './pages/Clients/update/UpdateClient'
import updateClientAction from "./pages/Clients/update/action";
import loaderUpdateClient from "./pages/Clients/update/loader";
import accessRouteProtection from "./utils/accessRouteProtection";
import ServerError from './pages/Error/ServerError'


import NotFound from './pages/NotFound/NotFound'

import { esES } from '@mui/x-data-grid'

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme(
  {
    palette: {
      background: {
        default: "#F5F5F5"
      },
    }
  },
  esES
);

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
    loader: loginRouteProtection,
    action: loginAction,
    errorElement: <ServerError />
  },
  {
    path: "auth-code",
    element: <AuthCode />,
    loader: authRouteProtection,
    action: authCodeAction,
    errorElement: <ServerError />
  },
  {
    element: <App />,
    errorElement: <ServerError />,
    loader: async () => { await accessRouteProtection(); return null },
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "clientes",
        element: <Clients />,
        loader: clientsLoader
      },
      {
        path: "clientes/:id",
        element: <DetailsClient />,
        loader: detailsClientLoader
      },
      {
        path: "clientes/:id/editar",
        element: <UpdateClient />,
        loader: loaderUpdateClient,
        action: updateClientAction
      },
      {
        path: "clientes/nuevo",
        element: <NewClient />,
        loader: async () => { await accessRouteProtection(); return null },
        action: newClientAction
      },
      {
        path: "configuracion",
        element: <Settings />,
        loader: settingsLoader,
        action: settingsAction
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ThemeProvider>
)