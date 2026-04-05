import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const BudgetRange = () => {
    const { navigate } = useContext(ShopContext);

    const priceTiers = [
        {
            label: "Value Tier",
            range: "Under ₹40,000",
            description: "Essential performance for everyday tasks and students.",
            icon: (
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            priceMax: 40000
        },
        {
            label: "Mid-Range Elite",
            range: "₹40,000 - ₹80,000",
            description: "Solid performance with dedicated graphics and high-res screens.",
            icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            priceMin: 40000,
            priceMax: 80000
        },
        {
            label: "Premium Ultra",
            range: "Above ₹80,000",
            description: "Flagship processors, 4K OLED displays, and ultra-high FPS gaming.",
            icon: (
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            priceMin: 80000
        }
    ];

    const handleTierClick = (tier) => {
        // Logic for price filtering can go here, but for now we'll just navigate to collection
        navigate(`/collection?priceMax=${tier.priceMax || ''}&priceMin=${tier.priceMin || ''}`);
    };

    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Budget-Optimized Solutions</h2>
                        <p className="text-slate-500 font-medium text-lg italic mt-1">High performance at every price point.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {priceTiers.map((tier, index) => (
                        <div 
                            key={index}
                            onClick={() => handleTierClick(tier)}
                            className="group relative p-10 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-blue-400 hover:bg-gradient-to-br hover:from-slate-50 hover:to-blue-50/40 transition-all duration-500 cursor-pointer shadow-md hover:shadow-2xl active:scale-95 flex flex-col items-center text-center space-y-6"
                        >
                            {/* Icon Wrapper */}
                            <div className="p-6 bg-white rounded-3xl shadow-lg border border-slate-50 group-hover:bg-blue-600 transition-colors duration-500">
                                {React.cloneElement(tier.icon, { className: "w-10 h-10 group-hover:text-white transition-colors duration-500" })}
                            </div>

                            <div className="space-y-2">
                                <p className="text-slate-400 font-black text-xs uppercase tracking-widest">{tier.label}</p>
                                <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter">{tier.range}</h3>
                            </div>

                            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">{tier.description}</p>

                            <div className="pt-4 flex items-center justify-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                                <span>Browse Models</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BudgetRange;
