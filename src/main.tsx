import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Main } from './routes/Main.tsx'
import './index.css'
import { SnackbarProvider } from 'notistack'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="light text-foreground bg-background">
        <SnackbarProvider />
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
)
