import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const useWalletBalance = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!publicKey) {
            setBalance(0);
            return;
        }

        const getBalance = async () => {
            try {
                setLoading(true);
                const balance = await connection.getBalance(publicKey);
                setBalance(balance / LAMPORTS_PER_SOL);
            } catch (error) {
                console.error('Error fetching balance:', error);
                setBalance(0);
            } finally {
                setLoading(false);
            }
        };

        getBalance();
        
        // Refresh balance every 10 seconds
        const interval = setInterval(getBalance, 10000);

        return () => clearInterval(interval);
    }, [connection, publicKey]);

    return { balance, loading };
};