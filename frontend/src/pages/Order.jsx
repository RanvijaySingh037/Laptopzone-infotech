import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Order = () => {
  const{ backendUrl, token ,currency} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItems = [] 
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItems.push(item)
          })
        });
        setOrderData(allOrdersItems.reverse());
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse max-w-6xl mx-auto">
          <div className="h-10 bg-slate-200 rounded-full w-48 mb-12"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-40 bg-slate-200 rounded-[2rem] mb-8"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20'>
      <div className="max-w-6xl mx-auto">
        <div className='text-center mb-12'>
          <Title text1={'ORDER'} text2={'HISTORY'}/>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Track and manage your recent laptop orders</p>
        </div>

        {orderData.length > 0 ? (
          <div className="space-y-8">
            {orderData.map((item,index) => (
              <div 
                key={index} 
                className='bg-white rounded-[2rem] shadow-2xl shadow-blue-100/50 p-8 border border-blue-50 hover:border-blue-200 transition-all duration-500 group relative overflow-hidden'
              >
                {/* Status indicator accent */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${getStatusColor(item.status)}`}></div>
                
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                  <div className='flex items-start gap-6'>
                    <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-blue-100/30 group-hover:scale-105 transition-transform duration-500">
                      <img 
                        className='w-24 h-24 sm:w-28 sm:h-28 object-cover' 
                        src={item.image[0]} 
                        alt={item.name} 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className='font-black text-slate-800 text-lg sm:text-xl tracking-tighter uppercase italic mb-3 group-hover:text-blue-700 transition-colors'>{item.name}</h3>
                      <div className='flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400'>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300">Total Price:</span>
                          <span className="text-blue-700 font-black">{currency}{item.price.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300">Quantity:</span>
                          <span className="bg-slate-50 px-3 py-1 rounded-full text-slate-600 border border-slate-100">{item.quantity}</span>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                          </svg>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            DATE: <span className="text-slate-800">{new Date(item.date).toLocaleDateString()}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            PAYMENT: <span className="text-slate-800 uppercase">{item.paymentMethod}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-full border border-slate-100">
                      <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${getStatusColor(item.status)}`}></div>
                      <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">{item.status}</span>
                    </div>
                    <button 
                      onClick={loadOrderData} 
                      className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500 flex items-center justify-center gap-2 group"
                    >
                      TRACK ORDER
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-16 max-w-lg mx-auto border border-blue-50">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter uppercase italic">No Orders Found</h3>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-10">You haven't placed any orders yet</p>
              <button 
                onClick={() => navigate('/collection')}
                className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500"
              >
                Browse Collection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order
