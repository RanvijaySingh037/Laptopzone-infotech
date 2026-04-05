import React from 'react'

const Title = ({text1, text2, level = 'h2'}) => {
  const Tag = level;
  return (
    <div className='inline-flex gap-3 items-center mb-8 group'>
      <div className='text-center'>
        <Tag className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase italic'>
          <span className='text-slate-500 group-hover:text-slate-600 transition-colors duration-300'>{text1}</span>
          {' '}
          <span className='bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-blue-700 transition-all duration-300'>
            {text2}
          </span>
        </Tag>
        <div className='flex items-center justify-center mt-3'>
          <div className='w-24 h-[3px] bg-gradient-to-r from-blue-700 to-transparent rounded-full group-hover:w-32 transition-all duration-500'></div>
        </div>
      </div>
    </div>
  )
}

export default Title