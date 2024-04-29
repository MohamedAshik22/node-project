import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './components/home';
import NewBlog from './components/newBlog';
import Blogs from './components/blogs';
import BlogDetailPage from './components/blogDetailPage';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/blogs",
        element: <Blogs />
      },
      {
        path: "/blog/create",
        element: <NewBlog />
      },
      {
        path: "/blog-detail/:blogId",
        element: <BlogDetailPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  
  </React.StrictMode>,
);
