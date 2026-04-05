import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-slate-950 text-white border-t border-white/5'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          {/* Company Info */}
          <div className='lg:col-span-2 space-y-8'>
            <div className='flex items-center gap-3'>
                <img src={assets.logo} className='w-48 filter brightness-0 invert' alt="LaptopZone Infotech Logo" />
            </div>
            <p className='text-slate-400 leading-relaxed max-w-md text-sm font-medium'>
              Providing top-quality technology solutions across India. LaptopZone Infotech is your trusted destination for premium laptops and professional workstations.
            </p>
            <div className='flex space-x-4'>
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                <a key={platform} href="#" className='w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 group'>
                   <span className='sr-only'>{platform}</span>
                   <div className='w-5 h-5 bg-slate-400 group-hover:bg-white transition-colors uppercase text-[10px] flex items-center justify-center font-bold'>{platform[0]}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className='text-sm font-black uppercase tracking-widest text-blue-500 mb-8'>Company</h3>
            <ul className='space-y-4'>
              {['Our Collection', 'About Us', 'Technical Support', 'Business Solutions', 'Privacy Policy'].map((item, index) => (
                <li key={index}>
                  <a href="#" className='text-slate-400 hover:text-white transition-colors duration-200 text-sm font-semibold flex items-center gap-2 group'>
                    <div className='w-0 h-[2px] bg-blue-600 group-hover:w-4 transition-all duration-300'></div>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-sm font-black uppercase tracking-widest text-blue-500 mb-8'>Help & Support</h3>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10'>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className='text-xs text-slate-500 font-bold uppercase mb-1'>Call Us</p>
                  <p className='text-white font-bold tracking-tight'>+91 9534311604</p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10'>
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className='text-xs text-slate-500 font-bold uppercase mb-1'>Email Us</p>
                  <p className='text-white font-bold tracking-tight'>support@laptopzoneinfotech.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-slate-500 text-xs font-bold uppercase tracking-widest'>
            © 2024 LaptopZone Infotech® - India's Premier Laptop Store.
          </p>
          <div className='flex space-x-8'>
            <a href="#" className='text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors duration-200'>Terms & Conditions</a>
            <a href="#" className='text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors duration-200'>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
