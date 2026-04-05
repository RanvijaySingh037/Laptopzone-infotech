import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-md" to="/add">
          <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
          <p className="hidden md:block"> Add Items</p>
        </NavLink>

        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-md" to="/list">
          <img className="w-5 h-5" src={assets.order_icon} alt="List Icon" /> 
          <p className="hidden md:block"> List Items</p>
        </NavLink>

        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-md" to="/orders">
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders Icon" /> 
          <p className="hidden md:block"> Orders</p>
        </NavLink>

        <div className="border-t pt-4 mt-2">
          <p className="text-gray-400 text-[12px] pb-2 font-bold uppercase tracking-wider hidden md:block">Management</p>
          <div className="flex flex-col gap-2">
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-1 rounded-md" to="/category">
              <p className="hidden md:block">Categories</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-1 rounded-md" to="/brand">
              <p className="hidden md:block">Brands</p>
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
