import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Coins, Plus, Minus, Award, Clock } from 'lucide-react';
import { useWalletBalance } from '../../hooks/useWalletBalance';

const StakingPool = () => {
    const { connected } = useWallet();
    const { balance } = useWalletBalance();
    const [stakeAmount, setStakeAmount] = useState('');
    const [unstakeAmount, setUnstakeAmount] = useState('');
    const [stakedBalance] = useState(125.75); // Mock staked balance
    const [rewards] = useState(12.34); // Mock rewards
    const [loading, setLoading] = useState(false);

    const apy = 8.5; // 8.5% APY
    const lockPeriod = 30; // 30 days

    const handleStake = async () => {
        if (!connected || !stakeAmount) return;
        
        setLoading(true);
        try {
            // Simulate staking transaction
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(`Successfully staked ${stakeAmount} SOLENA!`);
            setStakeAmount('');
        } catch (error) {
            alert('Staking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUnstake = async () => {
        if (!connected || !unstakeAmount) return;
        
        setLoading(true);
        try {
            // Simulate unstaking transaction
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(`Successfully unstaked ${unstakeAmount} SOLENA!`);
            setUnstakeAmount('');
        } catch (error) {
            alert('Unstaking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClaimRewards = async () => {
        if (!connected || rewards === 0) return;
        
        setLoading(true);
        try {
            // Simulate claim transaction
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(`Successfully claimed ${rewards} SOLENA rewards!`);
        } catch (error) {
            alert('Claiming rewards failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1c2340]/80 backdrop-blur-sm border border-[#539EE1]/30 rounded-xl p-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <Coins className="w-6 h-6 text-[#3ED3B5]" />
                <h3 className="text-[#ECFDFF] text-xl font-bold">SOLENA Staking Pool</h3>
            </div>

            {/* Pool Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#15152B] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-[#3ED3B5]" />
                        <span className="text-[#7979AC] text-sm">APY</span>
                    </div>
                    <div className="text-[#ECFDFF] text-2xl font-bold">{apy}%</div>
                </div>

                <div className="bg-[#15152B] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-[#5F78FF]" />
                        <span className="text-[#7979AC] text-sm">Lock Period</span>
                    </div>
                    <div className="text-[#ECFDFF] text-2xl font-bold">{lockPeriod} days</div>
                </div>

                <div className="bg-[#15152B] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Coins className="w-4 h-4 text-[#3ED3B5]" />
                        <span className="text-[#7979AC] text-sm">Total Staked</span>
                    </div>
                    <div className="text-[#ECFDFF] text-2xl font-bold">2.1M</div>
                </div>
            </div>

            {/* User Stats */}
            {connected && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#15152B]/50 rounded-lg p-4">
                        <span className="text-[#7979AC] text-sm">Your Staked Balance</span>
                        <div className="text-[#ECFDFF] text-xl font-bold">{stakedBalance.toFixed(2)} SOLENA</div>
                    </div>

                    <div className="bg-[#15152B]/50 rounded-lg p-4">
                        <span className="text-[#7979AC] text-sm">Pending Rewards</span>
                        <div className="flex items-center justify-between">
                            <div className="text-[#3ED3B5] text-xl font-bold">{rewards.toFixed(2)} SOLENA</div>
                            <motion.button
                                onClick={handleClaimRewards}
                                disabled={loading || rewards === 0}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-gradient-to-r from-[#3ED3B5] to-[#5F78FF] text-[#1B1B36] rounded-lg text-sm font-semibold disabled:opacity-50"
                            >
                                Claim
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}

            {/* Staking Interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stake */}
                <div className="space-y-4">
                    <h4 className="text-[#ECFDFF] font-semibold flex items-center gap-2">
                        <Plus className="w-4 h-4 text-[#3ED3B5]" />
                        Stake SOLENA
                    </h4>
                    
                    <div className="bg-[#15152B] rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#7979AC] text-sm">Amount</span>
                            <span className="text-[#7979AC] text-sm">
                                Balance: {balance.toFixed(4)} SOL
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                placeholder="0.0"
                                className="flex-1 bg-transparent text-[#ECFDFF] text-lg outline-none"
                            />
                            <button
                                onClick={() => setStakeAmount(balance.toString())}
                                className="text-[#3ED3B5] text-sm font-medium hover:opacity-80"
                            >
                                MAX
                            </button>
                        </div>
                    </div>

                    <motion.button
                        onClick={handleStake}
                        disabled={!connected || loading || !stakeAmount}
                        whileHover={{ scale: connected && !loading ? 1.02 : 1 }}
                        whileTap={{ scale: connected && !loading ? 0.98 : 1 }}
                        className={`w-full py-3 rounded-lg font-semibold transition-all ${
                            connected && !loading && stakeAmount
                                ? 'bg-gradient-to-r from-[#3ED3B5] to-[#5F78FF] text-[#1B1B36] hover:opacity-90'
                                : 'bg-[#7979AC]/20 text-[#7979AC] cursor-not-allowed'
                        }`}
                    >
                        {loading ? 'Staking...' : 'Stake SOLENA'}
                    </motion.button>
                </div>

                {/* Unstake */}
                <div className="space-y-4">
                    <h4 className="text-[#ECFDFF] font-semibold flex items-center gap-2">
                        <Minus className="w-4 h-4 text-[#5F78FF]" />
                        Unstake SOLENA
                    </h4>
                    
                    <div className="bg-[#15152B] rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#7979AC] text-sm">Amount</span>
                            <span className="text-[#7979AC] text-sm">
                                Staked: {stakedBalance.toFixed(2)} SOLENA
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={unstakeAmount}
                                onChange={(e) => setUnstakeAmount(e.target.value)}
                                placeholder="0.0"
                                className="flex-1 bg-transparent text-[#ECFDFF] text-lg outline-none"
                            />
                            <button
                                onClick={() => setUnstakeAmount(stakedBalance.toString())}
                                className="text-[#5F78FF] text-sm font-medium hover:opacity-80"
                            >
                                MAX
                            </button>
                        </div>
                    </div>

                    <motion.button
                        onClick={handleUnstake}
                        disabled={!connected || loading || !unstakeAmount}
                        whileHover={{ scale: connected && !loading ? 1.02 : 1 }}
                        whileTap={{ scale: connected && !loading ? 0.98 : 1 }}
                        className={`w-full py-3 rounded-lg font-semibold transition-all ${
                            connected && !loading && unstakeAmount
                                ? 'bg-gradient-to-r from-[#5F78FF] to-[#3ED3B5] text-[#1B1B36] hover:opacity-90'
                                : 'bg-[#7979AC]/20 text-[#7979AC] cursor-not-allowed'
                        }`}
                    >
                        {loading ? 'Unstaking...' : 'Unstake SOLENA'}
                    </motion.button>
                </div>
            </div>

            {/* Staking Info */}
            <div className="mt-6 p-4 bg-[#15152B]/30 rounded-lg border border-[#539EE1]/20">
                <h5 className="text-[#ECFDFF] font-medium mb-2">Staking Information</h5>
                <ul className="text-[#7979AC] text-sm space-y-1">
                    <li>• Minimum staking period: {lockPeriod} days</li>
                    <li>• Rewards are distributed daily</li>
                    <li>• Early unstaking may incur penalties</li>
                    <li>• APY is subject to change based on network conditions</li>
                </ul>
            </div>
        </motion.div>
    );
};

export default StakingPool;