import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const Sidebar = () => {
  return (
    <div className="w-16 sm:w-64 min-h-screen border-r border-gray-100 bg-white shadow-sm transition-all duration-300">
      <div className="flex flex-col gap-2 pt-6 px-2 sm:px-4 text-[13px] font-bold">
        
        <NavLink 
          className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'}`} 
          to="/"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p className="hidden sm:block uppercase tracking-wider">Dashboard</p>
        </NavLink>

        <NavLink 
          className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'}`} 
          to="/add"
        >
          <img className={`w-5 h-5 shrink-0 ${window.location.pathname === '/add' ? 'invert brightness-0' : ''}`} src={assets.add_icon} alt="" />
          <p className="hidden sm:block uppercase tracking-wider">Add Hardware</p>
        </NavLink>

        <NavLink 
          className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'}`} 
          to="/list"
        >
          <img className={`w-5 h-5 shrink-0 ${window.location.pathname === '/list' ? 'invert brightness-0' : ''}`} src={assets.order_icon} alt="" /> 
          <p className="hidden sm:block uppercase tracking-wider">Inventory</p>
        </NavLink>

        <NavLink 
          className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'}`} 
          to="/orders"
        >
          <img className={`w-5 h-5 shrink-0 ${window.location.pathname === '/orders' ? 'invert brightness-0' : ''}`} src={assets.order_icon} alt="" /> 
          <p className="hidden sm:block uppercase tracking-wider">Orders</p>
        </NavLink>

        <div className="border-t border-gray-50 pt-4 mt-2">
          <p className="text-gray-400 text-[10px] pb-3 px-3 font-black uppercase tracking-[0.2em] hidden sm:block">Configuration</p>
          <div className="flex flex-col gap-1">
            <NavLink 
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-gray-100 text-blue-700' : 'text-gray-500 hover:bg-gray-50'}`} 
              to="/category"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <p className="hidden sm:block uppercase tracking-wider text-[11px]">Categories</p>
            </NavLink>
            <NavLink 
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-gray-100 text-blue-700' : 'text-gray-500 hover:bg-gray-50'}`} 
              to="/brand"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="hidden sm:block uppercase tracking-wider text-[11px]">Brands</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
