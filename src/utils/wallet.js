import { mnemonicGenerate, mnemonicToMiniSecret, sr25519PairFromSeed, encodeAddress } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import CryptoJS from 'crypto-js';

// Generate a mock wallet with Polkadot-compatible address
export const generateWallet = () => {
  try {
    // Generate a mnemonic (we won't show it to the user)
    const mnemonic = mnemonicGenerate();
    
    // Convert mnemonic to seed
    const seed = mnemonicToMiniSecret(mnemonic);
    
  // Generate keypair from seed (sr25519)
  const keypair = sr25519PairFromSeed(seed);

  // Generate Polkadot SS58 address (format 0 = Polkadot)
  const address = encodeAddress(keypair.publicKey, 0);
    
    // For demo purposes, we store encrypted version in localStorage
    const deviceKey = u8aToHex(seed);
    
    return {
      address,
      publicKey: u8aToHex(keypair.publicKey),
      deviceKey, // This would be stored securely in a real implementation
      mnemonic // Never exposed in production
    };
  } catch (error) {
    console.error('Error generating wallet:', error);
    throw error;
  }
};

// Encrypt data using AES (simulated device encryption)
export const encryptData = (data, password) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
};

// Decrypt data
export const decryptData = (encryptedData, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, password);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

// Store wallet securely in localStorage (simulated secure enclave)
export const storeWallet = (walletData, devicePassword) => {
  const encrypted = encryptData(walletData, devicePassword);
  localStorage.setItem('nokey_wallet', encrypted);
  localStorage.setItem('nokey_address', walletData.address);
  return true;
};

// Retrieve wallet from storage
export const retrieveWallet = (devicePassword) => {
  const encrypted = localStorage.getItem('nokey_wallet');
  if (!encrypted) return null;
  
  return decryptData(encrypted, devicePassword);
};

// Check if wallet exists
export const walletExists = () => {
  return localStorage.getItem('nokey_wallet') !== null;
};

// Clear wallet (logout)
export const clearWallet = () => {
  localStorage.removeItem('nokey_wallet');
  localStorage.removeItem('nokey_address');
  localStorage.removeItem('nokey_balance');
  localStorage.removeItem('nokey_transactions');
};

// Generate a shortened address for display
export const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

// Mock balance generation (for demo)
export const getMockBalance = (address) => {
  // Generate a deterministic but random-looking balance based on address
  const seed = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const balance = (seed % 50) / 10 + 0.5; // Between 0.5 and 5.5 DOT
  return balance.toFixed(2);
};

// Mock transaction history
export const getMockTransactions = (address) => {
  const stored = localStorage.getItem('nokey_transactions');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Generate mock transactions
  const transactions = [
    {
      id: 1,
      type: 'received',
      from: '16DN...Ljor',
      amount: 0.75,
      timestamp: Date.now() - 86400000,
      hash: '0x' + Math.random().toString(16).substr(2, 64)
    },
    {
      id: 2,
      type: 'sent',
      to: '63DU...g56o',
      amount: 1.20,
      timestamp: Date.now() - 172800000,
      hash: '0x' + Math.random().toString(16).substr(2, 64)
    }
  ];
  
  localStorage.setItem('nokey_transactions', JSON.stringify(transactions));
  return transactions;
};

// Add a new transaction (for demo)
export const addTransaction = (transaction) => {
  const transactions = getMockTransactions();
  const newTx = {
    id: transactions.length + 1,
    ...transaction,
    timestamp: Date.now(),
    hash: '0x' + Math.random().toString(16).substr(2, 64)
  };
  
  transactions.unshift(newTx);
  localStorage.setItem('nokey_transactions', JSON.stringify(transactions));
  return newTx;
};
