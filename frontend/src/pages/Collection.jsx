import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';
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
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [conditions, setConditions] = useState([]);

  // Get active filter names for SEO
  const activeBrandNames = brands.filter(b => brandFilter.includes(b._id)).map(b => b.name);
  const activeCategoryNames = categories.filter(c => category.includes(c._id)).map(c => c.name);
  
  const seoTitle = (activeBrandNames.length > 0 || activeCategoryNames.length > 0)
    ? `${activeBrandNames.join(', ')} ${activeCategoryNames.join(', ')} Laptops`
    : "Laptop Collection";

  const seoDescription = `Explore our ${seoTitle.toLowerCase()} collection at LaptopZone. High-performance systems from top brands and manufacturers.`;

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
    setConditions([]);
    setPriceRange({ min: 0, max: 200000 });
    setSortType('relevant');
    setSearchParams({});
  };

  const toggleCondition = (e) => {
    const { value } = e.target;
    setConditions((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
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

    // Apply Price filter
    productsCopy = productsCopy.filter((item) => item.price >= priceRange.min && item.price <= priceRange.max);

    // Apply Condition filter
    if (conditions.length > 0) {
      productsCopy = productsCopy.filter((item) => conditions.includes(item.condition));
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
  }, [category, brandFilter, subCategory, search, showSearch, sortType, products, priceRange, conditions]);


  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={`${activeBrandNames.join(', ')}, ${activeCategoryNames.join(', ')}, buy laptop online, premium hardware`}
        url="/collection"
      />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Filter Sidebar (Drawer on Mobile) */}
          <div className={`fixed inset-0 z-[60] lg:static lg:block transition-all duration-300 ${showFilter ? 'opacity-100 visible' : 'opacity-0 invisible lg:visible lg:opacity-100'}`}>
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setShowFilter(false)}
            ></div>

            <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl p-8 border-l border-slate-100 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:h-auto lg:w-80 lg:shadow-xl lg:shadow-slate-200/50 lg:rounded-[2.5rem] lg:border-white lg:sticky lg:top-28 ${showFilter ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex items-center justify-between mb-8">
                <p className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">Filters</p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={clearAllFilters}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 transition-colors"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setShowFilter(false)}
                    className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-6 mb-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Categories</p>
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
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Brands</p>
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

              {/* Conditions */}
              <div className="space-y-6 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Condition</p>
                <div className="grid grid-cols-1 gap-3">
                  {['New', 'Refurbished', 'Used'].map((cond) => (
                    <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={conditions.includes(cond)}
                          value={cond}
                          onChange={toggleCondition}
                          className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                        />
                        <svg className="absolute w-3 h-3 text-white left-1 pointer-events-none hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-6 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Price Range</p>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <span className="text-slate-300">-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-white p-4 sm:p-8 mb-6 sm:mb-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Title text1="ALL" text2="LAPTOPS" level="h1" />
                  {/* Mobile Filter Toggle */}
                  <button 
                    onClick={() => setShowFilter(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Filter
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {filterProducts.length} Laptops Found
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <p className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Sort By:</p>
                <select 
                  onChange={(e) => setSortType(e.target.value)} 
                  value={sortType}
                  className="w-full sm:w-60 bg-slate-50 border border-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm appearance-none text-center"
                >
                  <option value="relevant">Relevance</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="popular">Popularity</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <Skeleton type="product" count={8} />
            ) : filterProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
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
                    condition={item.condition}
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
                <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic mb-4">No Laptops Found</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                  We couldn't find any laptops matching your current filters. Try resetting them to see more options.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-blue-100"
                >
                  Clear All Filters
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
