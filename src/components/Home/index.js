import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../common/Navbar'
import HeroSection from './HeroSection'
import TradingInterface from '../trading/TradingInterface'
import PriceChart from '../analytics/PriceChart'
import StakingPool from '../staking/StakingPool'
import WhyChoose from './WhyChoose/WhyChoose'
import ZigZag from '../../assets/images/zigzag.png'
import ZigZag2 from '../../assets/images/zigzag2.png'
import StrategyPlan from './StrategyPlan/StrategyPlan'
import Footer from '../common/Footer'
import FooterMobile from '../common/FooterMobile'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      
      <motion.img 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        src={ZigZag2} 
        alt="" 
        className='relative -top-20' 
      />
      
      {/* Trading Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <TradingInterface />
          <PriceChart />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <StakingPool />
        </div>
      </motion.section>
      
      <WhyChoose />
      <img src={ZigZag} alt="" className='relative -top-20'/> 
      <StrategyPlan />
      <Footer />
      <FooterMobile />

    </>
  )
}

export default HomePage