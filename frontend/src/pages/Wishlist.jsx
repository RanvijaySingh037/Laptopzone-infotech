import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Wishlist = () => {
    const { products, wishlistItems, addToCart } = useContext(ShopContext);
    const [wishlistData, setWishlistData] = useState([]);

    useEffect(() => {
        const tempData = products.filter(item => wishlistItems[item._id]);
        setWishlistData(tempData);
    }, [wishlistItems, products]);

    const handleMoveAllToCart = () => {
        wishlistData.forEach(item => {
            addToCart(item._id);
        });
    };

    return (
        <div className='bg-slate-50 min-h-screen pt-10 px-4 sm:px-10 lg:px-16 pb-20 transition-all duration-500'>
            <div className='max-w-[1400px] mx-auto'>
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
                    <div className="space-y-2">
                        <Title text1={'MY'} text2={'WISHLIST'} />
                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            Reserved Technical Configurations
                        </p>
                    </div>
                    {wishlistData.length > 0 && (
                        <button 
                            onClick={handleMoveAllToCart}
                            className="w-full md:w-auto bg-slate-900 text-white px-8 py-3.5 sm:py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all duration-500 shadow-xl shadow-slate-200 active:scale-95"
                        >
                            Deploy All To Cart
                        </button>
                    )}
                </div>

                {wishlistData.length > 0 ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10'>
                        {wishlistData.map((item, index) => (
                            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <ProductItem 
                                    id={item._id} 
                                    name={item.name} 
                                    image={item.image} 
                                    price={item.price} 
                                    processor={item.processor}
                                    ram={item.ram}
                                    storage={item.storage}
                                    displaySize={item.displaySize}
                                    brand={item.brand?.name || item.brand}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center py-32 space-y-8 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50'>
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
                            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Wishlist Data Empty</h3>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest px-4">
                                No high-performance hardware has been prioritized for acquisition yet.
                            </p>
                        </div>
                        <button 
                            onClick={() => window.location.href = '/collection'}
                            className="bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-blue-100"
                        >
                            Scan Full Inventory
                        </button>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                    opacity: 0;
                }
            ` }} />
        </div>
    );
};

export default Wishlist;
