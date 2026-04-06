import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const ShopByBrand = () => {
    const { brands, navigate } = useContext(ShopContext);

    // Specific brands requested by the user
    const displayBrands = [
        { name: 'Apple', desc: 'Think Different', domain: 'apple.com' },
        { name: 'HP', desc: 'Enterprise Excellence', domain: 'hp.com' },
        { name: 'Dell', desc: 'Precision Performance', domain: 'dell.com' },
        { name: 'Lenovo', desc: 'Think Forward', domain: 'lenovo.com' },
        { name: 'ASUS', desc: 'In Search of Incredible', domain: 'asus.com' },
        { name: 'Acer', desc: 'Empowering People', domain: 'acer.com' },
        { name: 'MSI', desc: 'True Gaming', domain: 'msi.com' }
    ];

    const handleBrandClick = (brandName) => {
        // Find the brand ID from context to ensure the filter works correctly
        const brandObj = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
        const filterVal = brandObj ? brandObj._id : brandName;
        navigate(`/collection?brand=${filterVal}`);
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <Title text1={"SHOP BY"} text2={"BRAND"} />
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] mt-4">
                        Authorized Global Hardware Partners
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                    {displayBrands.map((brand) => (
                        <div 
                            key={brand.name}
                            onClick={() => handleBrandClick(brand.name)}
                            className="group relative flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 hover:border-blue-400/30 hover:bg-white hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] transition-all duration-700 cursor-pointer overflow-hidden h-56"
                        >
                            {/* Abstract Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            
                            <div className="relative z-10 w-full flex flex-col items-center">
                                <div className="h-20 flex items-center justify-center mb-6 w-full">
                                    <img 
                                        src={`https://logo.clearbit.com/${brand.domain}`} 
                                        alt={brand.name} 
                                        className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    {/* Fallback Text if logo fails to load */}
                                    <span className="hidden text-2xl font-black text-slate-300 group-hover:text-blue-700 transition-colors uppercase italic italic tracking-tighter">
                                        {brand.name}
                                    </span>
                                </div>
                                
                                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                    {brand.name}
                                </h4>
                                <p className="text-[8px] font-black text-blue-600/60 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    {brand.desc}
                                </p>
                            </div>

                            {/* Minimal Decorative Bottom Accent */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600/20 rounded-full group-hover:w-12 group-hover:bg-blue-600 transition-all duration-700"></div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => navigate('/collection')}
                        className="group flex items-center gap-3 mx-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500"
                    >
                        EXPLORE ALL BRANDS
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ShopByBrand;
