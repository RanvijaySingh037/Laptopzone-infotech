import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'

const CancellationPolicy = () => {
    return (
        <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20 font-sans'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-16'>
                    <Title text1={'CANCELLATION'} text2={'POLICY'} />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Order Modification & Cancellation Rules</p>
                </div>

                <div className='bg-white rounded-[3rem] p-12 lg:p-16 shadow-xl border border-slate-100 text-slate-600 prose prose-slate max-w-none'>
                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>1. Pre-Dispatch Cancellation</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        You can cancel your laptop order through the website or by calling support within 24 hours of placing the order or UNTIL the product has been dispatched. Full refund will be processed to the original payment method.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>2. Post-Dispatch Cancellation</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        Once the product has been handed over to our logistics partner, we cannot cancel the order while in transit. In such cases, if you still wish to cancel, you may refuse delivery at your doorstep. We will process a refund minus any shipping/handling fees.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>3. Order Modification</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        If you have mistakenly ordered a wrong model or variant (e.g., lower RAM or different color), please contact our sales team immediately (within 4 hours of order) to modify your order without any cancellation charges.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>4. Cancellation Fees</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        LaptopZone Infotech does not charge any cancellation fees for orders cancelled before dispatch. For bulk or corporate orders, separate cancellation terms mentioned in the quote will apply.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>5. Automated Cancellations</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        We reserve the right to cancel an order if the product goes out of stock or if our verification team flags a transaction as high-risk or potentially fraudulent. In all such cases, you will be notified and a full refund will be initiated.
                    </p>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}

export default CancellationPolicy
