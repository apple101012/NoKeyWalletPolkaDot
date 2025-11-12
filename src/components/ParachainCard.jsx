import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { connectParachain, disconnectParachain } from '../utils/parachains';

const ParachainCard = ({ parachain, connected, onToggle, delay }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleToggle = async () => {
    setIsConnecting(true);
    
    if (connected) {
      await disconnectParachain(parachain.id);
    } else {
      await connectParachain(parachain.id);
    }
    
    setIsConnecting(false);
    onToggle();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-effect rounded-2xl p-6 hover:bg-white/5 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${parachain.color}20` }}
          >
            <span style={{ color: parachain.color }}>{parachain.icon}</span>
          </div>
          <div>
            <h4 className="font-semibold">{parachain.name}</h4>
            <p className="text-sm text-gray-400">
              {connected ? 'Connected' : 'Not connected'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {connected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          )}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleToggle}
        disabled={isConnecting}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          connected
            ? 'bg-white/10 hover:bg-white/15'
            : 'bg-primary hover:bg-primary-dark'
        } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isConnecting ? 'Connecting...' : connected ? 'Disconnect' : 'Connect'}
      </motion.button>
    </motion.div>
  );
};

export default ParachainCard;
