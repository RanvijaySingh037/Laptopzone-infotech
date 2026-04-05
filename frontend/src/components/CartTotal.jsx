import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className='w-full'>
      <div className='mb-10 text-center sm:text-left'>
        <Title text1={'PRICE'} text2={'DETAILS'} />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Price summary for your order</p>
      </div>

      <div className='space-y-6'>
        {/* Subtotal */}
        <div className='flex justify-between items-center py-4 border-b border-dashed border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <p className='text-slate-500 font-black text-[10px] uppercase tracking-widest'>Total MRP</p>
          </div>
          <p className='text-slate-900 font-black tracking-tighter text-lg'>{currency} {subtotal.toLocaleString()}.00</p>
        </div>

        {/* Shipping Fee */}
        <div className='flex justify-between items-center py-4 border-b border-dashed border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            </div>
            <p className='text-slate-500 font-black text-[10px] uppercase tracking-widest'>Delivery Charges</p>
          </div>
          <p className='text-slate-900 font-black tracking-tighter text-lg'>{currency} {delivery_fee.toLocaleString()}.00</p>
        </div>

        {/* Total Architecture Fee */}
        <div className='mt-8 pt-8 border-t-2 border-slate-950'>
            <div className='flex justify-between items-end'>
                <div className='space-y-1'>
                    <p className='text-[10px] font-black text-blue-600 uppercase tracking-widest'>Total Amount</p>
                    <p className='text-slate-400 text-[8px] font-bold uppercase tracking-[0.2em]'>Inclusive of all taxes</p>
                </div>
                <p className='text-4xl font-black text-slate-950 tracking-tighter italic leading-none'>
                    {currency} {total.toLocaleString()}.00
                </p>
            </div>
        </div>

        {/* Priority Badge */}
        {subtotal > 0 && (
          <div className='bg-blue-700 rounded-2xl p-4 mt-8 flex items-center gap-4 border border-blue-600 shadow-xl shadow-blue-100'>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04M12 2.944a11.955 11.955 0 01-7.618 3.04m0 0v6.72c0 5.247 3.582 9.811 8.353 10.741a11.91 11.91 0 008.535-10.741V6.03a11.955 11.955 0 01-7.618-3.04z" />
                </svg>
            </div>
            <div>
                <p className='text-white text-[10px] font-black uppercase tracking-widest leading-none mb-1'>100% Secure Payment</p>
                <p className='text-blue-200 text-[8px] font-bold uppercase tracking-widest leading-none'>Fast & Trusted Delivery</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTotal