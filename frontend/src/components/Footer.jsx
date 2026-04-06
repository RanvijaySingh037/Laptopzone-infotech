import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className='bg-[#020617] text-white border-t border-white/5 font-sans'>
      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16'>
        {/* Main Footer Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-8 xl:gap-x-12'>
          
          {/* Section 1: Brand Block */}
          <div className='lg:col-span-2 xl:col-span-1 space-y-6'>
            <Link to="/" className='block'>
                <img src={assets.logo} className='w-40 filter brightness-110 mb-2' alt="LaptopZone Infotech Logo" />
            </Link>
            <p className='text-slate-400 leading-relaxed text-xs font-medium max-w-xs'>
              Trusted destination for premium laptops and reliable tech solutions. Explore gaming, business, and student laptops at great prices.
            </p>
            <div className='flex space-x-3 pt-2'>
              {[
                { name: 'Facebook', icon: <FaFacebookF className='w-3.5 h-3.5' /> },
                { name: 'Instagram', icon: <FaInstagram className='w-3.5 h-3.5' /> },
                { name: 'Twitter', icon: <FaXTwitter className='w-3.5 h-3.5' /> },
                { name: 'LinkedIn', icon: <FaLinkedinIn className='w-3.5 h-3.5' /> }
              ].map((platform) => (
                <a key={platform.name} href="#" className='w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300' aria-label={platform.name}>
                   <div className='text-slate-400 hover:text-white transition-colors'>
                     {platform.icon}
                   </div>
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Company Links */}
          <div className='space-y-6'>
            <h3 className='text-[10px] font-black uppercase tracking-[0.25em] text-blue-500'>Shop Our Gear</h3>
            <ul className='space-y-3'>
              {[
                { name: 'Shop All Laptops', path: '/collection' },
                { name: 'About Us', path: '/about' },
                { name: 'Business Solutions', path: '/support' }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className='text-slate-400 hover:text-white transition-all duration-200 text-xs font-bold hover:translate-x-1 inline-block'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Help & Support */}
          <div className='space-y-6'>
            <h3 className='text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400'>Client Support</h3>
            <ul className='space-y-3'>
              {[
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Customer Support', path: '/support' }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className='text-slate-400 hover:text-white transition-all duration-200 text-xs font-bold hover:translate-x-1 inline-block'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Policies */}
          <div className='space-y-6'>
            <h3 className='text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400'>Legal Protocol</h3>
            <ul className='space-y-3'>
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms' },
                { name: 'Refund & Return', path: '/refund-policy' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Cancellation Policy', path: '/cancellation-policy' }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className='text-slate-400 hover:text-white transition-all duration-200 text-xs font-bold hover:translate-x-1 inline-block'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5: Contact Info */}
          <div className='space-y-6'>
            <h3 className='text-[10px] font-black uppercase tracking-[0.25em] text-slate-500'>Direct Contact</h3>
            <div className='space-y-4'>
                <div className='flex items-center gap-3 group'>
                    <div className='w-7 h-7 bg-white/5 rounded-md flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all'>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <span className='text-xs font-black text-slate-300'>+91 9534311604</span>
                </div>
                <div className='flex items-center gap-3 group'>
                    <div className='w-7 h-7 bg-white/5 rounded-md flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-500/10 transition-all'>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <span className='text-xs font-black text-slate-300'>support@laptopzoneinfotech.com</span>
                </div>
                <div className='flex items-center gap-3 group'>
                    <div className='w-7 h-7 bg-white/5 rounded-md flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all'>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    </div>
                    <span className='text-xs font-black text-slate-300'>Gopalganj, Bihar</span>
                </div>
                <div className='pt-2'>
                    <span className='text-[9px] font-black text-slate-600 uppercase tracking-widest bg-white/5 px-2.5 py-1.5 rounded-md border border-white/5'>
                        Mon–Sat, 10 AM–7 PM
                    </span>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className='border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6'>
          <p className='text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]'>
            © 2026 LaptopZone Infotech. All rights reserved.
          </p>
          <div className='flex space-x-8'>
            <Link to="/compliance" className='text-slate-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors duration-200'>Compliance</Link>
            <Link to="/security" className='text-slate-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors duration-200'>Security</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
