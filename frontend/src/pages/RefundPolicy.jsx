import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'

const RefundPolicy = () => {
    return (
        <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20 font-sans'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-16'>
                    <Title text1={'REFUND &'} text2={'RETURN POLICY'} />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Hassle-Free Returns & Professional Hardware Support</p>
                </div>

                <div className='bg-white rounded-[3rem] p-12 lg:p-16 shadow-xl border border-slate-100 text-slate-600 prose prose-slate max-w-none'>
                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>1. Return Eligibility</h3>
                    <p className='font-medium leading-relaxed mb-4'>Your laptop is eligible for return/replacement within 7 days of delivery only under the following conditions:</p>
                    <ul className='list-disc pl-5 mb-8 space-y-3 font-medium'>
                        <li>The product was delivered in a physically damaged condition.</li>
                        <li>The product has internal hardware defects (DOA - Dead on Arrival).</li>
                        <li>The product received is different from what was ordered.</li>
                    </ul>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>2. Professional Verification</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        All hardware return requests are subject to verification by our certified technical engineers. In case of a software issue or driver conflict, our support team will attempt a remote fix before initiating a replacement.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>3. Return Process</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        To initiate a return, contact our support team at <strong className='text-blue-600'>support@laptopzone.com</strong> with your order ID and a brief video clearly showing the defect. Once approved, we will arrange a secure reverse pickup through our logistics partners at no extra cost.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>4. Packaging Requirements</h3>
                    <p className='font-medium leading-relaxed mb-8 font-bold text-red-500'>
                        IMPORTANT: The laptop must be returned in its original manufacturer packaging with all accessories (charger, manuals, and warranty cards) intact. We recommend keeping the original box for at least 7 days after delivery.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>5. Refund Timeline</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        Once the product is received and inspected at our warehouse, your refund will be processed to the original payment method within 5-7 business days. For COD orders, a bank transfer will be initiated via a secure portal.
                    </p>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}

export default RefundPolicy
