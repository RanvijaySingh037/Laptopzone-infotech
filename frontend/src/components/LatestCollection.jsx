import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (products.length > 0) {
            // Take the 10 most recent products
            setLatestProducts(products.slice(0, 10));
            setLoading(false);
        }
    }, [products]);

    const handleViewAll = () => {
        navigate('/collection');
    };

    const ProductSkeleton = () => (
        <div className="animate-pulse bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <div className="bg-slate-200 h-48 rounded-2xl mb-4"></div>
            <div className="bg-slate-200 h-4 rounded w-3/4 mb-2"></div>
            <div className="bg-slate-200 h-4 rounded w-1/2"></div>
        </div>
    );

    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">Latest Inventory Update</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">New Arrivals</h2>
                        <p className="text-slate-500 font-medium max-w-xl">Deploying the next generation of computing power. Our latest acquisitions feature the newest silicon and thermal architecture.</p>
                    </div>
                    <button 
                        onClick={handleViewAll}
                        className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-blue-200 active:scale-95"
                    >
                        Expand Grid
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {loading ? (
                        [...Array(10)].map((_, i) => <ProductSkeleton key={i} />)
                    ) : (
                        latestProducts.map((item, index) => (
                            <div key={item._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                <ProductItem 
                                    item={item}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestCollection;
