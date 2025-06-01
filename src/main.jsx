
import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/Login.jsx';
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import CreateResult from './pages/CreateResult.jsx';
import Personalize from './pages/Personalize.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children :[
      {
        path : "",
        element :<Home/> 
      },
      {
        path: "login",
        element:<Login/>
      },
      {
        path : "signup",
        element :<Signup/>
      },
      {
        path : "create-result",
        element :<CreateResult/>
      },
      {
        path : "personalize",
        element :<Personalize/>
      },
      {
        path : "*",
        element : <h1>404 Not Found</h1>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
