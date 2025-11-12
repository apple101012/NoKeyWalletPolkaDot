import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Users, Check } from 'lucide-react';

const RecoveryModal = ({ onClose }) => {
  const [step, setStep] = useState('choose'); // 'choose', 'email', 'social', 'success'
  const [email, setEmail] = useState('');
  const [trustedContacts, setTrustedContacts] = useState(['', '', '']);

  const handleEmailRecovery = (e) => {
    e.preventDefault();
    // Simulate email recovery
    setTimeout(() => {
      setStep('success');
      setTimeout(onClose, 2000);
    }, 2000);
  };

  const handleSocialRecovery = (e) => {
    e.preventDefault();
    // Simulate social recovery
    setTimeout(() => {
      setStep('success');
      setTimeout(onClose, 2000);
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
          {step === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recover Wallet</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-400 mb-6">
                Choose how you'd like to recover your wallet
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => setStep('email')}
                  className="w-full glass-effect hover:bg-white/10 rounded-2xl p-6 flex items-center gap-4 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold">Email Recovery</h3>
                    <p className="text-sm text-gray-400">Recover via email verification</p>
                  </div>
                </button>

                <button
                  onClick={() => setStep('social')}
                  className="w-full glass-effect hover:bg-white/10 rounded-2xl p-6 flex items-center gap-4 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-pink-400" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold">Social Recovery</h3>
                    <p className="text-sm text-gray-400">Recover with trusted contacts</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-2">Email Recovery</h2>
              <p className="text-gray-400 mb-6">
                Enter your email to receive a recovery link
              </p>

              <form onSubmit={handleEmailRecovery} className="space-y-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-primary hover:bg-primary-dark rounded-xl font-semibold transition-colors"
                >
                  Send Recovery Link
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

          {step === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-2">Social Recovery</h2>
              <p className="text-gray-400 mb-6">
                Enter addresses of your trusted contacts (2 of 3 required)
              </p>

              <form onSubmit={handleSocialRecovery} className="space-y-4">
                {trustedContacts.map((contact, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Contact ${index + 1} address`}
                    value={contact}
                    onChange={(e) => {
                      const newContacts = [...trustedContacts];
                      newContacts[index] = e.target.value;
                      setTrustedContacts(newContacts);
                    }}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                ))}
                <button
                  type="submit"
                  className="w-full py-4 bg-primary hover:bg-primary-dark rounded-xl font-semibold transition-colors"
                >
                  Request Recovery
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
              <h2 className="text-2xl font-bold mb-2">Recovery Successful!</h2>
              <p className="text-gray-400">Welcome back</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default RecoveryModal;
