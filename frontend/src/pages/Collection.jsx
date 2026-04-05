import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useSearchParams } from 'react-router-dom';

const Collection = () => {
  const { products, search, showSearch, categories, brands } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL search params
  useEffect(() => {
    const brandParam = searchParams.get('brand');
    const categoryParam = searchParams.get('category');
    
    if (brandParam) setBrandFilter([brandParam]);
    if (categoryParam) setCategory([categoryParam]);
    
    // Simulate loading for smoother transitions
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const toggleCategory = (e) => {
    const { value } = e.target;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleBrand = (e) => {
    const { value } = e.target;
    setBrandFilter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setCategory([]);
    setBrandFilter([]);
    setSubCategory([]);
    setSortType('relevant');
    setSearchParams({});
  };

  const applyFilterAndSort = () => {
    let productsCopy = [...products];

    // Apply search filter
    if (showSearch && search) {
      const term = search.toLowerCase();
      productsCopy = productsCopy.filter((item) => {
        const brandName = (item.brand?.name || item.brand || '').toLowerCase();
        const categoryName = (item.category?.name || item.category || '').toLowerCase();
        const processor = (item.processor || '').toLowerCase();
        const ram = (item.ram || '').toLowerCase();
        const storage = (item.storage || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        
        return item.name.toLowerCase().includes(term) ||
               brandName.includes(term) ||
               categoryName.includes(term) ||
               processor.includes(term) ||
               ram.includes(term) ||
               storage.includes(term) ||
               desc.includes(term);
      });
    }

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        const itemCatId = item.category?._id || item.category;
        return category.includes(itemCatId);
      });
    }

    // Apply brand filter
    if (brandFilter.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        const itemBrandId = item.brand?._id || item.brand;
        return brandFilter.includes(itemBrandId);
      });
    }

    // Apply sorting
    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        productsCopy.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        break;
      case 'bestseller':
        productsCopy = productsCopy.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      case 'popular':
        productsCopy = productsCopy.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      default:
        break;
    }

    setFilterProduct(productsCopy);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [category, brandFilter, subCategory, search, showSearch, sortType, products]);

  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 animate-pulse">
      <div className="bg-slate-100 h-48 rounded-2xl mb-4"></div>
      <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-slate-100 rounded w-full mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-slate-100 rounded w-20"></div>
        <div className="h-10 bg-slate-100 rounded w-10"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Filter Sidebar */}
          <div className="lg:w-80 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 border border-white sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <p className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">Filters</p>
                <button 
                  onClick={clearAllFilters}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-6 mb-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Category</p>
                <div className="space-y-3">
                  {categories.map((item) => (
                    <label key={item._id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={category.includes(item._id)}
                          value={item._id}
                          onChange={toggleCategory}
                          className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                        />
                        <svg className="absolute w-3 h-3 text-white left-1 pointer-events-none hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-6 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Manufacturer</p>
                <div className="grid grid-cols-1 gap-3">
                  {brands.map((item) => (
                    <label key={item._id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={brandFilter.includes(item._id)}
                          value={item._id}
                          onChange={toggleBrand}
                          className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                        />
                        <svg className="absolute w-3 h-3 text-white left-1 pointer-events-none hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-white p-6 sm:p-8 mb-10 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-col gap-1">
                <Title text1="HARDWARE" text2="LIBRARY" />
                <div className="flex items-center gap-2 mt-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {filterProducts.length} Active Listings Match Policy
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <p className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Sort Architecture:</p>
                <select 
                  onChange={(e) => setSortType(e.target.value)} 
                  value={sortType}
                  className="w-full sm:w-60 bg-slate-50 border border-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm appearance-none text-center"
                >
                  <option value="relevant">Relevance Index</option>
                  <option value="newest">Latest Releases</option>
                  <option value="low-high">Value: Low to High</option>
                  <option value="high-low">Value: High to Low</option>
                  <option value="bestseller">Best Selling Hub</option>
                  <option value="popular">Popular Infrastructure</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filterProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filterProducts.map((item) => (
                  <ProductItem 
                    key={item._id}
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
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-100">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic mb-4">No Hardware Detected</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                  The current parameters do not match any available system configurations in our live inventory database.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-blue-100"
                >
                  Reset Inventory Parameters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
