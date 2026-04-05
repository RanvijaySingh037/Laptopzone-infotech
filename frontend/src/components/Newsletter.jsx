import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  }

  if (isSubscribed) {
    return (
      <div className='bg-gradient-to-r from-green-50 to-teal-50 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl my-16'>
        <div className='text-center max-w-2xl mx-auto'>
          <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className='text-2xl font-bold text-gray-800 mb-2'>Thank you for subscribing!</h3>
          <p className='text-gray-600 mb-6'>You'll receive your 20% discount code in your email shortly.</p>
          <button 
            onClick={() => setIsSubscribed(false)}
            className='text-green-600 hover:text-green-800 font-medium'
          >
            Subscribe another email →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-slate-50 border border-blue-50 py-20 px-4 sm:px-6 lg:px-8 rounded-[2rem] my-24 relative overflow-hidden shadow-sm'>
      {/* Background decoration */}
      <div className='absolute -top-24 -right-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl'></div>
      <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl'></div>

      <div className='text-center max-w-4xl mx-auto relative z-10'>
        {/* Header */}
        <div className='mb-12'>
          <h2 className='text-3xl sm:text-5xl font-black text-slate-800 mb-6 tracking-tighter uppercase italic'>
            STAY UPDATED
          </h2>
          <div className='flex items-center justify-center gap-3 mb-6'>
            <span className='bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-black tracking-[0.2em] shadow-lg shadow-blue-200'>
              20% ACCESS
            </span>
          </div>
          <p className='text-slate-500 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto'>
            Subscribe now to receive the latest updates on premium laptop launches, expert maintenance tips, and exclusive festive offers.
          </p>
        </div>

        {/* Benefits */}
        <div className='flex flex-wrap justify-center gap-10 mb-12 uppercase text-[10px] font-black tracking-widest text-slate-400'>
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 bg-blue-600 rounded-full'></div>
            Early Access
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 bg-indigo-600 rounded-full'></div>
            Hardware Alerts
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 bg-emerald-600 rounded-full'></div>
            Flash Priority
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 lg:w-1/2 mx-auto'>
          <div className='flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl shadow-2xl shadow-blue-100/50 border border-blue-50'>
            <div className='flex-1 flex items-center gap-4 px-6'>
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input 
                className='w-full py-4 outline-none text-slate-800 placeholder-slate-300 font-bold text-sm' 
                type="email" 
                placeholder='ENTER YOUR EMAIL ADDRESS'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button 
              type='submit'
              disabled={isLoading}
              className='w-full sm:w-auto bg-slate-900 text-white font-black px-10 py-4 rounded-xl hover:bg-blue-700 transition-all duration-500 disabled:opacity-50 tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-200'
            >
              {isLoading ? 'PROCESSING...' : 'SUBSCRIBE'}
              {!isLoading && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
          
          <p className='text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest'>
            We respect your privacy. You may unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  )
}

export default Newsletter
