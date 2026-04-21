import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Ourpolicy from '../components/Ourpolicy'
import Newsletter from '../components/Newsletter'
import ShopByBrand from '../components/ShopByBrand'
import ShopByUseCase from '../components/ShopByUseCase'
import BudgetRange from '../components/BudgetRange'
import SEO from '../components/SEO'
import TrustSection from '../components/TrustSection'
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa'

const Home = () => {
  return (
    <div className='bg-white min-h-screen'>
      <SEO 
        title="Official Hardware Hub" 
        description="Acquire top-tier business, gaming, and student laptops at LaptopZone Infotech. Authorized dealer for HP, Dell, Apple, and ASUS hardware."
        keywords="high performance laptops, gaming pc, workstation, macbook, rtx 4090 laptop, business elitebook"
      />
      <div className='space-y-0'>
        {/* Full-width Hero Slider */}
        <Hero />
        
        {/* Boxed Content Sections */}
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] space-y-0'>
          <ShopByBrand />
          <ShopByUseCase />
          <LatestCollection />
          <BestSeller />
          <BudgetRange />
        </div>

        {/* New Trust Section */}
        <TrustSection />

        {/* Combined Contact & Local Support Section */}
        <div className='bg-slate-900 py-24 text-white relative overflow-hidden'>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">Visit Our Store or <span className="text-blue-500">Order Online</span></h2>
                            <p className="text-slate-400 font-medium text-lg lg:max-w-md">We provide premium hardware solutions with local physical support in Bihar. Your tech partner, just a call away.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-4 hover:bg-white/10 transition-all">
                                <FaPhoneAlt className="text-blue-500 text-3xl" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Expert</p>
                                    <p className="text-lg font-black tracking-tight">+91 62997 45525</p>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-4 hover:bg-white/10 transition-all">
                                <FaWhatsapp className="text-green-500 text-3xl" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Chat on WhatsApp</p>
                                    <p className="text-lg font-black tracking-tight">+91 99557 48826</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white text-slate-900 p-10 lg:p-14 rounded-[4rem] shadow-2xl space-y-10 relative">
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center -rotate-12 shadow-xl shadow-blue-200">
                             <FaMapMarkerAlt className="text-3xl text-white" />
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black uppercase tracking-tighter italic">Our Tech Hub</h3>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <FaMapMarkerAlt className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Physical Location</p>
                                        <p className="font-bold text-lg leading-tight uppercase">Babubarhi, Hospital Road, Near Registry Office, Madhubani, Bihar - 847224</p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-slate-100">
                                    <button 
                                        onClick={() => window.open('https://wa.me/916299745525', '_blank')}
                                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                                    >
                                        Get Directions on WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Policy & Newsletter Section */}
        <div className="bg-slate-50 mt-20">
          <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-t border-slate-100'>
            <Ourpolicy />
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
