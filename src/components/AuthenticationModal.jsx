import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Mail, Shield, Check } from 'lucide-react';

const AuthenticationModal = ({ onAuthenticate, onCancel }) => {
  const [step, setStep] = useState('choose'); // 'choose', 'biometric', 'email', 'success'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleBiometric = () => {
    setStep('biometric');
    // Simulate biometric authentication
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onAuthenticate();
      }, 1500);
    }, 2000);
  };

  const handleEmailAuth = () => {
    setStep('email');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Simulate email code verification
    if (code === '123456' || code.length === 6) {
      setStep('success');
      setTimeout(() => {
        onAuthenticate();
      }, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-3xl p-8 max-w-md w-full"
      >
        <AnimatePresence mode="wait">
          {step === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-2">Choose Authentication Method</h2>
              <p className="text-gray-400 mb-6">How would you like to secure your wallet?</p>

              <div className="space-y-4">
                <button
                  onClick={handleBiometric}
                  className="w-full glass-effect hover:bg-white/10 rounded-2xl p-6 flex items-center gap-4 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Scan className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold">Face ID / Biometric</h3>
                    <p className="text-sm text-gray-400">Use your device's biometric sensor</p>
                  </div>
                </button>

                <button
                  onClick={handleEmailAuth}
                  className="w-full glass-effect hover:bg-white/10 rounded-2xl p-6 flex items-center gap-4 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-pink-400" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold">Email Code</h3>
                    <p className="text-sm text-gray-400">Receive a verification code</p>
                  </div>
                </button>
              </div>

              <button
                onClick={onCancel}
                className="w-full mt-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          )}

          {step === 'biometric' && (
            <motion.div
              key="biometric"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Scan className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Authenticating...</h2>
              <p className="text-gray-400">Look at your device to authenticate</p>
            </motion.div>
          )}

          {step === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-2">Email Verification</h2>
              <p className="text-gray-400 mb-6">Enter the code sent to your email</p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <input
                  type="text"
                  placeholder="Enter 6-digit code (use 123456)"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-dark rounded-xl font-semibold transition-colors"
                >
                  Verify
                </button>
              </form>

              <button
                onClick={() => setStep('choose')}
                className="w-full mt-4 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Back
              </button>
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
              <h2 className="text-2xl font-bold mb-2">Authentication Verified</h2>
              <p className="text-gray-400">Wallet created successfully!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AuthenticationModal;
