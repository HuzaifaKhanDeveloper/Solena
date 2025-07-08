import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { useWalletBalance } from '../../hooks/useWalletBalance';
import { useTokenPrice } from '../../hooks/useTokenPrice';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const WalletInfo = () => {
    const { connected, publicKey } = useWallet();
    const { balance, loading: balanceLoading } = useWalletBalance();
    const { price, priceChange, loading: priceLoading } = useTokenPrice();

    if (!connected) return null;

    const usdValue = balance * price;
    const isPositiveChange = priceChange >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1c2340]/80 backdrop-blur-sm border border-[#539EE1]/30 rounded-xl p-6 mb-8"
        >
            <div className="flex items-center gap-3 mb-4">
                <Wallet className="w-5 h-5 text-[#3ED3B5]" />
                <h3 className="text-[#ECFDFF] text-lg font-semibold">Wallet Overview</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <p className="text-[#7979AC] text-sm">SOL Balance</p>
                    <div className="flex items-center gap-2">
                        {balanceLoading ? (
                            <div className="animate-pulse bg-[#7979AC]/20 h-6 w-20 rounded"></div>
                        ) : (
                            <span className="text-[#ECFDFF] text-xl font-bold">
                                {balance.toFixed(4)} SOL
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-[#7979AC] text-sm">USD Value</p>
                    <div className="flex items-center gap-2">
                        {balanceLoading || priceLoading ? (
                            <div className="animate-pulse bg-[#7979AC]/20 h-6 w-24 rounded"></div>
                        ) : (
                            <span className="text-[#ECFDFF] text-xl font-bold">
                                ${usdValue.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-[#7979AC] text-sm">SOL Price (24h)</p>
                    <div className="flex items-center gap-2">
                        {priceLoading ? (
                            <div className="animate-pulse bg-[#7979AC]/20 h-6 w-28 rounded"></div>
                        ) : (
                            <>
                                <span className="text-[#ECFDFF] text-xl font-bold">
                                    ${price.toFixed(2)}
                                </span>
                                <div className={`flex items-center gap-1 ${
                                    isPositiveChange ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {isPositiveChange ? (
                                        <TrendingUp className="w-4 h-4" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4" />
                                    )}
                                    <span className="text-sm font-medium">
                                        {isPositiveChange ? '+' : ''}{priceChange.toFixed(2)}%
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WalletInfo;