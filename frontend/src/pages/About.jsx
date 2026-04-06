import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20'>
      <div className="max-w-7xl mx-auto">
        {/* Section 1: Who We Are */}
        <div className='text-center mb-16'>
          <Title text1={'ABOUT'} text2={'LAPTOPZONE'} />
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">India's Premier Destination for High-Performance Computing</p>
        </div>

        <div className='bg-white rounded-[3rem] shadow-2xl shadow-blue-100/50 p-10 lg:p-20 mb-20 border border-blue-50 relative overflow-hidden group'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10'>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <img 
                className='w-full h-[500px] object-cover rounded-[2rem] shadow-2xl relative z-10 border border-white' 
                src={assets.about_img} 
                alt="Professional Tech Workspace - LaptopZone" 
              />
            </div>
            <div className='space-y-8'>
              <div>
                <h3 className='text-3xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>Who We Are</h3>
                <p className='text-slate-500 font-medium leading-relaxed mb-4'>
                  LaptopZone Infotech is India's premier destination for high-performance computing solutions. Founded with a vision to simplify the laptop buying experience, we have evolved from a specialized hardware hub into a national trusted partner for professionals, students, and enterprises across the country.
                </p>
                <p className='text-slate-500 font-medium leading-relaxed'>
                  Our team consists of certified hardware experts and tech advisors who believe that a laptop isn't just a machine—it's the engine for your career, education, and creative breakthrough.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: What We Sell */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20'>
          <div className='bg-slate-950 text-white rounded-[3rem] p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-slate-900/50'>
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
             <h3 className='text-3xl font-black mb-8 uppercase tracking-tighter italic relative z-10'>What We Sell</h3>
             <div className='space-y-6 relative z-10'>
                <div className='flex gap-4'>
                   <div className='w-1 bg-blue-600 rounded-full'></div>
                   <p className='text-slate-300 font-medium'><strong className='text-white'>Business & Productivity:</strong> Premium Ultrabooks and workstations from Apple, Dell, and HP designed for the modern professional.</p>
                </div>
                <div className='flex gap-4'>
                   <div className='w-1 bg-indigo-600 rounded-full'></div>
                   <p className='text-slate-300 font-medium'><strong className='text-white'>Gaming Powerhouses:</strong> High-FPS machines from ASUS ROG, MSI, and Acer Predator featuring the latest RTX graphics.</p>
                </div>
                <div className='flex gap-4'>
                   <div className='w-1 bg-emerald-600 rounded-full'></div>
                   <p className='text-slate-300 font-medium'><strong className='text-white'>Student Essentials:</strong> Reliable, long-battery-life laptops that balance performance and affordability for your academic journey.</p>
                </div>
             </div>
          </div>

          <div className='bg-white rounded-[3rem] p-12 lg:p-16 border border-slate-100 shadow-xl flex flex-col justify-center'>
             <h3 className='text-3xl font-black text-slate-800 mb-8 uppercase tracking-tighter italic'>Our Inventory</h3>
             <p className='text-slate-500 font-medium leading-relaxed mb-6'>
                We maintain direct partnerships with global manufacturers to ensure our customers get the latest models as soon as they launch. Every device in our catalog is <span className='text-blue-700 font-bold'>100% genuine</span> with official manufacturer warranty.
             </p>
             <div className='flex flex-wrap gap-3'>
                {['Apple', 'Dell', 'HP', 'ASUS', 'Lenovo', 'MSI', 'Acer'].map(brand => (
                  <span key={brand} className='px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100'>{brand}</span>
                ))}
             </div>
          </div>
        </div>

        {/* Section 3: Why Choose Us */}
        <div className='text-center mb-16'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">The LaptopZone Infotech Advantage</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
          {[
            {
              title: 'Rigorous Quality Checks',
              desc: 'Every laptop undergoes a 25-point hardware and software inspection to ensure it reaches you in peak condition.',
              icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ),
              color: 'bg-blue-600'
            },
            {
              title: 'Fast Delivery across India',
              desc: 'Secure, insured shipping to over 20,000+ pincodes across India with express delivery in major cities.',
              icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              ),
              color: 'bg-indigo-600'
            },
            {
              title: 'Expert Support',
              desc: 'Dedicated technical advisors available 6 days a week to help with setup, software, or hardware queries.',
              icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656L18.364 18.364m-5.656 0l-3.536-3.536m0-5.656L5.636 5.636m12.728 12.728L5.636 5.636m12.728 0L5.636 18.364" /></svg>
              ),
              color: 'bg-slate-900'
            }
          ].map((item, index) => (
            <div key={index} className='bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 group hover:bg-slate-50 transition-all duration-300'>
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h4 className='text-lg font-black text-slate-800 mb-4 uppercase tracking-tighter italic'>{item.title}</h4>
              <p className='text-sm text-slate-500 font-medium leading-relaxed'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Newsletter/>
    </div>
  )
}

export default About
