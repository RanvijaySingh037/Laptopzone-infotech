import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, currency } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            setCartItems({});
            navigate('/orders');
          }
        } catch (error) {
          console.log(error);
        }
      },
    }
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // 👈 Start loading

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = products.find(product => product._id === itemId);
          if (itemInfo) {
            orderItems.push({
              ...itemInfo,
              quantity: cartItems[itemId]
            });
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          if (responseRazorpay.data.success && responseRazorpay.data.order) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 👈 Stop loading
    }
  };

  const paymentMethods = [
    { id: 'razorpay', name: 'Razorpay', logo: assets.razorpay_logo },
    { id: 'cod', name: 'Cash on Delivery', logo: null }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Secure Checkout</h1>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Provide your delivery details
            </p>
          </div>
          <button 
            onClick={() => navigate('/cart')}
            className="text-blue-700 font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2 transition-all w-fit"
          >
            ← BACK TO CART
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row gap-16 items-start'>
          {/* Left side - Shipment Details */}
          <div className='flex-1 w-full bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-6 sm:p-12 border border-blue-50 relative overflow-hidden'>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            
            <div className='mb-8 sm:mb-12'>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tighter uppercase italic mb-2">Delivery Address</h2>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Items will be delivered to this address</p>
            </div>

            <div className="space-y-10">
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Full Name</label>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='fullName' 
                    value={formData.fullName} 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all duration-300 font-bold text-slate-800 placeholder-slate-300" 
                    type="text" 
                    placeholder="Enter full name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Contact Number</label>
                  <input 
                    required 
                    onChange={(e) => {
                         const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                         setFormData(prev => ({...prev, phone: val}));
                    }} 
                    name='phone' 
                    value={formData.phone} 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all duration-300 font-bold text-slate-800 placeholder-slate-300" 
                    type="tel" 
                    placeholder="10-digit mobile number" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Email Address</label>
                <input 
                  required 
                  onChange={onChangeHandler} 
                  name='email' 
                  value={formData.email} 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all duration-300 font-bold text-slate-800 placeholder-slate-300" 
                  type="email" 
                  placeholder="acquisition@example.com" 
                />
              </div>

              {/* Logistic Details */}
              <div className="space-y-8 pt-6 border-t border-slate-50">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Shipment Destination (Street)</label>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='street' 
                    value={formData.street} 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all duration-300 font-bold text-slate-800 placeholder-slate-300" 
                    type="text" 
                    placeholder="House No, Street, Locality" 
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  <div className="space-y-2 col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">City</label>
                    <input 
                      required 
                      onChange={onChangeHandler} 
                      name='city' 
                      value={formData.city} 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold text-slate-800 uppercase text-xs" 
                      type="text" 
                      placeholder="CITY" 
                    />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">State</label>
                    <input 
                      required 
                      onChange={onChangeHandler} 
                      name='state' 
                      value={formData.state} 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold text-slate-800 uppercase text-xs" 
                      type="text" 
                      placeholder="STATE" 
                    />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Pincode</label>
                    <input 
                      required 
                      onChange={onChangeHandler} 
                      name='pinCode' 
                      value={formData.pinCode} 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold text-slate-800 uppercase text-xs" 
                      type="number" 
                      placeholder="PIN" 
                    />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Country</label>
                    <input 
                      required 
                      onChange={onChangeHandler} 
                      name='country' 
                      value={formData.country} 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold text-slate-800 uppercase text-xs" 
                      type="text" 
                      placeholder="IN" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Summary & Payment */}
          <div className='lg:w-[450px] w-full space-y-8 lg:sticky top-32'>
            {/* Order Review & Totals */}
            <div className='bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 border border-blue-50 relative overflow-hidden'>
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               
               <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic mb-8 flex items-center gap-3">
                  Deployment Summary
                  <span className="h-[2px] w-8 bg-blue-700 rounded-full"></span>
               </h2>

               {/* Quick Item Review */}
               <div className="space-y-4 mb-8 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(cartItems).map(([id, qty]) => {
                     if (qty <= 0) return null;
                     const item = products.find(p => p._id === id);
                     if (!item) return null;
                     return (
                        <div key={id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 group transition-all">
                           <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden">
                              <img src={item.image[0]} alt="" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500" />
                           </div>
                           <div className="min-w-0">
                               <p className="text-[10px] font-black text-slate-800 truncate uppercase italic">{item.name}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{qty} Qty • {currency}{item.price.toLocaleString()}</p>
                           </div>
                        </div>
                     );
                  })}
               </div>

               <div className="border-t border-slate-50 pt-8">
                  <CartTotal />
               </div>
            </div>

            {/* Payment Protocol Selection */}
            <div className='bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 border border-blue-50'>
              <div className='mb-8'>
                <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic mb-2">Authorization</h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Select Transaction Protocol</p>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((pm) => (
                  <div 
                    key={pm.id}
                    onClick={() => setMethod(pm.id)} 
                    className={`flex items-center justify-between gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      method === pm.id 
                        ? 'border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-100' 
                        : 'border-slate-100 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-[3px] flex items-center justify-center transition-all ${
                        method === pm.id ? 'border-blue-600 bg-blue-600' : 'border-slate-200'
                        }`}>
                        {method === pm.id && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                            method === pm.id ? 'text-blue-700' : 'text-slate-500'
                        }`}>{pm.name}</span>
                    </div>
                    {pm.logo && <img className="h-5 grayscale opacity-70 group-hover:grayscale-0 transition-all" src={pm.logo} alt="" />}
                  </div>
                ))}
              </div>

              <button 
                type='submit'
                disabled={loading}
                className='mt-10 w-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] py-6 px-10 rounded-2xl shadow-xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 transition-all duration-500 disabled:opacity-50 disabled:scale-[0.98] disabled:cursor-not-allowed group'
              >
                {loading ? (
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        PROCESSING...
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-3">
                        PLACE ORDER
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
