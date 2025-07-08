import React from "react";
import Logo from '../../assets/svgs/nav_logo.svg'
import WalletButton from "../wallet/WalletButton";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <>
            <motion.nav 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center md:justify-between justify-center px-10 py-5 md:my-0 my-10 relative z-50"
            >
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="z-50"
                >
                    <img src={Logo} alt="Solena Logo" width={50} height={50} />
                </div>

                <div className="hidden md:block">
                    <WalletButton />
                </div>
            </motion.nav>
        </>
    )
};

export default Navbar