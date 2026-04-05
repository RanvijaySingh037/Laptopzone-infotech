import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProducts = ({ category, subCategory, currentProductId, brand, price }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      // 1. Initial Filtering: Match Category and Exclude Current Product
      let candidates = products.filter(item => {
        const itemCatId = item.category?._id || item.category;
        const targetCatId = category?._id || category;
        return itemCatId === targetCatId && item._id !== currentProductId;
      });

      // 2. Scoring System for Relevance
      const scoredProducts = candidates.map(item => {
        let score = 0;
        const itemBrandId = item.brand?._id || item.brand;
        const targetBrandId = brand?._id || brand;

        // Brand Affinity (+3 points)
        if (itemBrandId === targetBrandId) score += 3;

        // SubCategory Match (+2 points)
        if (item.subCategory === subCategory) score += 2;

        // Price Proximity within +/- 25% (+2 points)
        if (price) {
          const minPrice = price * 0.75;
          const maxPrice = price * 1.25;
          if (item.price >= minPrice && item.price <= maxPrice) score += 2;
        }

        return { ...item, relevanceScore: score };
      });

      // 3. Sort by Score (Descending), then by Price (Ascending)
      const sortedProducts = scoredProducts.sort((a, b) => {
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        return a.price - b.price;
      });

      setRelated(sortedProducts.slice(0, 5));
      setLoading(false);
    }
  }, [products, category, subCategory, currentProductId, brand, price]);

  if (loading) return (
    <div className='my-24 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-100'>
        <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optimizing Recommendation Engine...</p>
        </div>
    </div>
  );

  return (
    <div className='my-24 py-16 border-t border-slate-100'>
      <div className='text-center space-y-4 mb-16'>
        <Title text1={'SIMILAR'} text2={'HARDWARE'} />
        <p className='text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3'>
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
            High-Relevance Architecture Specs
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
        {related.length > 0 ? (
          related.map((item, index) => (
            <div 
              key={item._id}
              className='transform hover:scale-105 transition-all duration-500'
            >
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
              />
            </div>
          ))
        ) : (
          <div className="text-center col-span-full py-10 opacity-50">
             <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No Comparable Systems Detected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
