import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const ShopByBrand = () => {
    const { brands, navigate } = useContext(ShopContext);

    // Specific brands requested by the user
    const displayBrands = [
        { name: 'HP', desc: 'Enterprise Excellence' },
        { name: 'Dell', desc: 'Precision Performance' },
        { name: 'Lenovo', desc: 'Think Forward' },
        { name: 'ASUS', desc: 'In Search of Incredible' },
        { name: 'Acer', desc: 'Empowering People' },
        { name: 'MSI', desc: 'True Gaming' },
        { name: 'Apple', desc: 'Think Different' }
    ];

    const handleBrandClick = (brandName) => {
        // Find the brand ID from context to ensure the filter works correctly
        const brandObj = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
        const filterVal = brandObj ? brandObj._id : brandName;
        navigate(`/collection?brand=${filterVal}`);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Title text1={"SHOP BY"} text2={"BRAND"} />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mt-4">
                        Elite Computing from Global Technology Leaders
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {displayBrands.map((brand) => (
                        <div 
                            key={brand.name}
                            onClick={() => handleBrandClick(brand.name)}
                            className="group relative flex flex-col items-center justify-center p-8 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer overflow-hidden text-center h-48"
                        >
                            {/* Abstract background elements */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                            
                            <div className="mb-4">
                                <span className="text-3xl font-black text-slate-300 group-hover:text-blue-700 transition-colors duration-500 uppercase tracking-tighter italic">
                                    {brand.name}
                                </span>
                            </div>
                            
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                {brand.desc}
                            </p>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-6 h-1 bg-blue-600 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => navigate('/collection')}
                        className="group flex items-center gap-3 mx-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500"
                    >
                        EXPLORE ALL MANUFACTURERS
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
