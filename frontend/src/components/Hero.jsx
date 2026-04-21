import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

// Asset Imports
import hero_gaming from '../assets/hero_gaming.png'
import hero_student from '../assets/hero_student.png'
import hero_business from '../assets/hero_business.png'

const Hero = () => {
    const navigate = useNavigate();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false }, [Autoplay({ delay: 5000, stopOnInteraction: false })])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

    const slides = [
        {
            image: hero_business,
            badge: "SALES & SUPPORT",
            heading: "Sell Laptops & Mobiles Online Easily 🚀",
            subheading: "Get More Customers on WhatsApp. Your trusted partner for premium hardware and direct support.",
            btn1: "View Products",
            btn2: "Order on WhatsApp",
            isWhatsApp: true
        },
        {
            image: hero_gaming,
            badge: "PRO GAMING GEAR",
            heading: "Powerful Gaming Laptops",
            subheading: "Next-gen RTX performance for competitive gaming and demanding creative workflows.",
            btn1: "Shop Now",
            btn2: "Explore Tech"
        },
        {
            image: hero_student,
            badge: "STUDENT ESSENTIALS",
            heading: "Best Laptops for Higher Study",
            subheading: "Lightweight, long-lasting, and powerful enough to handle every class and project.",
            btn1: "Explore Now",
            btn2: "View Range"
        }
    ]

    return (
        <div className="relative w-full overflow-hidden bg-slate-950 font-['Outfit',sans-serif] group">
            {/* Slider Container */}
            <div className="embla" ref={emblaRef}>
                <div className="embla__container flex">
                    {slides.map((slide, index) => (
                        <div key={index} className="embla__slide relative flex-[0_0_100%] min-w-0 h-[550px] sm:h-[700px] lg:h-[850px]">
                            {/* Background Layer with Ultra-Deep Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={slide.image} 
                                    className="w-full h-full object-cover opacity-90 transition-transform duration-[2s] hover:scale-105" 
                                    alt={slide.heading} 
                                />
                                {/* Clean gradients for text focus */}
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
                                <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply"></div>
                            </div>

                            {/* Content Layer */}
                            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32">
                                <div className={`max-w-4xl space-y-8 md:space-y-16 transition-all duration-1000 transform ${selectedIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                                    
                                    {/* Tech Status Badge - Minimalist Vertical Accent Style */}
                                    <div className="flex items-center gap-6 border-l-2 border-blue-500 pl-6 h-10">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></span>
                                        </span>
                                        <p className="font-bold text-[11px] md:text-sm text-slate-400 uppercase tracking-[0.5em]">
                                            {slide.badge}
                                        </p>
                                    </div>

                                    {/* Main Headline - Outfit Font & Natural Wrapping */}
                                    <h2 className="text-4xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] leading-[1.05] md:leading-[0.95] font-black text-white uppercase tracking-tight max-w-[15ch] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                                        {slide.heading}
                                        <span className="block h-1 w-24 bg-blue-500 mt-6 md:mt-10 rounded-full"></span>
                                    </h2>

                                    {/* Descriptive Subheading */}
                                    <p className="text-slate-300 text-base md:text-xl lg:text-2xl font-medium max-w-lg md:max-w-xl leading-relaxed opacity-85 mt-2">
                                        {slide.subheading}
                                    </p>

                                    {/* Action CTAs */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 md:pt-8">
                                        <button 
                                            onClick={() => navigate('/collection')}
                                            className="w-full sm:w-auto bg-white text-slate-950 px-14 py-5 rounded-xl font-black text-xs md:text-sm uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transform hover:-translate-y-1.5 transition-all duration-500 shadow-2xl active:scale-95 group"
                                        >
                                            <span className="flex items-center gap-4">
                                                {slide.btn1}
                                                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </button>
                                        
                                        <button 
                                            onClick={() => slide.isWhatsApp ? window.open('https://wa.me/916299745525?text=Hi, I want to know more about your services.', '_blank') : navigate('/collection')}
                                            className="w-full sm:w-auto bg-transparent text-white border-2 border-white/10 px-14 py-5 rounded-xl font-black text-xs md:text-sm uppercase tracking-[0.3em] hover:border-blue-500/50 hover:bg-blue-500/5 transform hover:-translate-y-1.5 transition-all duration-500 backdrop-blur-md active:scale-95 group"
                                        >
                                            <span className="flex items-center gap-4">
                                                {slide.btn2}
                                                {slide.isWhatsApp ? (
                                                    <svg className="w-5 h-5 text-green-500 group-hover:scale-120 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                                    </svg>
                                                ) : (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform duration-500 shadow-[0_0_12px_rgba(59,130,246,0.7)]"></div>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Aesthetic Control: Sleek Progress Bars */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`group relative h-1 transition-all duration-700 ${
                            selectedIndex === index ? 'w-24 bg-blue-500' : 'w-12 bg-white/10 hover:bg-white/30'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <span className={`absolute -top-2 left-0 h-[3px] bg-white transition-all duration-[5000ms] ease-linear ${selectedIndex === index ? 'w-full' : 'w-0 opacity-0'}`}></span>
                    </button>
                ))}
            </div>

            {/* Immersive Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-slate-950/70 to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-slate-950/70 to-transparent pointer-events-none z-10"></div>

            <style dangerouslySetInnerHTML={{ __html: `
                .embla {
                    overflow: hidden;
                    height: 100%;
                }
                .embla__container {
                    display: flex;
                    height: 100%;
                }
                .embla__slide {
                    flex: 0 0 100%;
                    min-w: 0;
                    height: 100%;
                }
            ` }} />
        </div>
    )
}

export default Hero
