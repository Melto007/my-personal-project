import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/authentication/Login.js'
import Register from './pages/authentication/Register.js'
import HomePage from './pages/HomePage.js'
import Header from './pages/Header.js'

import './static/css/styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },{
    path: 'login',
    element: <Login />
  },{
    path: 'register',
    element: <Register />
  }
])

function App() {
  return (
    <React.Fragment>
      <Header />
      <RouterProvider router={router} />
    </React.Fragment>
  );
}
export default App;
