import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate, token, clearBuyNow } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearBuyNow();
  }, [clearBuyNow]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }
      setCartData(tempData);
      setLoading(false);
    }
  }, [cartItems, products]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      updateQuantity(id, 0);
    } else {
      updateQuantity(id, quantity);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Loading Cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-10 lg:px-16 pb-20 transition-all duration-500">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 sm:mb-16">
          <div className="space-y-2">
            <Title text1={"YOUR"} text2={"CART"} />
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                Review your items before checkout
            </p>
          </div>
          {cartData.length > 0 && (
            <div className="bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Cart Summary</p>
                <div className="h-4 w-px bg-slate-100"></div>
                <p className="text-xs sm:text-sm font-black text-slate-900">{cartData.reduce((sum, item) => sum + item.quantity, 0)} Items</p>
            </div>
          )}
        </div>

        {cartData.length > 0 ? (
          <div className="flex flex-col xl:flex-row gap-12 items-start">
            
            {/* Cart Items List */}
            <div className="flex-1 w-full space-y-6">
              <div className="hidden lg:grid grid-cols-[3fr_1.5fr_1.5fr_1fr] gap-4 px-8 mb-4 border-b border-slate-100 pb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Details</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Quantity</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total Price</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</p>
              </div>

              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-white hover:border-blue-100 transition-all duration-500 group flex flex-col lg:grid lg:grid-cols-[3fr_1.5fr_1.5fr_1fr] gap-6 items-center"
                  >
                    {/* Hardware Info */}
                    <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto">
                      <div className="relative w-20 h-20 sm:w-32 sm:h-32 bg-slate-50 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <img
                          className="w-full h-full object-contain p-2 sm:p-4"
                          src={productData.image[0]}
                          alt={productData.name}
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-4 flex-1">
                        <div>
                            <p className="text-[8px] sm:text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-0.5 sm:mb-1">
                                {productData.brand?.name || productData.brand || "Laptop Details"}
                            </p>
                            <p className="font-black text-slate-900 text-sm sm:text-xl tracking-tighter uppercase leading-tight italic line-clamp-2">
                                {productData.name}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
                            <span className="text-[8px] sm:text-[9px] bg-slate-900 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-black uppercase tracking-widest border border-white/10 shrink-0">
                                {productData.processor?.split(' ')[0]}
                            </span>
                            <span className="text-[8px] sm:text-[9px] bg-slate-50 text-slate-600 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-black uppercase tracking-widest border border-slate-100 shrink-0">
                                {productData.ram}
                            </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[9px] font-black text-slate-300 uppercase lg:hidden">Quantity</p>
                        <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-100 shadow-inner">
                            <button
                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-300 font-black"
                            >
                                -
                            </button>
                            <span className="w-14 text-center font-black text-slate-900 text-sm">{item.quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-300 font-black"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Price Recap */}
                    <div className="text-center lg:text-right w-full lg:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50 sm:block flex justify-between items-center px-4 sm:px-0">
                        <p className="text-[9px] font-black text-slate-300 uppercase lg:hidden">Total Price</p>
                        <div>
                            <p className="text-xl sm:text-2xl font-black text-slate-950 tracking-tighter leading-none">
                                {currency}{(productData.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                {currency}{productData.price.toLocaleString()} / unit
                            </p>
                        </div>
                    </div>

                    {/* Action Decommission */}
                    <div className="flex justify-center lg:justify-end w-full lg:w-auto">
                      <button
                        onClick={() => updateQuantity(item._id, 0)}
                        className="w-12 h-12 flex items-center justify-center text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-500 border border-transparent hover:border-red-100 group/btn"
                      >
                        <svg className="w-6 h-6 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="pt-10">
                <button
                  onClick={() => navigate('/collection')}
                  className="group flex items-center gap-4 text-slate-400 hover:text-blue-700 font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 transition-colors">
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </div>
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="w-full xl:w-[450px] sticky top-10 flex flex-col gap-8">
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 border border-white">
                <CartTotal />
                <div className='w-full mt-10 space-y-4'>
                    <button 
                        onClick={() => {
                            if (!token) {
                                localStorage.setItem('redirectAfterLogin', '/place-order');
                                navigate('/login');
                            } else {
                                navigate('/place-order');
                            }
                        }} 
                        className='w-full bg-blue-700 text-white font-black text-xs uppercase tracking-[0.25em] py-6 px-10 rounded-2xl shadow-xl shadow-blue-100 hover:bg-slate-950 transition-all duration-500 flex items-center justify-center gap-3 group active:scale-[0.98]'
                    >
                        Proceed to Checkout
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    <div className="flex items-center justify-center gap-4 py-4 opacity-50">
                        <div className="h-px bg-slate-100 flex-1"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">100% Secure Payment</p>
                        <div className="h-px bg-slate-100 flex-1"></div>
                    </div>
                </div>
              </div>
              
              {/* Optional Prompt Section */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6 shadow-2xl shadow-slate-300">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Coupon Code</p>
                        <p className="text-lg font-black tracking-tighter uppercase leading-none italic">Apply Discount Code</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="ENTER CODE" 
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                    />
                    <button className="bg-white text-slate-950 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-400 transition-colors">
                        Apply
                    </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 p-16 sm:p-20 max-w-2xl mx-auto border border-white">
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-slate-100 animate-pulse">
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5.2A2 2 0 007.83 20H19" />
                </svg>
              </div>
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase italic">Your cart is empty</h3>
              <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] mb-12 max-w-md mx-auto leading-relaxed">
                Looks like you haven't added any laptops to your cart yet.
              </p>
              <button
                onClick={() => navigate('/collection')}
                className="bg-blue-700 text-white px-12 py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-950 hover:shadow-2xl hover:shadow-blue-200 transition-all duration-500 active:scale-95"
              >
                Start Shopping
              </button>
            </div>
          </div>
        )}
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
  );
};

export default Cart;
