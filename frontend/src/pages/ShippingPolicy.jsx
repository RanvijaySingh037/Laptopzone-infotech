import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'

const ShippingPolicy = () => {
    return (
        <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20 font-sans'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-16'>
                    <Title text1={'SHIPPING'} text2={'POLICY'} />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Fast & Secure Pan-India Logistics</p>
                </div>

                <div className='bg-white rounded-[3rem] p-12 lg:p-16 shadow-xl border border-slate-100 text-slate-600 prose prose-slate max-w-none'>
                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>1. Shipping Partners</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        We partner with India's most reliable courier services including BlueDart, Delhivery, Ecom Express, and Xpressbees to ensure your high-value hardware reaches you safely and on time.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>2. Delivery Timelines</h3>
                    <div className='bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100'>
                        <ul className='space-y-4 font-medium'>
                            <li className='flex justify-between border-b border-slate-200 pb-2'><span className='text-slate-900'>Metro Cities:</span> 2-4 Business Days</li>
                            <li className='flex justify-between border-b border-slate-200 pb-2'><span className='text-slate-900'>Tier 2 & 3 Cities:</span> 4-6 Business Days</li>
                            <li className='flex justify-between'><span className='text-slate-900'>North-East / Hills:</span> 6-8 Business Days</li>
                        </ul>
                    </div>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>3. Secure Packaging</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        Laptops are high-value fragile items. We use triple-layer security packaging with bubble wrap and a tamper-evident outer layer to prevent any transit damage. All our shipments are 100% insured.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>4. Real-time Tracking</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        As soon as your order is dispatched, you will receive a tracking ID via Email/SMS. You can monitor your shipment directly on our website or through the carrier's portal.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>5. Damaged Shipments</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        Our shipping insurance covers transit damage. If the package looks tampered with or heavily crushed, PLEASE DO NOT accept delivery and contact our support immediately.
                    </p>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}

export default ShippingPolicy
