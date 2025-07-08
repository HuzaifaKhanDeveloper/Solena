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
        
        // Set up subscription for balance changes
        const subscriptionId = connection.onAccountChange(
            publicKey,
            (accountInfo) => {
                setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
            }
        );

        return () => {
            connection.removeAccountChangeListener(subscriptionId);
        };
    }, [connection, publicKey]);

    return { balance, loading };
};