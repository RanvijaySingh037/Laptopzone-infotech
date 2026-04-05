import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'
import { Link } from 'react-router-dom'

const CustomerSupport = () => {
    const supportSections = [
        {
            title: "Order Tracking",
            desc: "Track your high-performance hardware from our warehouse to your doorstep in real-time.",
            link: "/orders",
            label: "TRACK ORDER",
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            )
        },
        {
            title: "Technical Assistance",
            desc: "Stuck with driver updates or OS activation? Our expert engineers are here to help you remotely.",
            link: "/contact",
            label: "GET HELP",
            icon: (
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            )
        },
        {
            title: "Hardware Warranty",
            desc: "Information about manufacturer warranty coverage and how to claim it at authorized centers.",
            link: "/refund-policy",
            label: "POLICY INFO",
            icon: (
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            )
        }
    ];

    return (
        <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16'>
                    <Title text1={'CUSTOMER'} text2={'SUPPORT'} />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Dedicated Technical Assistance Portal</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
                    {supportSections.map((section, index) => (
                        <div key={index} className='bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 group hover:border-blue-600 transition-colors'>
                            <div className='w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform'>
                                {section.icon}
                            </div>
                            <h3 className='text-xl font-black text-slate-800 mb-4 uppercase tracking-tighter italic'>{section.title}</h3>
                            <p className='text-sm text-slate-500 font-medium leading-relaxed mb-8'>{section.desc}</p>
                            <Link to={section.link} className='text-[10px] font-black text-blue-600 uppercase tracking-widest border-b-2 border-transparent hover:border-blue-600 transition-all pb-1'>
                                {section.label}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className='bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl shadow-slate-900/50'>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10"></div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10'>
                        <div>
                           <h2 className='text-4xl font-black mb-6 uppercase tracking-tighter italic leading-none'>Enterprise & Bulk Support</h2>
                           <p className='text-slate-400 font-medium leading-relaxed mb-8'>Working for a startup or a large corporation? We provide dedicated account managers for laptop procurement, onsite support, and asset management.</p>
                           <Link to="/contact" className='bg-blue-600 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all inline-block'>Business Inquiry</Link>
                        </div>
                        <div className='space-y-6'>
                            <div className='p-6 bg-white/5 rounded-2xl border border-white/5'>
                                <h4 className='text-blue-500 font-black uppercase text-[10px] tracking-widest mb-2'>Support SLA</h4>
                                <p className='text-white text-lg font-bold italic tracking-tight'>99.9% Ticket Resolution within 24 Hours</p>
                            </div>
                            <div className='p-6 bg-white/5 rounded-2xl border border-white/5'>
                                <h4 className='text-indigo-500 font-black uppercase text-[10px] tracking-widest mb-2'>Technical Team</h4>
                                <p className='text-white text-lg font-bold italic tracking-tight'>Certified Hardware Engineers (A+, Network+)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}

export default CustomerSupport
