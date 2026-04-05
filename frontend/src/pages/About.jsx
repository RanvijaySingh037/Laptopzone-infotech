import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20'>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <Title text1={'OUR'} text2={'STORY'} />
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Discover the vision and journey of LaptopZone Infotech</p>
        </div>

        {/* About Content */}
        <div className='bg-white rounded-[3rem] shadow-2xl shadow-blue-100/50 p-10 lg:p-20 mb-20 border border-blue-50 relative overflow-hidden group'>
           {/* Background decorative element */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
           
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10'>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-slate-900 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <img 
                className='w-full h-[500px] object-cover rounded-[2rem] shadow-2xl relative z-10 border border-white' 
                src={assets.about_img} 
                alt="LaptopZone Laboratory" 
              />
            </div>
            <div className='space-y-8'>
              <div>
                <h3 className='text-3xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>Our Journey</h3>
                <p className='text-slate-500 font-medium leading-relaxed mb-4'>
                  LaptopZone Infotech was established with a focus on hardware excellence and a vision to provide the best technology experience to our customers. Our journey began with a specialized service center and a clear objective: to create a trusted destination for individuals and businesses to find the perfect laptop.
                </p>
                <p className='text-slate-500 font-medium leading-relaxed'>
                  We go beyond just selling products; we provide carefully selected technology solutions. Every laptop in our collection undergoes a thorough multi-point quality check before it is dispatched, ensuring it is ready for your important work from day one.
                </p>
              </div>
              
              <div className="pt-8 border-t border-slate-100">
                <h4 className='text-xl font-black text-slate-800 mb-4 uppercase tracking-tight italic'>Our Mission</h4>
                <p className='text-slate-500 font-medium leading-relaxed'>
                  Our mission is to support your digital goals by providing high-quality computing hardware. We are dedicated to professional service, fair pricing, and reliable technical support for all our valued customers across India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className='text-center mb-16'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Experience the LaptopZone Infotech difference</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
          {[
            {
              title: 'Quality Assurance',
              description: 'Meticulous 50-point quality checks ensure every component meets our high standards before it reaches you.',
              icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              color: 'bg-slate-900'
            },
            {
              title: 'Reliable Delivery',
              description: 'Our efficient logistics partners and secure packaging ensure your laptop arrives safely and on time.',
              icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              color: 'bg-blue-700'
            },
            {
              title: 'Exceptional Support',
              description: 'Direct access to our friendly technical support team for any assistance or hardware optimization you may need.',
              icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
              color: 'bg-slate-800'
            }
          ].map((item, index) => (
            <div 
              key={index}
              className='bg-white rounded-[2rem] p-10 shadow-2xl shadow-blue-100/50 hover:bg-slate-50 transition-all duration-500 border border-blue-50 text-center group'
            >
              <div className={`w-20 h-20 mx-auto mb-8 rounded-2xl ${item.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className='text-lg font-black text-slate-800 mb-4 uppercase tracking-tight italic'>{item.title}</h3>
              <p className='text-[13px] font-medium text-slate-500 leading-relaxed'>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='bg-slate-900 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-900/40 relative overflow-hidden'>
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#1e293b_0%,transparent_50%)]"></div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10'>
            {[
              { number: '12K+', label: 'Happy Customers' },
              { number: '850+', label: 'Laptop Models' },
              { number: '24/7', label: 'Support Available' },
              { number: '99.9%', label: 'Product Reliability' }
            ].map((stat, index) => (
              <div key={index} className='space-y-3'>
                <div className='text-4xl font-black text-blue-500 italic tracking-tighter'>{stat.number}</div>
                <div className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Newsletter/>
    </div>
  )
}

export default About
