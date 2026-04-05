import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'

const PrivacyPolicy = () => {
    return (
        <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20 font-sans'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-16'>
                    <Title text1={'PRIVACY'} text2={'POLICY'} />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Transparent Data Handling Practices</p>
                </div>

                <div className='bg-white rounded-[3rem] p-12 lg:p-16 shadow-xl border border-slate-100 text-slate-600 prose prose-slate max-w-none'>
                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>Introduction</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        At LaptopZone Infotech, we value your privacy and trust. This policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>1. Information Collection</h3>
                    <p className='font-medium leading-relaxed mb-4'>We collect information that you provide to us directly, such as:</p>
                    <ul className='list-disc pl-5 mb-8 space-y-3 font-medium'>
                        <li>Name and Contact Information (Email, Phone, Address)</li>
                        <li>Payment Details (Processed securely via encrypted gateways)</li>
                        <li>Account Credentials</li>
                        <li>Customer Support Inquiries</li>
                    </ul>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>2. How We Use Information</h3>
                    <p className='font-medium leading-relaxed mb-4'>Your data is purely used to enhance your shopping experience:</p>
                    <ul className='list-disc pl-5 mb-8 space-y-3 font-medium'>
                        <li>To process and deliver your laptop orders.</li>
                        <li>To provide technical support and warranty assistance.</li>
                        <li>To send order updates and promotional offers (only if you opt-in).</li>
                        <li>To improve our website performance and security.</li>
                    </ul>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>3. Data Security</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        We implement industry-standard 256-bit SSL encryption to protect your sensitive data. Your payment information is never stored on our servers; it is handled by PCI-compliant payment partners.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>4. Third-Party Sharing</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        We do not sell or rent your personal data to third parties. We only share necessary details (like address and phone number) with our trusted logistics partners (BlueDart, Delhivery, etc.) to ensure your order reaches you safely.
                    </p>

                    <p className='text-xs font-black text-slate-400 mt-12 uppercase tracking-widest'>Last Updated: October 2024</p>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}

export default PrivacyPolicy
