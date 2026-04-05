import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const bestProductList = products.filter((item) => item.bestseller);
      setBestSellers(bestProductList.slice(0, 5));
      setLoading(false);
    }
  }, [products]);

  const handleViewAll = () => {
    navigate('/collection');
  };

  const ProductSkeleton = () => (
    <div className="animate-pulse bg-slate-800/50 p-4 rounded-3xl border border-slate-700">
      <div className="bg-slate-700 h-48 rounded-2xl mb-4"></div>
      <div className="bg-slate-700 h-4 rounded w-3/4 mb-2"></div>
      <div className="bg-slate-700 h-4 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">Hardware Benchmarks</span>
            </div>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">Elite Performance</h2>
            <p className="text-slate-400 font-medium max-w-xl text-lg">
              Battle-tested and community-approved. These units represent our highest-rated hardware configurations, selected for their exceptional stability and processing throughput.
            </p>
          </div>
          <button 
            onClick={handleViewAll}
            className="group flex items-center gap-4 text-white font-black text-xs uppercase tracking-[0.2em] hover:text-blue-400 transition-all duration-300"
          >
            Access Full Inventory
            <div className="w-12 h-[2px] bg-white group-hover:w-16 group-hover:bg-blue-400 transition-all duration-300"></div>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {loading ? (
            [...Array(5)].map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            bestSellers.map((item, index) => (
              <div key={item._id} className="group relative">
                {/* Ranking Badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 text-white rounded-xl shadow-xl z-20 flex items-center justify-center font-black italic border-2 border-slate-900 group-hover:scale-110 transition-transform">
                  #{index + 1}
                </div>
                
                <div className="bg-slate-800/30 p-4 rounded-[2.5rem] border border-slate-800 group-hover:bg-slate-800/60 group-hover:border-blue-500/30 transition-all duration-500">
                  <ProductItem
                    item={item}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
