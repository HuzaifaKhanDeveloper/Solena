import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import { Minus, Plus, Clock, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useWalletBalance } from '../../hooks/useWalletBalance';

const PresaleInterface = () => {
    const { connected, publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const { balance } = useWalletBalance();
    
    // Presale state
    const [purchaseAmount, setPurchaseAmount] = useState(1500);
    const [selectedToken, setSelectedToken] = useState('SOL');
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Presale data
    const presaleData = {
        totalRaised: 51656963,
        totalTokensSold: 22981,
        progress: 67,
        currentStage: 1,
        tokenPrice: 0.000000000700, // 1 Solena = 0.000000000700 USD
        solPrice: 142.50, // Current SOL price in USD
        maxPurchase: 5000,
        minPurchase: 100
    };

    // Calculate tokens based on purchase amount and selected currency
    const calculateTokens = (amount) => {
        if (selectedToken === 'SOL') {
            const usdValue = amount * presaleData.solPrice;
            return usdValue / presaleData.tokenPrice;
        } else {
            return amount / presaleData.tokenPrice;
        }
    };

    // Countdown timer
    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30); // 30 days from now

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handlePurchase = async () => {
        if (!connected || !publicKey) {
            alert('Please connect your wallet first');
            return;
        }

        if (purchaseAmount < presaleData.minPurchase || purchaseAmount > presaleData.maxPurchase) {
            alert(`Purchase amount must be between $${presaleData.minPurchase} and $${presaleData.maxPurchase}`);
            return;
        }

        setLoading(true);
        try {
            // Calculate SOL amount needed
            const solAmount = selectedToken === 'SOL' ? purchaseAmount : purchaseAmount / presaleData.solPrice;
            
            if (solAmount > balance) {
                alert('Insufficient SOL balance');
                return;
            }

            // Create transaction (simplified for demo)
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey('11111111111111111111111111111112'), // System program for demo
                    lamports: Math.floor(solAmount * LAMPORTS_PER_SOL),
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');
            
            const tokensReceived = calculateTokens(purchaseAmount);
            alert(`Purchase successful! You will receive ${tokensReceived.toLocaleString()} SOLENA tokens. Transaction: ${signature}`);
            
        } catch (error) {
            console.error('Purchase failed:', error);
            alert('Purchase failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const adjustAmount = (increment) => {
        const newAmount = purchaseAmount + increment;
        if (newAmount >= presaleData.minPurchase && newAmount <= presaleData.maxPurchase) {
            setPurchaseAmount(newAmount);
        }
    };

    return (
        <div className="min-h-screen bg-[#1B1B36] flex items-center justify-center p-4">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Side - Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <motion.h1 
                            className="text-6xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="text-[#ECFDFF]">Invest</span>
                        </motion.h1>
                        <motion.h2 
                            className="text-3xl text-[#ECFDFF] font-light mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            smarter with Solena
                        </motion.h2>
                        <motion.p 
                            className="text-[#7979AC] text-lg max-w-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Immerse yourself in the future of finance with Solena - the token that bridges the gap between innovation and opportunity.
                        </motion.p>
                    </div>

                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2 text-[#ECFDFF]">
                            <Clock className="w-5 h-5 text-[#3ED3B5]" />
                            <span className="text-lg font-medium">Pre-Sale Starts In</span>
                        </div>
                        
                        <div className="flex gap-4">
                            {[
                                { value: timeLeft.days, label: 'Days' },
                                { value: timeLeft.hours, label: 'Hours' },
                                { value: timeLeft.minutes, label: 'Min' },
                                { value: timeLeft.seconds, label: 'Sec' }
                            ].map((item, index) => (
                                <div key={item.label} className="text-center">
                                    <div className="text-4xl font-bold text-[#3ED3B5] mb-1">
                                        {String(item.value).padStart(2, '0')}
                                    </div>
                                    <div className="text-[#7979AC] text-sm">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4"
                    >
                        <button className="bg-transparent border-2 border-[#539EE1] text-[#ECFDFF] px-6 py-3 rounded-lg font-medium hover:bg-[#539EE1]/10 transition-colors">
                            Whitepaper
                        </button>
                        <button className="text-[#7979AC] hover:text-[#ECFDFF] transition-colors">
                            <span className="text-2xl">✕</span>
                        </button>
                        <button className="text-[#7979AC] hover:text-[#ECFDFF] transition-colors">
                            <span className="text-2xl">📤</span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right Side - Presale Interface */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#1c2340]/80 backdrop-blur-sm border border-[#539EE1]/30 rounded-2xl p-8"
                >
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <DollarSign className="w-5 h-5 text-[#3ED3B5]" />
                                <span className="text-[#7979AC] text-sm">Total Sales</span>
                            </div>
                            <div className="text-2xl font-bold text-[#ECFDFF]">
                                ${presaleData.totalRaised.toLocaleString()}
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Users className="w-5 h-5 text-[#5F78FF]" />
                                <span className="text-[#7979AC] text-sm">Total Tokens Sold</span>
                            </div>
                            <div className="text-2xl font-bold text-[#ECFDFF]">
                                {presaleData.totalTokensSold.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#7979AC] text-sm">Sales Progress</span>
                            <span className="text-[#ECFDFF] font-medium">{presaleData.progress}%</span>
                        </div>
                        <div className="w-full bg-[#15152B] rounded-full h-3">
                            <motion.div
                                className="bg-gradient-to-r from-[#3ED3B5] to-[#5F78FF] h-3 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${presaleData.progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-[#7979AC] mt-2">
                            <span>$0</span>
                            <span>$500</span>
                            <span>$1500</span>
                            <span>$2500</span>
                            <span>$3500</span>
                            <span>$5000</span>
                        </div>
                    </div>

                    {/* Stage Info */}
                    <div className="mb-6 p-4 bg-[#15152B]/50 rounded-lg">
                        <div className="text-[#ECFDFF] font-medium mb-1">
                            Stage {presaleData.currentStage} | {presaleData.tokenPrice.toFixed(12)} USD = 1 Solena
                        </div>
                    </div>

                    {/* Token Selection */}
                    <div className="flex gap-2 mb-6">
                        {['SOL', 'USDT', 'USDC'].map((token) => (
                            <button
                                key={token}
                                onClick={() => setSelectedToken(token)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                    selectedToken === token
                                        ? 'bg-[#3ED3B5] text-[#1B1B36]'
                                        : 'bg-[#15152B] text-[#ECFDFF] border border-[#539EE1]/30'
                                }`}
                            >
                                <div className={`w-4 h-4 rounded-full ${
                                    token === 'SOL' ? 'bg-purple-500' :
                                    token === 'USDT' ? 'bg-green-500' : 'bg-blue-500'
                                }`} />
                                {token}
                            </button>
                        ))}
                    </div>

                    {/* Amount Input */}
                    <div className="mb-6">
                        <div className="bg-[#15152B] rounded-lg p-4 border border-[#539EE1]/20">
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={() => adjustAmount(-100)}
                                    className="w-10 h-10 rounded-full bg-[#1c2340] border border-[#539EE1]/30 flex items-center justify-center text-[#ECFDFF] hover:bg-[#539EE1]/10 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#ECFDFF] mb-1">
                                        $ {purchaseAmount.toLocaleString()}
                                    </div>
                                    <div className="text-[#3ED3B5] text-sm">
                                        ≈ {calculateTokens(purchaseAmount).toLocaleString()} SOLENA
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => adjustAmount(100)}
                                    className="w-10 h-10 rounded-full bg-[#1c2340] border border-[#539EE1]/30 flex items-center justify-center text-[#ECFDFF] hover:bg-[#539EE1]/10 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="text-center text-[#7979AC] text-sm">
                                Amount of {selectedToken} = {selectedToken === 'SOL' ? (purchaseAmount / presaleData.solPrice).toFixed(4) : purchaseAmount}
                            </div>
                        </div>
                    </div>

                    {/* Purchase Button */}
                    <motion.button
                        onClick={handlePurchase}
                        disabled={!connected || loading}
                        whileHover={{ scale: connected && !loading ? 1.02 : 1 }}
                        whileTap={{ scale: connected && !loading ? 0.98 : 1 }}
                        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                            connected && !loading
                                ? 'bg-gradient-to-r from-[#5F78FF] to-[#3ED3B5] text-[#1B1B36] hover:opacity-90'
                                : 'bg-[#7979AC]/20 text-[#7979AC] cursor-not-allowed'
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1B1B36]"></div>
                                Processing...
                            </div>
                        ) : !connected ? (
                            'Connect Wallet'
                        ) : (
                            'Buy Tokens'
                        )}
                    </motion.button>

                    {/* Balance Info */}
                    {connected && (
                        <div className="mt-4 text-center text-[#7979AC] text-sm">
                            Your Balance: {balance.toFixed(4)} SOL
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default PresaleInterface;