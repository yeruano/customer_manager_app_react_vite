import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorPage from './components/ErrorPage'
import Index, { loader as customersLoader } from './pages/Index'
import NewCustomer, { action as newCustomerAction } from './pages/NewCustomer'
import EditCustomer, { loader as editCustomerLoader, action as editCustomerAction } from './pages/EditCustomer'
import './index.css'
import { action as deleteCustomerAction } from './components/Customer'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: customersLoader,
        errorElement: <ErrorPage />
      },
      {
        path: '/customers/new',
        element: <NewCustomer />,
        action: newCustomerAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/customers/:customerId/edit',
        element: <EditCustomer />,
        loader: editCustomerLoader,
        action: editCustomerAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/customers/:customerId/delete',
        action: deleteCustomerAction
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
