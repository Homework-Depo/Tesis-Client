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
import mainLoader from "./pages/Main/loader";
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
import ServerError from './pages/Error/ServerError';
import NewCase from './pages/Cases/new/NewCase';
import newCaseLoader from "./pages/Cases/new/loader";
import newCaseAction from "./pages/Cases/new/action";
import Cases from './pages/Cases/list/Cases';
import casesLoader from "./pages/Cases/list/loader";

import DetailsCase from './pages/Cases/details/DetailsCase';
import detailsCaseLoader from "./pages/Cases/details/loader";
import detailsCaseAction from "./pages/Cases/details/action";

import UpdateCase from './pages/Cases/update/UpdateCase';
import updateCaseLoader from "./pages/Cases/update/loader";

import NotFound from './pages/NotFound/NotFound'

import { esES } from '@mui/x-data-grid'
import { esES as esEsMui } from '@mui/material/locale'

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme(
  {
    palette: {
      background: {
        default: "#F5F5F5"
      },
    }
  },
  esES,
  esEsMui
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
    /* errorElement: <ServerError />, */
    loader: async () => { await accessRouteProtection(); return null },
    errorElement: <ServerError />,
    children: [
      {
        path: "/",
        element: <Main />,
        loader: mainLoader
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
        path: "casos",
        element: <Cases />,
        loader: casesLoader
      },
      {
        path: "casos/nuevo",
        element: <NewCase />,
        loader: newCaseLoader,
        action: newCaseAction
      },
      {
        path: "casos/:id",
        element: <DetailsCase />,
        loader: detailsCaseLoader,
        action: detailsCaseAction
      },
      {
        path: "casos/:id/editar",
        element: <UpdateCase />,
        loader: updateCaseLoader
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