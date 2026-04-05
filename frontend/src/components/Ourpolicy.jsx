import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "Hassle-free hardware exchange and secure data handling for your peace of mind.",
      gradient: "from-slate-800 to-slate-900"
    },
    {
      icon: assets.quality_icon,
      title: "Premium Warranty",
      description: "Comprehensive 12-month domestic warranty coverage on all high-end laptops.",
      gradient: "from-blue-700 to-blue-800"
    },
    {
      icon: assets.support_img,
      title: "Expert Support",
      description: "Dedicated access to our technical experts for all your hardware queries.",
      gradient: "from-slate-700 to-blue-900"
    }
  ];

  return (
    <div className='bg-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className='max-w-6xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-20'>
          <h2 className='text-3xl sm:text-4xl font-black text-slate-800 mb-4 uppercase tracking-tighter italic'>
            OUR COMMITMENT
          </h2>
          <p className='text-sm sm:text-base font-bold text-slate-400 uppercase tracking-[0.2em] max-w-2xl mx-auto'>
            Built for reliability, backed by India's premier service standards
          </p>
        </div>

        {/* Policies Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
          {policies.map((policy, index) => (
            <div 
              key={index}
              className='group bg-slate-50 rounded-[2.5rem] p-10 text-center hover:bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 border border-slate-100/50 hover:border-blue-100'
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Icon Container */}
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${policy.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <img 
                  src={policy.icon} 
                  className='w-10 h-10 filter brightness-0 invert' 
                  alt={policy.title} 
                />
              </div>

              {/* Content */}
              <h3 className='text-lg font-black text-slate-800 mb-4 uppercase tracking-tight italic group-hover:text-blue-700 transition-colors duration-300'>
                {policy.title}
              </h3>
              <p className='text-[13px] font-medium text-slate-500 leading-relaxed group-hover:text-slate-600 px-2'>
                {policy.description}
              </p>

              {/* Decorative Line */}
              <div className={`w-16 h-1 bg-gradient-to-r ${policy.gradient} mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='text-center mt-20 pt-10 border-t border-slate-50'>
          <p className='text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-8'>
            Require any specialized technical assistance or consultation?
          </p>
          <button className='bg-slate-900 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500 group flex items-center justify-center gap-3 mx-auto'>
            CONTACT SUPPORT
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Ourpolicy
