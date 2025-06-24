import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './Pages/Auth/SignIn.jsx'
import SignUp from './Pages/Auth/SignUp.jsx'
import AddProductForm from './assets/Components/AllProduct/AddProductForm/AddProductForm.jsx'
import EditProductForm from './assets/Components/AllProduct/EditProductForm/EditProductForm.jsx'
import DeletProductForm from './assets/Components/AllProduct/DeletProductForm/DeletProductForm.jsx'
import DeleteProductPage from './assets/Components/AllProduct/DeletProductForm/DeleteProductPage.jsx'
import { ProductProvider } from './assets/Components/AllProduct/ProductContext/ProductContext.jsx'
import { NotificationProvider } from './assets/Components/AllProduct/ProductContext/NotificationContext.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <SignIn />,
  },
  {
    path : "SignUp",
    element : <SignUp />
  },
  {
    path : "dashboard",
    element : <Dashboard/>,
    children: [
      {
        path: "add-product",
        element: <AddProductForm />,
      },
      {
        path: "edit-product/:id",
        element: <EditProductForm />,
      },
      {
        path: "delete-product/:id",
        element: <DeleteProductPage />,
      }, 
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </NotificationProvider>
  </StrictMode>
)
