import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { Wallet, LogOut } from 'lucide-react';

const WalletButton = () => {
    const { connected, disconnect, publicKey } = useWallet();

    const formatAddress = (address) => {
        if (!address) return '';
        const str = address.toString();
        return `${str.slice(0, 4)}...${str.slice(-4)}`;
    };

    if (connected) {
        return (
            <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-center gap-2 bg-[#1c2340] border border-[#539EE1] rounded-lg px-4 py-2">
                    <Wallet className="w-4 h-4 text-[#3ED3B5]" />
                    <span className="text-[#ECFDFF] text-sm font-medium">
                        {formatAddress(publicKey)}
                    </span>
                </div>
                <motion.button
                    onClick={disconnect}
                    className="flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-lg px-3 py-2 text-red-400 hover:bg-red-600/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <LogOut className="w-4 h-4" />
                </motion.button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <WalletMultiButton className="!bg-gradient-to-r !from-[#3ED3B5] !to-[#5F78FF] !border-none !rounded-lg !font-semibold !text-[#1B1B36] !px-6 !py-3 hover:!opacity-90 transition-opacity" />
        </motion.div>
    );
};

export default WalletButton;