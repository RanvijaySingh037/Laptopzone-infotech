import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import Skeleton from './Skeleton';
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
                            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">Just Landed</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">New Arrivals</h2>
                        <p className="text-slate-500 font-medium max-w-xl">Explore the latest high-performance laptops. Our new arrivals feature the newest processors and cutting-edge designs.</p>
                    </div>
                    <button 
                        onClick={handleViewAll}
                        className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-blue-200 active:scale-95"
                    >
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {loading ? (
                        <Skeleton type="product" count={10} />
                    ) : (
                        latestProducts.map((item, index) => (
                            <div key={item._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                <ProductItem 
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    processor={item.processor}
                                    ram={item.ram}
                                    storage={item.storage}
                                    displaySize={item.displaySize}
                                    brand={item.brand?.name || item.brand}
                                    condition={item.condition}
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
