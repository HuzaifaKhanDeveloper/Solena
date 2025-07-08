import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTokenPrice = (tokenSymbol = 'SOL') => {
    const [price, setPrice] = useState(0);
    const [priceChange, setPriceChange] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true`
                );
                
                const data = response.data.solana;
                setPrice(data.usd);
                setPriceChange(data.usd_24h_change);
                setError(null);
            } catch (err) {
                setError('Failed to fetch price data');
                console.error('Price fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrice();
        const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, [tokenSymbol]);

    return { price, priceChange, loading, error };
};