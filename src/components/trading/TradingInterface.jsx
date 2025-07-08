import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { ArrowUpDown, Zap, Settings } from 'lucide-react';
import { useWalletBalance } from '../../hooks/useWalletBalance';
import { useTokenPrice } from '../../hooks/useTokenPrice';

const TradingInterface = () => {
    const { connected, publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const { balance } = useWalletBalance();
    const { price } = useTokenPrice();
    
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [fromToken, setFromToken] = useState('SOL');
    const [toToken, setToToken] = useState('SOLENA');
    const [slippage, setSlippage] = useState(0.5);
    const [loading, setLoading] = useState(false);

    const handleSwap = async () => {
        if (!connected || !publicKey) {
            alert('Please connect your wallet first');
            return;
        }

        if (!fromAmount || parseFloat(fromAmount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (parseFloat(fromAmount) > balance) {
            alert('Insufficient balance');
            return;
        }

        setLoading(true);
        try {
            // This is a simplified swap simulation
            // In a real application, you would integrate with a DEX like Jupiter or Raydium
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: publicKey, // Self-transfer for demo
                    lamports: parseFloat(fromAmount) * LAMPORTS_PER_SOL * 0.001, // Small fee simulation
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');
            
            alert(`Swap successful! Transaction: ${signature}`);
            setFromAmount('');
            setToAmount('');
        } catch (error) {
            console.error('Swap failed:', error);
            alert('Swap failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAmountChange = (value, isFrom = true) => {
        if (isFrom) {
            setFromAmount(value);
            // Simulate conversion rate (1 SOL = 142857142.8 SOLENA)
            const rate = fromToken === 'SOL' ? 142857142.8 : 0.000000007;
            setToAmount(value ? (parseFloat(value) * rate).toFixed(2) : '');
        } else {
            setToAmount(value);
            const rate = toToken === 'SOLENA' ? 0.000000007 : 142857142.8;
            setFromAmount(value ? (parseFloat(value) * rate).toFixed(6) : '');
        }
    };

    const swapTokens = () => {
        const tempToken = fromToken;
        const tempAmount = fromAmount;
        
        setFromToken(toToken);
        setToToken(tempToken);
        setFromAmount(toAmount);
        setToAmount(tempAmount);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1c2340]/80 backdrop-blur-sm border border-[#539EE1]/30 rounded-xl p-6 max-w-md mx-auto"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#ECFDFF] text-xl font-bold">Swap Tokens</h3>
                <motion.button
                    whileHover={{ rotate: 90 }}
                    className="p-2 rounded-lg bg-[#15152B] border border-[#539EE1]/30 text-[#7979AC] hover:text-[#ECFDFF] transition-colors"
                >
                    <Settings className="w-4 h-4" />
                </motion.button>
            </div>

            {/* From Token */}
            <div className="space-y-4">
                <div className="bg-[#15152B] rounded-xl p-4 border border-[#539EE1]/20">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[#7979AC] text-sm">From</span>
                        <span className="text-[#7979AC] text-sm">
                            Balance: {balance.toFixed(4)} {fromToken}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            value={fromAmount}
                            onChange={(e) => handleAmountChange(e.target.value, true)}
                            placeholder="0.0"
                            className="flex-1 bg-transparent text-[#ECFDFF] text-xl font-semibold outline-none"
                        />
                        <div className="flex items-center gap-2 bg-[#1c2340] rounded-lg px-3 py-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#3ED3B5] to-[#5F78FF] rounded-full"></div>
                            <span className="text-[#ECFDFF] font-medium">{fromToken}</span>
                        </div>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                    <motion.button
                        onClick={swapTokens}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-[#15152B] border-2 border-[#539EE1] text-[#3ED3B5] hover:bg-[#539EE1]/10 transition-colors"
                    >
                        <ArrowUpDown className="w-5 h-5" />
                    </motion.button>
                </div>

                {/* To Token */}
                <div className="bg-[#15152B] rounded-xl p-4 border border-[#539EE1]/20">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[#7979AC] text-sm">To</span>
                        <span className="text-[#7979AC] text-sm">
                            Slippage: {slippage}%
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            value={toAmount}
                            onChange={(e) => handleAmountChange(e.target.value, false)}
                            placeholder="0.0"
                            className="flex-1 bg-transparent text-[#ECFDFF] text-xl font-semibold outline-none"
                        />
                        <div className="flex items-center gap-2 bg-[#1c2340] rounded-lg px-3 py-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#5F78FF] to-[#3ED3B5] rounded-full"></div>
                            <span className="text-[#ECFDFF] font-medium">{toToken}</span>
                        </div>
                    </div>
                </div>

                {/* Swap Details */}
                {fromAmount && toAmount && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-[#15152B]/50 rounded-lg p-3 space-y-2 text-sm"
                    >
                        <div className="flex justify-between text-[#7979AC]">
                            <span>Rate</span>
                            <span>1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(2)} {toToken}</span>
                        </div>
                        <div className="flex justify-between text-[#7979AC]">
                            <span>Network Fee</span>
                            <span>~0.00025 SOL</span>
                        </div>
                        <div className="flex justify-between text-[#7979AC]">
                            <span>Price Impact</span>
                            <span className="text-green-400">&lt;0.01%</span>
                        </div>
                    </motion.div>
                )}

                {/* Swap Button */}
                <motion.button
                    onClick={handleSwap}
                    disabled={!connected || loading || !fromAmount}
                    whileHover={{ scale: connected && !loading ? 1.02 : 1 }}
                    whileTap={{ scale: connected && !loading ? 0.98 : 1 }}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                        connected && !loading && fromAmount
                            ? 'bg-gradient-to-r from-[#3ED3B5] to-[#5F78FF] text-[#1B1B36] hover:opacity-90'
                            : 'bg-[#7979AC]/20 text-[#7979AC] cursor-not-allowed'
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1B1B36]"></div>
                            Swapping...
                        </div>
                    ) : !connected ? (
                        'Connect Wallet'
                    ) : !fromAmount ? (
                        'Enter Amount'
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <Zap className="w-5 h-5" />
                            Swap Tokens
                        </div>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default TradingInterface;