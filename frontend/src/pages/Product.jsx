import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets'; 
import RelatedProducts from '../components/Relatedproducts';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart, toggleWishlist, wishlistItems } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
      setLoading(false);
    }
    // Scroll to top on product change
    window.scrollTo(0, 0);
  }, [productId, products]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        addToCart(productData._id);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) return (
    <div className='bg-slate-50 min-h-screen pt-20 px-4 sm:px-10 flex items-center justify-center'>
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Initializing Hardware...</p>
        </div>
    </div>
  );

  if (!productData) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <p className="text-slate-400 font-black uppercase tracking-widest">Hardware Not Found</p>
  </div>;

  return (
    <div className='bg-slate-50 border-t border-slate-100 pt-10 px-4 sm:px-10 lg:px-16 transition-all duration-500'>
      <div className='max-w-[1400px] mx-auto'>
        
        {/* Main Product Section */}
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-16'>
          
          {/* Left Side: Image Gallery */}
          <div className='flex-1 flex flex-col gap-4'>
            <div className='w-full aspect-[4/3] relative rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-white overflow-hidden group'>
              <img 
                src={image} 
                className='w-full h-full object-contain p-10 group-hover:scale-105 transition-transform duration-700' 
                alt={productData.name} 
              />
              {/* Zoom Indicator */}
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-slate-100">
                <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
              {productData.image.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  src={item}
                  className={`w-24 h-24 sm:w-28 sm:h-28 object-contain p-4 bg-white rounded-2xl cursor-pointer border-2 transition-all duration-300 shadow-sm ${
                    image === item ? 'border-blue-600 shadow-blue-100 shadow-lg scale-105' : 'border-transparent hover:border-slate-200'
                  }`}
                  alt=""
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className='flex-1 space-y-8'>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full w-fit">
                        {productData.brand?.name || productData.brand || "System Architecture"}
                    </p>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${productData.stock > 0 ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                        <span className={`w-2 h-2 rounded-full ${productData.stock > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                        <p className='text-[10px] font-black uppercase tracking-widest'>
                            {productData.stock > 0 ? (productData.stock < 10 ? `Only ${productData.stock} Units Left` : 'In Stock & Ready') : 'Inventory Depleted'}
                        </p>
                    </div>
                </div>
                <h1 className='text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] uppercase tracking-tighter'>
                    {productData.name}
                </h1>
                
                {/* Rating */}
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1 bg-slate-100/50 p-1 rounded-lg px-2 text-slate-400'>
                        {[...Array(5)].map((_, index) => (
                            <img key={index} src={assets.star_icon} alt="Star" className={`w-3.5 ${index < Math.round(productData.ratingsAverage || 4) ? 'brightness-110' : 'opacity-30'}`} />
                        ))}
                    </div>
                    <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                        ({productData.ratingsCount || 0} Professional Reviews)
                    </p>
                </div>
            </div>

            {/* Pricing Architecture */}
            <div className='bg-white rounded-[2rem] p-8 border border-white shadow-xl shadow-slate-200/50 space-y-6'>
                <div className="flex items-end gap-4">
                    <p className='text-5xl font-black text-slate-950 tracking-tighter'>
                        {currency}{productData.price.toLocaleString()}
                    </p>
                    {productData.originalPrice > productData.price && (
                        <div className="flex flex-col gap-0 pb-1">
                            <span className="text-slate-400 text-sm line-through font-bold">{currency}{productData.originalPrice.toLocaleString()}</span>
                            <span className="text-green-600 text-xs font-black uppercase tracking-tighter">Save {productData.discountPercent || Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}%</span>
                        </div>
                    )}
                </div>

                {/* Key Hardware Snapshot */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                        <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1'>CPU</p>
                        <p className='text-[11px] font-black text-slate-800 leading-none truncate'>{productData.processor?.split(' ')[0] || "i7"}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                        <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1'>RAM</p>
                        <p className='text-[11px] font-black text-slate-800 leading-none truncate'>{productData.ram || "16GB"}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:border-purple-200 transition-colors">
                        <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1'>STORAGE</p>
                        <p className='text-[11px] font-black text-slate-800 leading-none truncate'>{productData.storage || "512GB"}</p>
                    </div>
                </div>

                {/* Interaction Terminal */}
                <div className='space-y-4 pt-4'>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                            <button 
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="w-10 h-10 flex items-center justify-center text-slate-600 font-bold hover:bg-white rounded-lg transition-colors"
                            >
                                -
                            </button>
                            <span className="w-12 text-center font-black text-slate-800">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(q => q + 1)}
                                className="w-10 h-10 flex items-center justify-center text-slate-600 font-bold hover:bg-white rounded-lg transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <button 
                            onClick={() => toggleWishlist(productData._id)}
                            className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 ${wishlistItems[productData._id] ? 'bg-red-50 border-red-200 text-red-500 scale-110 shadow-lg shadow-red-100' : 'bg-white border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-400'}`}
                        >
                            <svg className={`w-6 h-6 transition-colors ${wishlistItems[productData._id] ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={handleAddToCart}
                            className='flex-1 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all duration-500 shadow-xl shadow-slate-200 active:scale-[0.98]'
                        >
                            Deploy to Cart
                        </button>
                        <button 
                            onClick={handleBuyNow}
                            className='flex-1 bg-blue-700 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-blue-100 active:scale-[0.98]'
                        >
                            Instant Purchase
                        </button>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-50 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Shipping</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h2m-6 0h2m-6 0H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V12a2 2 0 00-2-2h-2m-6 0V4a2 2 0 012-2h2a2 2 0 012 2v6" />
                            </svg>
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Payments</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Dynamic Information Architecture */}
        <div className='mt-24 space-y-10'>
          
          {/* Tab Navigation */}
          <div className='flex items-center gap-8 border-b border-slate-200 overflow-x-auto pb-px scrollbar-hide'>
            {[
                { id: 'description', label: 'Hardware Overview' },
                { id: 'specs', label: 'Technical Specs' },
                { id: 'reviews', label: 'Expert Reviews' },
                { id: 'shipping', label: 'Logistics & Warranty' }
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-6 text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 relative whitespace-nowrap px-4 ${
                        activeTab === tab.id 
                            ? 'text-blue-700' 
                            : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-700 rounded-full"></div>
                    )}
                </button>
            ))}
          </div>

          <div className='bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white p-8 md:p-12 mb-20'>
            {activeTab === 'description' && (
              <div className='max-w-4xl space-y-8 animate-fade-in'>
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Machine Intelligence & Design</h3>
                    <p className='text-slate-600 leading-relaxed font-medium text-lg'>
                        {productData.description}
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100'>
                    <div className='space-y-3'>
                        <p className='text-blue-600 font-black text-[10px] uppercase tracking-widest'>Performance Profile</p>
                        <p className='text-slate-500 text-sm leading-relaxed'>
                            Optimized for high-end professional scaling with {productData.processor} architecture and {productData.ram} synchronous memory.
                        </p>
                    </div>
                    <div className='space-y-3'>
                        <p className='text-indigo-600 font-black text-[10px] uppercase tracking-widest'>Visual Infrastructure</p>
                        <p className='text-slate-500 text-sm leading-relaxed'>
                            Featuring a premium {productData.displaySize || productData.display} display powered by {productData.graphics || "high-fidelity graphics processing"}.
                        </p>
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className='animate-fade-in'>
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Technical Infrastructure Table</h3>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 shadow-inner'>
                  {[
                    { label: 'Manufacturer', value: productData.brand?.name || productData.brand },
                    { label: 'Hardware Series', value: productData.series || "Official Line" },
                    { label: 'Processor Unit', value: productData.processor },
                    { label: 'Memory (RAM)', value: productData.ram },
                    { label: 'Storage Interface', value: `${productData.storage} ${productData.storageType || "SSD"}` },
                    { label: 'Display Matrix', value: `${productData.displaySize} ${productData.resolution || ""}` },
                    { label: 'Graphics Core', value: productData.graphics },
                    { label: 'Operating System', value: productData.operatingSystem },
                    { label: 'Battery Capacity', value: productData.battery },
                    { label: 'Architecture Weight', value: productData.weight },
                    { label: 'System Color', value: productData.color },
                    { label: 'Warranty Shield', value: productData.warranty },
                    { label: 'Condition Status', value: productData.condition },
                    { label: 'Architecture SKU', value: productData.sku }
                  ].map((spec, i) => (
                    <div key={i} className='bg-white p-8 group hover:bg-slate-50 transition-colors'>
                      <p className='text-[8px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2'>{spec.label}</p>
                      <p className='text-sm font-bold text-slate-800 tracking-tight'>{spec.value || "Configurable"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className='animate-fade-in py-10 text-center space-y-6'>
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-slate-200">
                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Review Matrix Loading</h3>
                <p className='text-slate-400 font-medium max-w-sm mx-auto uppercase text-[10px] tracking-widest'>
                    Currently synchronizing {productData.ratingsCount || 0} expert evaluations and performance logs.
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
                <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black">S</div>
                            <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Shipping Protocol</h4>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            All LaptopZone hardware is dispatched via priority secure transport. Major metro delivery within 48-72 hours. International shipping includes real-time tracking and professional anti-shock packaging.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-black">W</div>
                            <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">System Warranty Shield</h4>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Standard {productData.warranty || "12-Month"} comprehensive hardware coverage. Includes 24/7 technical support and authorized component replacement policy.
                        </p>
                    </div>
                </div>
            )}
          </div>

          {/* -------- Display Related Hardware -------- */}
          <div className='pt-10 border-t border-slate-100'>
            <RelatedProducts 
                category={productData.category} 
                subCategory={productData.subCategory} 
                currentProductId={productData._id}
                brand={productData.brand}
                price={productData.price}
            />
          </div>
        </div>
      </div>
      
      {/* Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
        }
      ` }} />
    </div>
  );
};

export default Product;
