import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check, AlertCircle } from 'lucide-react';
import { addTransaction } from '../utils/wallet';

const SendModal = ({ wallet, balance, onClose, onSuccess }) => {
  const [step, setStep] = useState('form'); // 'form', 'confirm', 'processing', 'success'
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const amountNum = parseFloat(amount);
    const balanceNum = parseFloat(balance);

    if (amountNum <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (amountNum > balanceNum) {
      setError('Insufficient balance');
      return;
    }

    if (!recipient || recipient.length < 10) {
      setError('Please enter a valid recipient address');
      return;
    }

    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('processing');

    // Simulate transaction processing
    setTimeout(() => {
      const tx = addTransaction({
        type: 'sent',
        to: recipient.slice(0, 4) + '...' + recipient.slice(-4),
        amount: parseFloat(amount)
      });

      setStep('success');
      
      setTimeout(() => {
        onSuccess(tx);
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-3xl p-8 max-w-md w-full"
      >
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Send DOT</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    placeholder="5F3sa2TJAWMqDhXG6jhV4N8ko9T..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Amount (DOT)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Available: {balance} DOT
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-primary hover:bg-primary-dark rounded-xl font-semibold transition-colors"
                >
                  Review Transaction
                </button>
              </form>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Confirm Transaction</h2>

              <div className="glass-effect rounded-2xl p-6 mb-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-400">To</p>
                  <p className="font-mono text-sm break-all">{recipient}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Amount</p>
                  <p className="text-3xl font-bold">{amount} DOT</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Network Fee</p>
                  <p>~0.001 DOT</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-xl font-bold">
                    {(parseFloat(amount) + 0.001).toFixed(3)} DOT
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('form')}
                  className="flex-1 py-4 glass-effect hover:bg-white/10 rounded-xl font-semibold transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-4 bg-primary hover:bg-primary-dark rounded-xl font-semibold transition-colors"
                >
                  Confirm & Send
                </button>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Send className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Processing Transaction</h2>
              <p className="text-gray-400">Please wait...</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-12 h-12 text-green-400" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Transaction Sent!</h2>
              <p className="text-gray-400">Your transaction has been broadcast</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SendModal;
