import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import gaming_cat from '../assets/gaming_cat.png';
import business_cat from '../assets/business_cat.png';
import creator_cat from '../assets/creator_cat.png';

const ShopByUseCase = () => {
    const { navigate } = useContext(ShopContext);

    const useCases = [
        {
            title: "Gaming Laptops",
            description: "High FPS, obsidian builds, and liquid-cooled performance for elite gaming.",
            image: gaming_cat,
            path: "/collection?category=Gaming Laptops"
        },
        {
            title: "Business Laptops",
            description: "Secure, lightweight, and engineered for the modern executive.",
            image: business_cat,
            path: "/collection?category=Business Laptops"
        },
        {
            title: "Creator Series",
            description: "Precision displays and high-core counts for visual architects and designers.",
            image: creator_cat,
            path: "/collection?category=Creator Laptops"
        }
    ];

    return (
        <div className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Engineered for Your Workflow</h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto mt-2 text-lg">Select your specialized hardware profile to begin.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {useCases.map((useCase, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(useCase.path)}
                            className="group relative h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200"
                        >
                            {/* Image Background */}
                            <img 
                                src={useCase.image} 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                alt={useCase.title} 
                            />
                            
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent group-hover:bg-blue-900/40 transition-colors duration-500"></div>
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-end space-y-4">
                                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{useCase.title}</h3>
                                <p className="text-slate-200 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 transition-transform">
                                    {useCase.description}
                                </p>
                                
                                <div className="pt-4 flex items-center gap-3 text-blue-400 font-black text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                                    <span>Explore Range</span>
                                    <div className="w-8 h-[2px] bg-blue-400 rounded-full group-hover:w-12 group-hover:bg-white transition-all duration-300"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopByUseCase;
