import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className='bg-slate-950 text-white border-t border-white/5 font-sans'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12'>
          
          {/* Section 1: Company Info */}
          <div className='lg:col-span-2 space-y-8'>
            <div className='flex items-center gap-3'>
                <img src={assets.logo} className='w-48 filter brightness-110' alt="LaptopZone Infotech Logo" />
            </div>
            <p className='text-slate-400 leading-relaxed max-w-md text-sm font-medium'>
              India's trusted destination for laptops and tech solutions. Explore gaming, business, and student laptops at the best prices.
            </p>
            <div className='flex space-x-4 pt-2'>
              {[
                { name: 'Facebook', icon: <FaFacebookF className='w-4 h-4' /> },
                { name: 'Instagram', icon: <FaInstagram className='w-4 h-4' /> },
                { name: 'Twitter', icon: <FaXTwitter className='w-4 h-4' /> },
                { name: 'LinkedIn', icon: <FaLinkedinIn className='w-4 h-4' /> }
              ].map((platform) => (
                <a key={platform.name} href="#" className='w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 group' aria-label={platform.name}>
                   <div className='text-slate-400 group-hover:text-white transition-colors flex items-center justify-center'>
                     {platform.icon}
                   </div>
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Company */}
          <div>
            <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8'>Company</h3>
            <ul className='space-y-4'>
              {[
                { name: 'Shop All Laptops', path: '/collection' },
                { name: 'About Us', path: '/about' },
                { name: 'Business Solutions', path: '/support' }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className='text-slate-400 hover:text-white transition-colors duration-200 text-sm font-bold flex items-center gap-2 group'>
                    <div className='w-0 h-[2px] bg-blue-600 group-hover:w-3 transition-all duration-300'></div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Help & Support */}
          <div>
            <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-8'>Help & Support</h3>
            <ul className='space-y-4'>
              {[
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Customer Support', path: '/support' }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className='text-slate-400 hover:text-white transition-colors duration-200 text-sm font-bold flex items-center gap-2 group'>
                    <div className='w-0 h-[2px] bg-indigo-500 group-hover:w-3 transition-all duration-300'></div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Policies */}
          <div>
            <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-8'>Policies</h3>
            <ul className='space-y-4'>
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms' },
                { name: 'Refund & Return', path: '/refund-policy' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Cancellation', path: '/cancellation-policy' }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className='text-slate-400 hover:text-white transition-colors duration-200 text-xs font-bold flex items-center gap-2 group'>
                    <div className='w-0 h-[2px] bg-emerald-500 group-hover:w-3 transition-all duration-300'></div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 5: Contact Info & Support Grid */}
        <div className='mt-20 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8'>
           <div className='flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/[0.08] transition-all'>
              <div className='w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform'>
                 <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div className='space-y-1'>
                 <p className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>Call Us</p>
                 <p className='text-white font-black text-lg tracking-tight'>+91 9534311604</p>
                 <p className='text-[10px] text-slate-400 font-medium'>Mon–Sat, 10 AM–7 PM</p>
              </div>
           </div>

           <div className='flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/[0.08] transition-all'>
              <div className='w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform'>
                 <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className='space-y-1'>
                 <p className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>Email Us</p>
                 <p className='text-white font-black text-lg tracking-tight'>support@laptopzone.com</p>
                 <p className='text-[10px] text-slate-400 font-medium'>24/7 Priority Tickets Available</p>
              </div>
           </div>

           <div className='flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/[0.08] transition-all'>
              <div className='w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform'>
                 <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div className='space-y-1'>
                 <p className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>Location</p>
                 <p className='text-white font-black text-lg tracking-tight'>Gopalganj, Bihar</p>
                 <p className='text-[10px] text-slate-400 font-medium'>Warehouse & Service Center</p>
              </div>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]'>
            © 2026 LaptopZone Infotech. All rights reserved.
          </p>
          <div className='flex space-x-8'>
            <Link to="/terms" className='text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors duration-200'>Compliance</Link>
            <Link to="/privacy-policy" className='text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors duration-200'>Security</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
