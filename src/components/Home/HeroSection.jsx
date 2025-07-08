import React from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { Zap, FileText, TrendingUp, DollarSign } from "lucide-react";
import herosection from "../../assets/svgs/hero_section_bg.svg";
import shade from "../../assets/images/nav_bg.png"
import WalletInfo from "../wallet/WalletInfo";

const HeroSection = () => {
  const { connected } = useWallet();

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center gap-10 mx-auto md:mt-20 md:my-0 my-3"
      >
        <div>
          {/* bg image */}
          <img src={shade} width={550} style={{ position: 'absolute', transform: 'translateY(-205px)', left: 0 }} />
          <img
            src={herosection}
            // width={280}
            // height={300}
            className=" md:w-[400px] w-[260px]"
            style={{
              position: "absolute",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
        <div className=" flex flex-col justify-center items-center gap-5">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className=" hidden md:flex flex-col justify-center items-center text-7xl font-extralight text-[#ECFDFF] leading-[80px]"
          >
            <span>Join Future Of Solena</span>
            <span className=" flex justify-center items-center text-center">
              Queen Of{" "}<span className=" heading font-extrabold">&nbsp;Solana</span>
            </span>
          </motion.h1>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className=" md:hidden flex flex-col justify-center items-center gap-1 text-[38px] font-normal text-[#ECFDFF]"
          >
            <span className=" text-[45px]">Join Future</span>
            <span className=" text-[45px]">Of Solena</span>
            <span>Queen Of{" "}<span className=" heading font-extrabold">&nbsp;Solana</span></span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[#7979AC] text-center md:text-lg text-base max-w-2xl"
          >
            Experience the future of decentralized finance with advanced AI-powered trading, 
            staking rewards, and seamless blockchain integration on Solana.
          </motion.p>
        </div>

        {/* Wallet Info */}
        <WalletInfo />

        {/* btn */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex md:flex-row flex-col gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 font-semibold text-sm text-center px-10 py-[13px] text-[#1B1B36] rounded-[20px] btn-main"
          >
            <Zap className="w-4 h-4" />
            Launch App
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 btn-border font-semibold text-sm text-center px-10 py-[13px] text-[#ECFDFF] rounded-[25px] md:w-[180px] w-full h-14 bg-[#1c2340]"
          >
            <FileText className="w-4 h-4" />
            Read Docs
          </motion.button>
        </motion.div>

        {/* card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex md:flex-row flex-col md:justify-between justify-center items-center gap-2 md:gap-16 md:px-16 md:py-5 hero-section" 
          style={{ backgroundColor: '#1B1B36', border: '1px solid #4FA5DC' }}
        >
          <div className="flex flex-col gap-2 justify-center items-center md:px-0 md:py-0 px-16 py-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#3ED3B5]" />
              <p className="text-[#7979AC] text-sm font-medium">
                Total Value Locked
              </p>
            </div>
            <h1 className="text-[#ECFDFF] text-xl font-medium">
              $839,131,676
            </h1>
          </div>

          <div className="vertical-line hidden md:block"></div>
          <hr className="md:hidden block w-64" />

          <div className="flex flex-col gap-2 justify-center items-center md:px-0 md:py-0 px-16 py-5">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#5F78FF]" />
              <p className="text-[#7979AC] text-sm font-medium">
                Total Trading Volume
              </p>
            </div>
            <h1 className="text-[#ECFDFF] text-xl font-medium">
              $100,379,131,343
            </h1>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default HeroSection;