# 🚀 NoKey Wallet - Quick Start Guide

Get your NoKey Wallet demo running in **under 2 minutes**!

## ⚡ Prerequisites

- **Node.js 18+** ([download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

---

## 📥 Installation

### Step 1: Clone or Download

```bash
# Option A: Clone with Git
git clone https://github.com/[your-username]/PolkaDotHackathon.git
cd PolkaDotHackathon

# Option B: Download ZIP
# Download from GitHub → Extract → Open folder in terminal
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~30 seconds).

### Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.4.21  ready in 222 ms

  ➜  Local:   http://localhost:5173/
```

### Step 4: Open in Browser

Navigate to: **http://localhost:5173**

---

## 🎮 Using the Demo

### 1. Landing Page
- You'll see the NoKey Wallet hero section
- Read about the features
- Click **"Create Account"** button

### 2. Authentication
Choose one of two methods:

**Option A: Face ID (Simulated)**
- Click "Face ID / Biometric"
- Watch the animation
- Wallet created in ~2 seconds

**Option B: Email Code**
- Click "Email Code"
- Enter any email address
- Use code: `123456` (any 6 digits work)
- Verify

### 3. Dashboard
You'll now see:
- ✅ Your Polkadot wallet address (real SS58 format)
- ✅ Mock DOT balance (2-5 DOT)
- ✅ Transaction history
- ✅ Parachain connection options

### 4. Send Transaction
- Click **"Send"** button
- Enter recipient address (e.g., `5F3sa2TJAWMqDhXG6jhV4N8ko9T...`)
- Enter amount (e.g., `0.5`)
- Click **"Review Transaction"**
- Confirm and watch the animation

### 5. Connect to Parachains
- Scroll to "Parachains" section
- Click **"Connect"** on any parachain
- Wait for connection animation
- See live connection status

### 6. Recovery Flow
- Click **"Forgot device? Recover your wallet →"**
- Choose Email or Social Recovery
- Follow the demo flow

### 7. Copy Address
- Click the copy icon next to your address
- Use it to "receive" funds in the demo

---

## 🎯 Demo Tips

### Best Practices
- **Show the full flow** - Landing → Create → Dashboard → Send → Recovery
- **Highlight animations** - Point out smooth transitions
- **Emphasize "no seed phrase"** - This is the key differentiator
- **Mention real Polkadot integration** - Uses @polkadot/util-crypto

### Key Points to Mention
1. "Notice: No seed phrase shown to user"
2. "This is a real Polkadot address (SS58 format)"
3. "Authentication feels like Gmail, not crypto"
4. "Recovery is as easy as 'Forgot Password'"
5. "Clean UI - zero blockchain jargon"

### Common Demo Questions

**Q: Is this a real wallet?**
A: It generates real Polkadot addresses using @polkadot/util-crypto, but transactions are simulated for demo purposes. Production version would connect to Westend testnet.

**Q: Where are the keys stored?**
A: In this demo, encrypted in localStorage. Production would use platform-specific secure storage (Keychain on iOS, Keystore on Android, Web Crypto API on web).

**Q: How does social recovery work?**
A: Demo simulates it, but production would use threshold cryptography (2-of-3 signatures from trusted contacts to reconstruct wallet).

**Q: Can I actually send DOT?**
A: Not in the demo - transactions are simulated. But the architecture is ready for real blockchain integration.

---

## 🛠️ Troubleshooting

### Port 5173 Already in Use

```bash
# Kill the process using that port (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process

# Or use a different port
npm run dev -- --port 3000
```

### Blank Screen / White Page

1. Check browser console (F12)
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Clear browser cache
4. Try incognito/private mode

### Dependencies Won't Install

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### React/Vite Errors

```bash
# Ensure Node.js version is 18+
node --version

# Update npm
npm install -g npm@latest
```

---

## 📱 Mobile Testing

The app is fully responsive! Test on mobile:

### Option 1: Local Network
```bash
# Start with host flag
npm run dev -- --host

# Access from mobile on same WiFi:
# http://[your-computer-ip]:5173
```

### Option 2: Deploy
Deploy to Vercel/Netlify for instant mobile access.

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR', // Change this
    dark: '#DARKER_SHADE',
  }
}
```

### Change Parachains

Edit `src/utils/parachains.js`:

```javascript
export const parachains = [
  {
    id: 'your-chain',
    name: 'Your Chain',
    icon: '🔗',
    color: '#HEX_COLOR',
  }
];
```

---

## 📊 Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

Output in `dist/` folder - ready to deploy!

---

## 🚀 Deploy in 1 Minute

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, done!
```

Your app is now live at: `https://your-project.vercel.app`

---

## 💬 Get Help

- **Issues**: [GitHub Issues](https://github.com/[username]/PolkaDotHackathon/issues)
- **Documentation**: See `README.md`
- **Deployment**: See `DEPLOYMENT.md`

---

## ✅ Checklist

Before your demo:
- [ ] Tested full user flow
- [ ] Checked on mobile
- [ ] Verified all animations work
- [ ] Tested send transaction
- [ ] Tested recovery flow
- [ ] Practiced 2-minute pitch

---

**You're ready to demo! 🎉**

Show the world how easy Web3 onboarding can be!
