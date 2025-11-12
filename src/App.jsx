import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import AuthenticationModal from './components/AuthenticationModal';
import Dashboard from './components/Dashboard';
import { generateWallet, storeWallet, retrieveWallet, walletExists, clearWallet } from './utils/wallet';
import { cryptoWaitReady } from '@polkadot/util-crypto';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'dashboard'
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Initialize crypto WASM
    cryptoWaitReady()
      .then(() => {
        console.log('[NoKey] cryptoReady')
        setIsReady(true);

        // Check if wallet exists in storage
        if (walletExists()) {
          // For demo purposes, we auto-restore with a simple password
          const stored = retrieveWallet('demo-password-123');
          if (stored) {
            setWallet(stored);
            setCurrentView('dashboard');
          }
        }
      })
      .catch((err) => {
        console.error('[NoKey] cryptoWaitReady error', err)
        // Fallback: allow the app to render so we can see errors instead of a blank page
        setIsReady(true);
      });
  }, []);

  const handleCreateWallet = () => {
    setShowAuthModal(true);
  };

  const handleAuthenticate = () => {
    // Generate new wallet
    const newWallet = generateWallet();
    
    // Store encrypted wallet
    storeWallet(newWallet, 'demo-password-123');
    
    // Set wallet and show dashboard
    setWallet(newWallet);
    setShowAuthModal(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout? This will clear your wallet from this device.')) {
      clearWallet();
      setWallet(null);
      setCurrentView('landing');
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Initializing wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <LandingPage key="landing" onCreateWallet={handleCreateWallet} />
        )}
        
        {currentView === 'dashboard' && wallet && (
          <Dashboard key="dashboard" wallet={wallet} onLogout={handleLogout} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAuthModal && (
          <AuthenticationModal
            onAuthenticate={handleAuthenticate}
            onCancel={() => setShowAuthModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
