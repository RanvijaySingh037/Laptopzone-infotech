import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'

const FAQ = () => {
    const faqs = [
        {
            question: "What is the expected delivery time for my laptop?",
            answer: "For major metro cities (Delhi, Mumbai, Bangalore, etc.), we usually deliver within 2-4 business days. For other parts of India, it may take 5-7 business days depending on your location."
        },
        {
            question: "Does the laptop come with an official warranty?",
            answer: "Yes, every laptop sold on LaptopZone Infotech is 100% genuine and comes with the standard manufacturer warranty. You can claim warranty at any authorized service center of the respective brand across India."
        },
        {
            question: "What payment options are available?",
            answer: "We support All Major Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, etc.), and Cash on Delivery (COD) for eligible pincodes."
        },
        {
            question: "Can I return a laptop if I change my mind?",
            answer: "We have a 7-day replacement policy for manufacturing defects. For more details on returns and refunds, please visit our Refund & Return Policy page."
        },
        {
            question: "Do you provide technical setup assistance?",
            answer: "Absolutely! Our technical support team can guide you through the initial setup, OS activation, and driver installations via remote support or phone call."
        },
        {
            question: "Are the prices inclusive of GST?",
            answer: "Yes, all prices displayed on our website are inclusive of GST. You will receive a proper GST invoice with your purchase which can be used for corporate tax benefits."
        }
    ];

    return (
        <div className='bg-slate-50 min-h-screen pt-10 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-16'>
                    <Title text1={'FREQUENTLY'} text2={'ASKED QUESTIONS'} />
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Quick answers to common queries</p>
                </div>

                <div className='space-y-6 mb-20'>
                    {faqs.map((faq, index) => (
                        <div key={index} className='bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow'>
                            <h3 className='text-lg font-black text-slate-800 mb-4 flex gap-4'>
                                <span className='text-blue-600'>Q.</span>
                                {faq.question}
                            </h3>
                            <p className='text-slate-500 font-medium leading-relaxed pl-8 border-l-2 border-slate-50'>
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <div className='bg-blue-600 rounded-[2.5rem] p-10 text-white text-center shadow-2xl shadow-blue-200'>
                    <h3 className='text-2xl font-black mb-4 uppercase tracking-tighter italic'>Still have questions?</h3>
                    <p className='text-blue-100 mb-8 font-medium'>Our support team is ready to assist you with any technical or sales query.</p>
                    <a href="/contact" className='inline-block bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all'>Contact Support</a>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}

export default FAQ
