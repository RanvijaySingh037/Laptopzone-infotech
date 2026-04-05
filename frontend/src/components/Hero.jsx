import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import hero_tech from '../assets/hero_tech.png'

const Hero = () => {
    const navigate = useNavigate();

    const handleShopNow = () => {
        navigate('/collection');
    };

    const handleExploreBrands = () => {
        const element = document.getElementById('shop-by-brand');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/collection');
        }
    };

    return (
        <div className="relative h-[600px] sm:h-[750px] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 group bg-slate-950">
            {/* Background Layer with Parallax & Tech Pattern */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={hero_tech} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[3s] ease-out mix-blend-overlay" 
                    alt="Premium High-Performance Laptop" 
                />
                
                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
                
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 max-w-5xl space-y-6 md:space-y-8">
                
                {/* Hardware Status Badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit backdrop-blur-md animate-fade-in">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <p className="font-black text-[10px] md:text-xs text-blue-400 uppercase tracking-[0.3em]">
                        Live Inventory Status: Active
                    </p>
                </div>

                {/* Main Headline */}
                <div className="space-y-4">
                    <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-black text-white uppercase tracking-tighter italic">
                        Unbeatable<br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Laptop Deals</span>
                    </h1>
                    
                    {/* Specialized Segments Subheading */}
                    <p className="text-slate-400 text-sm md:text-lg lg:text-xl font-medium max-w-xl leading-relaxed">
                        Precision-engineered hardware for <span className="text-white font-bold italic">Gaming</span>, <span className="text-white font-bold italic">Student Life</span>, and <span className="text-white font-bold italic">Enterprise Office</span> environments. Experience the peak of mobile computing performance.
                    </p>
                </div>

                {/* Dual Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 md:pt-6">
                    <button 
                        onClick={handleShopNow}
                        className="w-full sm:w-auto bg-white text-slate-950 px-10 py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white hover:-translate-y-1 transition-all duration-500 shadow-xl shadow-white/5 active:scale-95 group"
                    >
                        <span className="flex items-center gap-3">
                            Shop Now
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                    
                    <button 
                        onClick={handleExploreBrands}
                        className="w-full sm:w-auto bg-slate-900/50 text-white border-2 border-slate-800 px-10 py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-slate-800 hover:border-slate-700 hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm active:scale-95 group"
                    >
                        <span className="flex items-center gap-3">
                            Explore Brands
                            <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                        </span>
                    </button>
                </div>

                {/* Technical Benchmarks Mask */}
                <div className="hidden lg:grid grid-cols-3 gap-12 pt-12 border-t border-white/5 max-w-2xl">
                    <div className="space-y-1">
                        <p className="text-white font-black text-2xl tracking-tighter italic">RTX 40-SERIES</p>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Available Tech</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-white font-black text-2xl tracking-tighter italic">240Hz+</p>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Pro Displays</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-white font-black text-2xl tracking-tighter italic">INTEL I9 / M3</p>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Processing Power</p>
                    </div>
                </div>
            </div>

            {/* Visual Glassmorphic Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none"></div>

            {/* CSS Animation Logic */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            ` }} />
        </div>
    )
}

export default Hero
