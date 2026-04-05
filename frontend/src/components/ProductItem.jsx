import React, { useContext, memo } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price, processor, ram, storage, displaySize, brand}) => {
    const {currency, toggleWishlist, wishlistItems} = useContext(ShopContext);
    
    // Check if image exists and if it is an array
    const imageUrl = image && Array.isArray(image) && image.length > 0 ? image[0] : '';

    return (
        <Link 
            className='text-gray-700 cursor-pointer group bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col h-full' 
            to={`/product/${id}`}
        >
            <div className='overflow-hidden rounded-2xl bg-slate-50 relative mb-5'>
                {imageUrl ?  (
                    <>
                        <img
                            className='w-full h-56 object-contain p-6 group-hover:scale-105 transition-transform duration-700'
                            src={imageUrl}
                            alt={name}
                            loading="lazy"
                        />
                        {/* Status badge */}
                        <div className="absolute top-4 left-4">
                             <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
                                <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest italic flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-pulse"></span>
                                    In Stock
                                </p>
                             </div>
                        </div>

                        {/* Wishlist Toggle */}
                        <div className="absolute top-4 right-4 z-10">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleWishlist(id);
                                }}
                                className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group/heart"
                            >
                                <svg 
                                    className={`w-5 h-5 transition-all duration-300 ${wishlistItems[id] ? 'text-pink-500 fill-pink-500' : 'text-slate-400 group-hover/heart:text-pink-400'}`} 
                                    fill={wishlistItems[id] ? "currentColor" : "none" }
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Hardware Profile Overlay */}
                        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 translate-y-12 group-hover:translate-y-0 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                            <div className="flex gap-2">
                                {processor && (
                                    <div className="bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-xl text-[9px] font-black shadow-xl flex-1 text-center border border-white/10 uppercase tracking-tighter">
                                        {processor.split(' ')[0]} {processor.split(' ')[1] || ''}
                                    </div>
                                )}
                                {ram && (
                                    <div className="bg-white/95 backdrop-blur-md text-slate-800 px-3 py-2 rounded-xl text-[9px] font-black shadow-xl flex-1 text-center border border-slate-200 uppercase tracking-tighter">
                                        {ram} RAM
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                {storage && (
                                    <div className="bg-blue-700/95 backdrop-blur-md text-white px-3 py-2 rounded-xl text-[9px] font-black shadow-xl flex-1 text-center border border-white/10 uppercase tracking-tighter">
                                        {storage}
                                    </div>
                                )}
                                {displaySize && (
                                    <div className="bg-slate-50 text-slate-800 px-3 py-2 rounded-xl text-[9px] font-black shadow-xl flex-1 text-center border border-slate-200 uppercase tracking-tighter">
                                       {displaySize}" Display
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='w-full h-56 bg-slate-100 flex items-center justify-center font-black text-slate-300 tracking-widest uppercase'>Laptop Image</div>
                )}
            </div>
            
            <div className="space-y-4 flex-1 flex flex-col">
                <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                        <span>{brand || "Laptop Details"}</span>
                    </div>
                    <h3 className='text-base font-black text-slate-800 line-clamp-2 group-hover:text-blue-700 transition-colors tracking-tight leading-tight uppercase'>
                        {name}
                    </h3>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-end justify-between">
                    <div>
                        <p className='text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none mb-2'>Price</p>
                        <p className='text-2xl font-black text-slate-900 tracking-tighter leading-none'>
                            {currency}{price ? price.toLocaleString() : '0'}
                        </p>
                    </div>
                    
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100 group-hover:border-blue-600 group-hover:-translate-y-1">
                        <svg className="w-5 h-5 translate-x-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default memo(ProductItem)