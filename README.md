# 🪪 NoKey Wallet - Your keys, simplified

> **Tagline**: Create a Web3 wallet without seed phrases  
> **Theme**: Polkadot Tinkerers | Web2 → Web3 UX Innovation

## 🎯 Project Overview

NoKey Wallet is a proof-of-concept Polkadot wallet that eliminates seed phrases and uses Web2-style authentication patterns to make Web3 onboarding as easy as logging into Gmail.

Built for the **Polkadot Hackathon**, this demo showcases how account abstraction and device-bound encryption can create a seamless, recoverable wallet experience that feels like Web2 but runs on Web3.

# 🪪 NoKey Wallet - Your Keys, Simplified

**Tagline:** Create a Web3 wallet without seed phrases  
**Theme:** Polkadot Tinkerers | Web2 → Web3 UX Innovation  

---

## 🎯 Project Overview

**NoKey Wallet** is a Polkadot-powered proof-of-concept that redefines Web3 onboarding by removing seed phrases and private key complexity.  
It introduces **Web2-style authentication**, **device-bound encryption**, and **social recovery** to make decentralized identity creation feel as familiar as signing up for Gmail.

Built for the **Polkadot Hackathon**, this project demonstrates how **account abstraction** and **user-first UX** can make Web3 usable for everyone — not just developers.

---

## ✨ Key Features

- **No Seed Phrases:** Wallet creation without private key exposure.  
- **Device-Bound Encryption:** Wallet data is encrypted locally to simulate secure enclaves.  
- **Social & Email Recovery:** Recover wallets through trusted contacts or verification codes.  
- **Minimalist UI:** Modern, responsive, and intuitive interface inspired by consumer-grade apps.  
- **Parachain Integration (Simulated):** Toggle connections with Acala, Moonbeam, Astar, and Parallel.  
- **Transaction Simulation:** Create and confirm mock DOT transfers with clear visual feedback.  
- **Frictionless Onboarding:** Three-click wallet creation and recovery flow.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern browser

### Installation
```bash
git clone https://github.com/apple101012/NoKeyWalletPolkaDot.git
cd NoKeyWalletPolkaDot
npm install
npm run dev
```

Then visit: http://localhost:5173

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎮 How to Use

1. Open the landing page to learn about NoKey Wallet.
2. Click "Create Account" to start.
3. Choose Face ID (simulated) or Email Verification.
4. View your Polkadot address, mock balance, and transaction history.
5. Connect parachains like Acala or Moonbeam via toggle cards.
6. Use Send to simulate DOT transfers.
7. Try the Recovery Flow to restore your account.

The experience feels fully functional while remaining lightweight and self-contained for demo purposes.

---

## 🏗️ Architecture
```
Frontend (React + Tailwind + Framer Motion)
│
├── Authentication Layer
│   ├─ Mock biometric login (Face ID / Email)
│   ├─ Social recovery simulation
│
├── Key Management Layer
│   ├─ Wallet generation via @polkadot/util-crypto
│   ├─ Local AES encryption via crypto-js
│   └─ Device-bound key simulation
│
├── Blockchain Simulation
│   ├─ Mock balances and transactions
│   ├─ Parachain toggle states
│
└── UI Components
    ├─ Landing Page
    ├─ Dashboard (Balance + Transactions)
    ├─ Authentication Modal
    ├─ Send & Recovery Modals
    └─ Parachain Cards
```

---

## 🛠️ Tech Stack

- Frontend: React 18 + Vite
- Styling: Tailwind CSS
- Animations: Framer Motion
- Crypto / Wallet: @polkadot/util-crypto
- Encryption: crypto-js
- Icons: Lucide React

---

## 🔑 Core Implementation Details

### Wallet Generation
```javascript
import { mnemonicGenerate, mnemonicToMiniSecret, naclKeypairFromSeed, encodeAddress } from '@polkadot/util-crypto';

const generateWallet = () => {
  const mnemonic = mnemonicGenerate();
  const seed = mnemonicToMiniSecret(mnemonic);
  const keypair = naclKeypairFromSeed(seed);
  const address = encodeAddress(keypair.publicKey, 0);
  return { address, publicKey: keypair.publicKey };
};
```

### Device-Bound Encryption
```javascript
import CryptoJS from 'crypto-js';

const storeWallet = (walletData, password) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(walletData), password).toString();
  localStorage.setItem('nokey_wallet', encrypted);
};
```

---

## 🎯 Demo Flow (2–3 Minutes)

- Landing Page: Overview of concept and features.
- Create Account: Click to generate wallet (Face ID / Email simulation).
- Authentication: Simulated verification.
- Dashboard: Display wallet address, mock DOT balance, and transactions.
- Parachain Toggle: Connect/disconnect to simulated parachains.
- Send Flow: Mock transaction confirmation animation.
- Recovery: Show email/social recovery flow and successful restoration.

---

## 📊 Hackathon Scoring Alignment

### Technological Implementation:
- Demonstrates real address generation with @polkadot/util-crypto.
- Simulates account abstraction and recovery without backend.
- Uses local encryption and wallet management logic.

### Design:
- Clean, dark, red-accented UI with modern animations.
- User-centered, intuitive flow designed for clarity.

### Potential Impact:
- Lowers entry barriers for Web3 adoption.
- Bridges Web2 familiarity with Polkadot’s decentralized infrastructure.

### Quality of Idea:
- Solves a real onboarding pain point.
- Combines proven UX patterns with decentralized identity principles.

---

## 🔮 Future Roadmap

### Phase 1: MVP Enhancements
- Integrate real Westend testnet balance calls.
- Add FIDO2 hardware key support.
- Implement basic multi-factor recovery.

### Phase 2: Production Layer
- True account abstraction with Polkadot SDK.
- KILT Protocol integration for verifiable identity.
- Threshold cryptography for secure recovery.

### Phase 3: Ecosystem Growth
- Release @polkadot-nokey SDK for developers.
- Add browser extension & mobile versions.
- Support for additional parachains and chains.

---

## 🤝 Contributing

This repository is a hackathon demo and not production-grade.
To improve or extend functionality:

1. Replace localStorage with secure key storage (OS keychain or hardware).
2. Implement real Substrate transactions.
3. Replace mock encryption with robust key derivation and signing.
4. Add backend recovery coordination (if needed).

---

## 📄 License

MIT License — see LICENSE file for details.

---

## 🙏 Acknowledgments

Polkadot & Web3 Foundation for their support and vision.

@polkadot-js team for powerful developer tooling.

Hackathon mentors and organizers for feedback and guidance.

---

Project: NoKey Wallet
Built with: React, Tailwind, Framer Motion, Polkadot.js
Tagline: “Making Web3 onboarding invisible, yet powerful.”
- **Video**: [Demo Video URL]
