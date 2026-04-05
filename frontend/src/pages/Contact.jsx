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
    // Handle form submission
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
        <Title text1={'GET IN'} text2={'TOUCH'} />
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Connect with our team for any queries or support</p>
      </div>

      <div className='max-w-7xl mx-auto pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Information */}
          <div className='bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-10 border border-blue-50 hover:border-blue-200 transition-all duration-500'>
            <div className="relative group overflow-hidden rounded-[2rem] mb-10 shadow-xl border border-slate-100">
               <img 
                className='w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700' 
                src={assets.contact_img} 
                alt="LaptopZone Headquarters"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
            </div>

            <div className='space-y-10'>
              <div>
                <h3 className='text-2xl font-black text-slate-800 mb-4 uppercase tracking-tighter italic'>Support Center</h3>
                <p className='text-slate-500 font-medium leading-relaxed'>
                  Our dedicated support team is available for all your laptop service, hardware inquiries, and corporate purchase requests.
                </p>
              </div>

              <div className='space-y-6'>
                <div className='flex items-center gap-6 group'>
                  <div className='w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl group-hover:bg-blue-700 transition-colors'>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1'>Our Store</h4>
                    <p className='text-slate-800 font-bold'>845305, Bank Road, Raxaul, Bihar, IN</p>
                  </div>
                </div>

                <div className='flex items-center gap-6 group'>
                  <div className='w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:bg-slate-900 transition-colors'>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1'>Phone Number</h4>
                    <p className='text-slate-800 font-bold'>(+91) 9534311604</p>
                  </div>
                </div>

                <div className='flex items-center gap-6 group'>
                  <div className='w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shadow-xl group-hover:bg-blue-600 transition-colors'>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1'>Email Address</h4>
                    <p className='text-slate-800 font-bold'>support@laptopzoneinfotech.com</p>
                  </div>
                </div>
              </div>

              <div className='pt-10 border-t border-slate-50 relative overflow-hidden group'>
                <h4 className='text-xl font-black text-slate-800 mb-4 uppercase tracking-tighter italic'>Careers</h4>
                <p className='text-[13px] font-medium text-slate-500 mb-8 leading-relaxed'>
                  We are always looking for talented individuals to join our growing team of laptop experts and engineers.
                </p>
                <button className='bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-500'>
                  VIEW OPENINGS
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-10 lg:p-12 border border-blue-50'>
            <h3 className='text-2xl font-black text-slate-800 mb-10 uppercase tracking-tighter italic'>Send us a Message</h3>
            <form onSubmit={handleSubmit} className='space-y-8'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1'>Full Name</label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-700 outline-none transition-all duration-300 font-bold text-slate-800'
                    placeholder='ENTER NAME'
                    required
                  />
                </div>
                <div>
                  <label className='block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1'>Email Address</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-700 outline-none transition-all duration-300 font-bold text-slate-800'
                    placeholder='ENTER EMAIL'
                    required
                  />
                </div>
              </div>
              <div>
                <label className='block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1'>Subject</label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-700 outline-none transition-all duration-300 font-bold text-slate-800'
                  placeholder='ENTER SUBJECT'
                  required
                />
              </div>
              <div>
                <label className='block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1'>How can we help?</label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows='6'
                  className='w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-700 outline-none transition-all duration-300 font-bold text-slate-800 resize-none'
                  placeholder='PLEASE DESCRIBE YOUR REQUIREMENT IN DETAIL...'
                  required
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-3 group'
              >
                SEND MESSAGE
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}

export default Contact
