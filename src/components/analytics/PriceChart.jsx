import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const PriceChart = () => {
    const [chartData, setChartData] = useState([]);
    const [timeframe, setTimeframe] = useState('24h');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [priceChange, setPriceChange] = useState(0);

    useEffect(() => {
        // Generate mock price data
        const generateMockData = () => {
            const data = [];
            const basePrice = 142.50;
            let price = basePrice;
            
            for (let i = 0; i < 24; i++) {
                const change = (Math.random() - 0.5) * 10;
                price += change;
                data.push({
                    time: `${i}:00`,
                    price: Math.max(price, 100),
                    volume: Math.random() * 1000000
                });
            }
            
            setCurrentPrice(price);
            setPriceChange(((price - basePrice) / basePrice) * 100);
            return data;
        };

        setChartData(generateMockData());
        
        // Update data every 30 seconds
        const interval = setInterval(() => {
            setChartData(generateMockData());
        }, 30000);

        return () => clearInterval(interval);
    }, [timeframe]);

    const timeframes = ['1h', '24h', '7d', '30d'];
    const isPositive = priceChange >= 0;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1c2340] border border-[#539EE1]/30 rounded-lg p-3 shadow-lg">
                    <p className="text-[#ECFDFF] font-medium">{`Time: ${label}`}</p>
                    <p className="text-[#3ED3B5]">{`Price: $${payload[0].value.toFixed(2)}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1c2340]/80 backdrop-blur-sm border border-[#539EE1]/30 rounded-xl p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-[#3ED3B5]" />
                    <h3 className="text-[#ECFDFF] text-xl font-bold">SOLENA Price Chart</h3>
                </div>
                
                <div className="flex items-center gap-2">
                    {timeframes.map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                timeframe === tf
                                    ? 'bg-[#3ED3B5] text-[#1B1B36]'
                                    : 'text-[#7979AC] hover:text-[#ECFDFF]'
                            }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div>
                    <div className="text-3xl font-bold text-[#ECFDFF]">
                        ${currentPrice.toFixed(2)}
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                        isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                        {isPositive ? (
                            <TrendingUp className="w-4 h-4" />
                        ) : (
                            <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{isPositive ? '+' : ''}{priceChange.toFixed(2)}%</span>
                        <span className="text-[#7979AC]">({timeframe})</span>
                    </div>
                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#539EE1" opacity={0.1} />
                        <XAxis 
                            dataKey="time" 
                            stroke="#7979AC"
                            fontSize={12}
                        />
                        <YAxis 
                            stroke="#7979AC"
                            fontSize={12}
                            domain={['dataMin - 5', 'dataMax + 5']}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="url(#gradient)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, fill: '#3ED3B5' }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3ED3B5" />
                                <stop offset="100%" stopColor="#5F78FF" />
                            </linearGradient>
                        </defs>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default PriceChart;