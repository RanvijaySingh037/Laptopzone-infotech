import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Order = ({ token }) => {
  const [activeTab, setActiveTab] = useState('verified')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        toast.success("Logistics Status Updated")
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  // Logic: COD is a verified "Order" because it's a commitment to pay on delivery.
  // Razorpay orders are only "Verified" if payment is true.
  const verifiedOrders = orders.filter(o => o.payment === true || o.paymentMethod === 'COD')
  const incompleteOrders = orders.filter(o => o.payment === false && o.paymentMethod !== 'COD')

  const currentOrders = activeTab === 'verified' ? verifiedOrders : incompleteOrders

  // Stats calculation (Only for verified fleet by default)
  const stats = {
    total: verifiedOrders.length,
    pending: verifiedOrders.filter(o => o.status === 'OrderPlaced' || o.status === 'Packing').length,
    shipped: verifiedOrders.filter(o => o.status === 'Shipping' || o.status === 'Out for delivery').length,
    delivered: verifiedOrders.filter(o => o.status === 'Delivered').length
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'OrderPlaced': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Packing': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Shipping': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Out for delivery': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  }

  if (loading) return (
    <div className='bg-slate-50 min-h-screen flex items-center justify-center'>
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">Syncing Hardware Logistics...</p>
        </div>
    </div>
  )

  return (
    <div className="px-4 py-8 md:px-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Operational Overview Header */}
        <div className='flex flex-col md:flex-row justify-between items-end gap-8 pb-10 border-b border-slate-200'>
          <div className='space-y-2'>
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2 px-1">Orders Dashboard</h3>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Order Management</h1>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-auto'>
            {[
              { label: 'Total Orders', count: stats.total, color: 'text-slate-900 border-slate-200' },
              { label: 'Processing', count: stats.pending, color: 'text-amber-600 border-amber-100' },
              { label: 'Shipped', count: stats.shipped, color: 'text-indigo-600 border-indigo-100' },
              { label: 'Delivered', count: stats.delivered, color: 'text-emerald-600 border-emerald-100' }
            ].map((stat, i) => (
              <div key={i} className={`bg-white px-6 py-4 rounded-2xl shadow-sm border ${stat.color} flex flex-col items-center`}>
                <p className='text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1'>{stat.label}</p>
                <p className='text-xl font-black italic'>{stat.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Filter Tabs */}
        <div className='flex items-center gap-2 p-1.5 bg-slate-100 w-fit rounded-2xl border border-slate-200'>
          <button 
            onClick={() => setActiveTab('verified')}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${activeTab === 'verified' ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Completed Orders
            <span className={`px-2 py-0.5 rounded-md text-[8px] ${activeTab === 'verified' ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
              {verifiedOrders.length}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('incomplete')}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${activeTab === 'incomplete' ? 'bg-white text-red-600 shadow-md ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Pending Payments
            <span className={`px-2 py-0.5 rounded-md text-[8px] ${activeTab === 'incomplete' ? 'bg-red-50 text-red-600' : 'bg-slate-200 text-slate-500'}`}>
              {incompleteOrders.length}
            </span>
          </button>
        </div>

        {/* Orders Table-like Cards */}
        <div className="space-y-8 pb-20">
          {currentOrders.length > 0 ? (
            currentOrders.map((order, index) => (
              <div key={index} className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white hover:border-blue-100 transition-all duration-500 overflow-hidden animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                {/* Card Header: Logistics ID & Date */}
                <div className='bg-slate-50/50 px-8 py-5 border-b border-slate-50 flex flex-wrap justify-between items-center gap-4'>
                    <div className='flex items-center gap-4'>
                        <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black italic shadow-lg">L</div>
                        <div>
                            <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1'>Order ID</p>
                            <p className='text-sm font-black text-slate-800 tracking-tighter uppercase leading-none'>#{order._id.slice(-8)}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-8'>
                        <div className='text-right'>
                            <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1'>Order Date</p>
                            <p className='text-xs font-bold text-slate-700 tracking-tight leading-none'>{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] italic ${getStatusColor(order.status)} animate-pulse`}>
                            {order.status === 'OrderPlaced' ? 'Pending' : order.status}
                        </div>
                    </div>
                </div>

                {/* Card Body */}
                <div className='p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[2fr_2.5fr_1.5fr] gap-12'>
                    
                    {/* Customer Logistics Profile */}
                    <div className='space-y-6'>
                        <div className='flex items-center gap-3 mb-2'>
                            <div className='w-1.5 h-1.5 bg-blue-600 rounded-full'></div>
                            <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Customer Details</h4>
                        </div>
                        <div className='bg-slate-50/50 p-6 rounded-3xl border border-slate-50 space-y-4'>
                            <p className='text-lg font-black text-slate-950 uppercase italic leading-none'>
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <div className='text-xs font-medium text-slate-600 space-y-1.5 leading-relaxed'>
                                <p>{order.address.street}</p>
                                <p>{order.address.city}, {order.address.state} {order.address.pinCode}</p>
                                <p className='text-slate-400 uppercase font-black text-[9px] tracking-widest'>{order.address.country}</p>
                            </div>
                            <div className='pt-4 border-t border-slate-100 flex items-center gap-3 text-slate-500'>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <p className='text-xs font-bold'>{order.address.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Hardware Configuration Deployment */}
                    <div className='space-y-6'>
                        <div className='flex items-center gap-3 mb-2'>
                            <div className='w-1.5 h-1.5 bg-indigo-600 rounded-full'></div>
                            <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Product Details</h4>
                        </div>
                        <div className='space-y-4'>
                            {order.items.map((item, i) => (
                                <div key={i} className='flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm'>
                                    <div className='w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center p-2 border border-slate-50'>
                                        <img src={assets.parcel_icon} className='w-10 opacity-30 grayscale' alt="Package" />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-xs font-black text-slate-900 uppercase italic truncate'>{item.name}</p>
                                        <div className='flex items-center gap-2 mt-1'>
                                            <span className='text-[8px] bg-slate-900 text-white px-2 py-0.5 rounded-md font-black uppercase tracking-widest'>X{item.quantity} Units</span>
                                            <span className='text-[8px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-black uppercase tracking-widest'>{item.size || 'Standard'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Terminal & Actions */}
                    <div className='space-y-6'>
                        <div className='flex items-center gap-3 mb-2'>
                            <div className='w-1.5 h-1.5 bg-emerald-600 rounded-full'></div>
                            <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Payment Details</h4>
                        </div>
                        <div className='space-y-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-50'>
                            <div className='flex justify-between items-end'>
                                <p className='text-[24px] font-black text-slate-950 tracking-tighter italic leading-none'>{currency}{order.amount.toLocaleString()}</p>
                                <div className='text-right'>
                                    <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1'>Method</p>
                                    <p className='text-[10px] font-black text-slate-700 uppercase italic'>{order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</p>
                                </div>
                            </div>
                            
                            <div className='flex items-center gap-3 py-3 border-y border-white/50'>
                                <div className={`w-2 h-2 rounded-full ${order.payment ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 animate-pulse'}`}></div>
                                <p className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>
                                    Payment: <span className={order.payment ? 'text-emerald-700' : 'text-red-600'}>{order.payment ? 'Paid' : 'Pending'}</span>
                                </p>
                            </div>

                            <div className='space-y-3 pt-2'>
                                <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest'>Delivery Status</p>
                                <select 
                                    onChange={(event) => statusHandler(event, order._id)} 
                                    value={order.status} 
                                    className="w-full bg-slate-900 text-white rounded-xl border-none shadow-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-800 transition-colors"
                                >
                                    <option value="OrderPlaced">Order Placed</option>
                                    <option value="Packing">Preparing</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipping">Shipped</option>
                                    <option value="Out for delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-40">
                <div className='bg-white rounded-[3rem] p-20 shadow-2xl shadow-slate-200/50 border border-white max-w-2xl mx-auto'>
                    <div className='w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100'>
                        <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11l-7 7-7-7" />
                        </svg>
                    </div>
                    <h3 className="text-4xl font-black text-slate-950 uppercase tracking-tighter italic mb-4">No Active Units</h3>
                    <p className='text-slate-400 font-black text-[10px] uppercase tracking-widest max-w-sm mx-auto leading-relaxed'>
                        Current logistics network is clear. No hardware deployments detected in the system pipeline.
                    </p>
                </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
        }
      ` }} />
    </div>
  )
}

export default Order
