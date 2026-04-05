import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'

const TermsConditions = () => {
    return (
        <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20 font-sans'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-16'>
                    <Title text1={'TERMS &'} text2={'CONDITIONS'} />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Standard Business Operating Terms</p>
                </div>

                <div className='bg-white rounded-[3rem] p-12 lg:p-16 shadow-xl border border-slate-100 text-slate-600 prose prose-slate max-w-none'>
                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>Agreement</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        By accessing this website and placing an order with LaptopZone Infotech, you agree to be bound by these Terms and Conditions. Please read them carefully before conducting any transaction.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>1. Product Accuracy</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        While we strive for 100% accuracy, images, colors, and technical specifications are provided as a guide. Product availability and pricing are subject to change without prior notice. Final technical configurations will be as per the manufacturer's model number.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>2. Pricing & Payments</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        All prices listed are in Indian Rupees (INR) and are inclusive of GST. In case of an obvious pricing error (system glitch), we reserve the right to cancel the order and provide a full refund.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>3. Order Confirmation</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        A purchase contract is only formed when we dispatch the goods and send a confirmation email. We reserve the right to decline or cancel any order for reasons such as stock unavailability, errors in pricing, or suspicion of fraudulent activity.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>4. Limitation of Liability</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        LaptopZone Infotech shall not be liable for any indirect, incidental, or consequential damages arising out of the use of products purchased from our store. Our total liability is limited to the purchase price of the product.
                    </p>

                    <h3 className='text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic'>5. Governing Law</h3>
                    <p className='font-medium leading-relaxed mb-8'>
                        These terms and conditions are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in New Delhi.
                    </p>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}

export default TermsConditions
