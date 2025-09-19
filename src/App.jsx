import {createBrowserRouter,createRoutesFromElements, Route, RouterProvider, useLocation } from "react-router-dom"
import Layout from "./Layout"
import Home from "./home"
import Weather from "./weather"





function App() {


 
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >

     <Route index element={<Home />} />
     <Route path="weather" element={<Weather />} />

    </Route>


  )
  )


  return (
    <RouterProvider router={router} />
  )
}

export default App
