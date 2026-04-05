import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Ourpolicy from '../components/Ourpolicy'
import Newsletter from '../components/Newsletter'
import ShopByBrand from '../components/ShopByBrand'
import ShopByUseCase from '../components/ShopByUseCase'
import BudgetRange from '../components/BudgetRange'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <div className='bg-white min-h-screen'>
      <SEO 
        title="Official Hardware Hub" 
        description="Acquire top-tier business, gaming, and student laptops at LaptopZone Infotech. Authorized dealer for HP, Dell, Apple, and ASUS hardware."
        keywords="high performance laptops, gaming pc, workstation, macbook, rtx 4090 laptop, business elitebook"
      />
      <div className='space-y-0'>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-10">
          <Hero />
        </div>
        
        <ShopByBrand />
        <ShopByUseCase />
        <LatestCollection />
        <BestSeller />
        <BudgetRange />
        
        <div className="bg-slate-50">
          <Ourpolicy />
          <Newsletter />
        </div>
      </div>
    </div>
  )
}

export default Home
