import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Order";
import Login from "./components/Login";
import Category from "./pages/Category";
import Brand from "./pages/Brand";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹";

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : "");

  useEffect(()=>{
    localStorage.setItem('token', token);
  },[token])
    
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" 
      ? <Login setToken={setToken} />
       :  <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full min-h-[calc(100vh-70px)]">
            <Sidebar />
            <div className="flex-1 p-4 sm:p-8 md:p-10 text-gray-600 text-base max-w-[1400px]">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 min-h-full">
                <Routes>
                  <Route path="/" element={<Dashboard token={token} />} />
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/edit/:id" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                  <Route path="/category" element={<Category token={token} />} />
                  <Route path="/brand" element={<Brand token={token} />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App;
