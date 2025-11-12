import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, LogOut, Send, ArrowUpRight, ArrowDownLeft, Moon, Sun } from 'lucide-react';
import ParachainCard from './ParachainCard';
import SendModal from './SendModal';
import RecoveryModal from './RecoveryModal';
import { parachains } from '../utils/parachains';
import { getMockBalance, getMockTransactions, shortenAddress } from '../utils/wallet';

const Dashboard = ({ wallet, onLogout }) => {
  const [balance, setBalance] = useState('0.00');
  const [transactions, setTransactions] = useState([]);
  const [connectedParachains, setConnectedParachains] = useState([]);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load mock data
    setBalance(getMockBalance(wallet.address));
    setTransactions(getMockTransactions(wallet.address));
  }, [wallet.address]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleParachainToggle = (parachainId) => {
    setConnectedParachains(prev => {
      if (prev.includes(parachainId)) {
        return prev.filter(id => id !== parachainId);
      } else {
        return [...prev, parachainId];
      }
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect border-b border-white/10 px-4 py-4 sticky top-0 z-40 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-pink-500 rounded-xl flex items-center justify-center text-xl">
              🪪
            </div>
            <div>
              <h1 className="text-xl font-bold">NoKey Wallet</h1>
              <button
                onClick={handleCopyAddress}
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                {shortenAddress(wallet.address)}
                {copied ? (
                  <span className="text-green-400 text-xs">✓ Copied</span>
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 glass-effect rounded-lg hover:bg-white/10 transition-all"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={onLogout}
              className="p-2 glass-effect rounded-lg hover:bg-white/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-3xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <p className="text-gray-400 mb-2">DOT Balance</p>
            <h2 className="text-5xl font-bold mb-6">{balance} DOT</h2>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSendModal(true)}
                className="flex-1 bg-primary hover:bg-primary-dark py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-5 h-5" />
                Send
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 glass-effect hover:bg-white/10 py-4 rounded-2xl font-semibold transition-all"
              >
                Receive
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Parachains Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Parachains</h3>
            <span className="text-sm text-primary">
              {connectedParachains.length} Connected
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parachains.map((parachain, index) => (
              <ParachainCard
                key={parachain.id}
                parachain={parachain}
                connected={connectedParachains.includes(parachain.id)}
                onToggle={() => handleParachainToggle(parachain.id)}
                delay={0.3 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Transactions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Transactions</h3>
          
          <div className="glass-effect rounded-3xl overflow-hidden">
            {transactions.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                No transactions yet
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {transactions.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tx.type === 'received' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {tx.type === 'received' ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-400" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">
                              {tx.type === 'received' ? 'Received from' : 'Sent to'}
                            </p>
                            <p className="text-sm text-gray-400">
                              {tx.type === 'received' ? tx.from : tx.to}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              tx.type === 'received' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {tx.type === 'received' ? '+' : '-'}{tx.amount} DOT
                            </p>
                            <p className="text-sm text-gray-400">
                              {new Date(tx.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recovery Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => setShowRecoveryModal(true)}
            className="text-primary hover:text-primary-dark transition-colors text-sm"
          >
            Forgot device? Recover your wallet →
          </button>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showSendModal && (
          <SendModal
            wallet={wallet}
            balance={balance}
            onClose={() => setShowSendModal(false)}
            onSuccess={(tx) => {
              setTransactions(prev => [tx, ...prev]);
              setBalance(prev => (parseFloat(prev) - tx.amount).toFixed(2));
            }}
          />
        )}
        {showRecoveryModal && (
          <RecoveryModal onClose={() => setShowRecoveryModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
