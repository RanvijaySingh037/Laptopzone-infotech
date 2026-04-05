import React, { useState } from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'
import { assets } from '../assets/assets'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20'>
      {/* Contact Us Section */}
      <div className='text-center mb-16'>
        <Title text1={'CONTACT'} text2={'US'} />
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Connect with our team for any queries or support</p>
      </div>

      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20'>
          {/* Contact Information */}
          <div className='space-y-8'>
            <div className='bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100'>
              <h3 className='text-2xl font-black text-slate-800 mb-8 uppercase tracking-tighter italic'>Contact Information</h3>
              
              <div className='space-y-8'>
                <div className='flex items-start gap-6 group'>
                  <div className='w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform'>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1'>Call Us</h4>
                    <p className='text-slate-900 font-black text-xl tracking-tight'>+91 9534311604</p>
                    <p className='text-xs text-slate-500 font-medium'>Available Mon-Sat, 10 AM - 7 PM</p>
                  </div>
                </div>

                <div className='flex items-start gap-6 group'>
                  <div className='w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform'>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1'>Email Us</h4>
                    <p className='text-slate-900 font-black text-xl tracking-tight'>support@laptopzone.com</p>
                    <p className='text-xs text-slate-500 font-medium'>Express tickets resolved within 24 hours</p>
                  </div>
                </div>

                <div className='flex items-start gap-6 group'>
                  <div className='w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform'>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1'>Our Store</h4>
                    <p className='text-slate-900 font-black text-xl tracking-tight'>New Delhi, India</p>
                    <p className='text-xs text-slate-500 font-medium'>Main Branch & Tech Hub</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden'>
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
               <h4 className='text-lg font-black uppercase tracking-tighter italic mb-4'>Corporate Inquiries</h4>
               <p className='text-slate-400 text-sm font-medium leading-relaxed mb-6'>Looking for bulk hardware procurement for your business or startup? Connect with our enterprise sales head for customized pricing.</p>
               <p className='text-blue-500 font-black tracking-widest uppercase text-[10px]'>enterprise@laptopzone.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-white rounded-[2.5rem] shadow-xl p-10 lg:p-12 border border-slate-100'>
            <h3 className='text-2xl font-black text-slate-800 mb-10 uppercase tracking-tighter italic'>Inquiry Form</h3>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3'>Full Name</label>
                  <input
                    type='text' name='name' value={formData.name} onChange={handleChange}
                    className='w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold text-slate-800'
                    placeholder='John Doe' required
                  />
                </div>
                <div>
                  <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3'>Email</label>
                  <input
                    type='email' name='email' value={formData.email} onChange={handleChange}
                    className='w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold text-slate-800'
                    placeholder='john@example.com' required
                  />
                </div>
              </div>
              <div>
                <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3'>Subject</label>
                <input
                  type='text' name='subject' value={formData.subject} onChange={handleChange}
                  className='w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold text-slate-800'
                  placeholder='Order Status / Product Inquiry' required
                />
              </div>
              <div>
                <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3'>Message</label>
                <textarea
                  name='message' value={formData.message} onChange={handleChange} rows='5'
                  className='w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-bold text-slate-800 resize-none'
                  placeholder='How can we help you today?' required
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-700 hover:shadow-blue-200 transition-all flex items-center justify-center gap-3 group'
              >
                Send Message
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  )
}

export default Contact
