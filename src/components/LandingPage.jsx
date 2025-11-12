import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Smartphone, Users, RefreshCw } from 'lucide-react';

const LandingPage = ({ onCreateWallet }) => {
  const features = [
    {
      icon: Shield,
      title: 'No Seed Phrases',
      description: 'Never worry about losing your wallet. Your keys are secured by device encryption.'
    },
    {
      icon: Smartphone,
      title: 'Device-Bound Security',
      description: 'Your wallet is tied to your device, using secure enclave technology.'
    },
    {
      icon: Users,
      title: 'Social Recovery',
      description: 'Recover your wallet with trusted contacts - just like "Forgot Password?"'
    },
    {
      icon: RefreshCw,
      title: 'Web2 Experience',
      description: 'Familiar login flows with Web3 security. The best of both worlds.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8 inline-block"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-pink-500 rounded-2xl flex items-center justify-center text-4xl shadow-2xl shadow-primary/50">
            🪪
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-7xl font-bold mb-4"
        >
          NoKey Wallet
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-6"
        >
          Your keys, <span className="text-gradient">simplified</span>
        </motion.p>

        {/* Main tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl md:text-4xl font-semibold mb-12 max-w-3xl mx-auto leading-tight"
        >
          Create a Web3 wallet{' '}
          <span className="text-gradient">without seed phrases</span>
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreateWallet}
          className="px-12 py-5 bg-primary hover:bg-primary-dark text-white text-xl font-semibold rounded-2xl shadow-2xl shadow-primary/50 transition-all duration-300"
        >
          Create Account
        </motion.button>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 max-w-3xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="glass-effect rounded-2xl p-6 text-left hover:bg-white/10 transition-all duration-300"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 text-gray-500 text-sm"
        >
          Powered by Polkadot • Account Abstraction • Social Recovery
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
