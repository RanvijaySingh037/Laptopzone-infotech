import React, { useContext, memo } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price, processor, ram, storage, displaySize, brand, condition}) => {
    const {currency, toggleWishlist, wishlistItems} = useContext(ShopContext);
    
    // Check if image exists and if it is an array
    const imageUrl = image && Array.isArray(image) && image.length > 0 ? image[0] : '';
    
    const whatsappLink = `https://wa.me/916299745525?text=Hi, I want to buy this laptop: ${encodeURIComponent(name)}`;

    return (
        <div 
            className='text-gray-700 cursor-pointer group bg-white rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col h-full relative' 
        >
            <Link to={`/product/${id}`} className="block">
                <div className='overflow-hidden rounded-[2rem] bg-slate-50 relative mb-6'>
                    {imageUrl ?  (
                        <>
                            <img
                                className='w-full h-56 object-contain p-8 group-hover:scale-110 transition-transform duration-1000'
                                src={imageUrl}
                                alt={name}
                                loading="lazy"
                            />
                            {/* Condition badge */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/20">
                                   <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest italic flex items-center gap-2">
                                       <span className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-pulse"></span>
                                       {condition || "Certified"}
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
                                    className="bg-white/90 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group/heart"
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
                            
                            {/* Hardware Profile Overlay - Always Visible on Hover */}
                            <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                                <div className="flex gap-2">
                                    {ram && (
                                        <div className="bg-slate-900/95 backdrop-blur-md text-white px-3 py-2.5 rounded-xl text-[9px] font-black shadow-xl flex-1 text-center border border-white/10 uppercase tracking-wider">
                                            {ram} RAM
                                        </div>
                                    )}
                                    {storage && (
                                        <div className="bg-blue-700/95 backdrop-blur-md text-white px-3 py-2.5 rounded-xl text-[9px] font-black shadow-xl flex-1 text-center border border-white/10 uppercase tracking-wider">
                                            {storage} SSD
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='w-full h-56 bg-white flex items-center justify-center font-black text-slate-200 tracking-[0.2em] uppercase rounded-[2rem] border-2 border-dashed border-slate-100'>No Preview</div>
                    )}
                </div>
            </Link>
            
            <div className="space-y-4 flex-1 flex flex-col">
                <Link to={`/product/${id}`} className="space-y-1 block">
                    <div className="flex justify-between items-center text-[10px] font-black tracking-[0.2em] text-blue-600/70 uppercase">
                        <span>{brand || "Premium Hardware"}</span>
                    </div>
                    <h3 className='text-base font-black text-slate-800 line-clamp-2 group-hover:text-blue-700 transition-colors tracking-tight leading-tight uppercase'>
                        {name}
                    </h3>
                </Link>
                
                <div className="mt-auto pt-4 flex flex-col gap-4">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className='text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1'>Premium Offering</p>
                            <p className='text-2xl font-black text-slate-900 tracking-tighter'>
                                {currency}{price ? price.toLocaleString() : '0'}
                            </p>
                        </div>
                        <Link to={`/product/${id}`} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 border border-slate-100 group-hover:border-slate-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Sales CTA: WhatsApp Button */}
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(whatsappLink, '_blank');
                        }}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-green-100 flex items-center justify-center gap-3 transition-all active:scale-95 group/wa"
                    >
                        <svg className="w-5 h-5 group-hover/wa:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Buy on WhatsApp
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductItem)