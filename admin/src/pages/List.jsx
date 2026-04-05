import React, { useState, useEffect } from 'react'
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const List = ({ token }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this laptop?")) return;
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
         <p className='text-2xl font-black text-slate-800 uppercase tracking-tight'>Inventory Management</p>
         <button onClick={() => navigate('/add')} className="px-6 py-2 bg-blue-700 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg active:scale-95">
            + New Stock
         </button>
      </div>

      <div className='bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100'>
        {/* Table Header */}
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_0.5fr_1fr] items-center py-4 px-6 bg-slate-800 text-white font-black uppercase tracking-widest text-[10px]'>
          <span>Image</span>
          <span>Name</span>
          <span>Brand</span>
          <span>Category</span>
          <span>CPU</span>
          <span>RAM</span>
          <span>Price</span>
          <span className='text-center'>Actions</span>
        </div>

        {/* Product List */}
        {
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_0.5fr_1fr] items-center gap-3 py-4 px-6 border-b border-slate-50 bg-white hover:bg-blue-50/30 transition-all duration-200 last:border-none text-sm'>
              <img className='w-14 h-14 object-contain bg-slate-50 rounded-lg border border-slate-100 p-1 shadow-sm' src={item.image[0]} alt={item.name} />
              <p className="text-slate-900 font-bold uppercase tracking-tight truncate pr-4">{item.name}</p>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{item.brand?.name || item.brand || "-"}</p>
              <p className="text-slate-400 font-medium truncate italic">{item.category?.name || item.category || "-"}</p>
              <p className="text-blue-700 font-black text-[11px] uppercase truncate">{item.processor || "N/A"}</p>
              <p className="text-slate-500 font-bold text-xs">{item.ram || "N/A"}</p>
              <p className="font-black text-slate-900">{currency}{item.price.toLocaleString('en-IN')}</p>

              <div className='flex justify-center gap-2'>
                <button 
                  onClick={() => navigate(`/edit/${item._id}`)}
                  className='text-blue-600 hover:text-blue-800 p-2.5 rounded-xl hover:bg-blue-100 transition-all duration-200 shadow-sm border border-transparent hover:border-blue-200'
                  title="Modify Entry"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button 
                  onClick={() => removeProduct(item._id)} 
                  className='text-red-500 hover:text-red-700 p-2.5 rounded-xl hover:bg-red-50 transition-all duration-200 shadow-sm border border-transparent hover:border-red-100'
                  title="Expunge Entry"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List;
