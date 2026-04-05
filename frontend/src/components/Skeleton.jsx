import React from 'react'

const SkeletonProduct = () => {
  return (
    <div className='bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col h-full animate-pulse'>
      <div className='overflow-hidden rounded-2xl bg-slate-100 relative mb-5 h-56 w-full'>
        {/* Image Placeholder */}
      </div>
      
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="space-y-2">
          {/* Brand Placeholder */}
          <div className="h-3 bg-slate-100 rounded-full w-1/4"></div>
          {/* Title Placeholder */}
          <div className="h-5 bg-slate-100 rounded-full w-full"></div>
          <div className="h-5 bg-slate-100 rounded-full w-3/4"></div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-end justify-between">
          <div className="space-y-2">
            {/* Price Label Placeholder */}
            <div className="h-2 bg-slate-100 rounded-full w-16"></div>
            {/* Price Value Placeholder */}
            <div className="h-8 bg-slate-100 rounded-xl w-24"></div>
          </div>
          
          {/* Button Placeholder */}
          <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
}

const Skeleton = ({ type = 'product', count = 1 }) => {
  if (type === 'product') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
        {[...Array(count)].map((_, i) => (
          <SkeletonProduct key={i} />
        ))}
      </div>
    )
  }

  return null
}

export default Skeleton
