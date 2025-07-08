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
                className="flex items-center justify-between px-10 py-5 relative z-50"
            >
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="z-50"
                >
                    <img src={Logo} alt="Solena Logo" width={50} height={50} />
                </motion.div>

                <div>
                    <WalletButton />
                </div>
            </motion.nav>
        </>
    )
};

export default Navbar