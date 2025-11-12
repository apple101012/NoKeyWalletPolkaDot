# NoKey Wallet - Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers the best performance and easiest deployment for Vite + React apps.

#### Method A: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? nokey-wallet
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

#### Method B: Vercel Git Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

**Your app will be live at**: `https://your-project-name.vercel.app`

---

### Option 2: Netlify

Another excellent option with similar ease of use.

#### Method A: Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Build and deploy
npm run build
netlify deploy

# For production
netlify deploy --prod
```

#### Method B: Netlify Git Integration

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

---

### Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add to package.json scripts:
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Add base path to vite.config.js:
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})

# Deploy
npm run deploy
```

**Your app will be live at**: `https://your-username.github.io/your-repo-name/`

---

### Option 4: Render

```bash
# No CLI needed, just web interface:
```

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New" → "Static Site"
4. Connect your repository
5. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. Click "Create Static Site"

---

### Option 5: Cloudflare Pages

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
npm run build
wrangler pages publish dist --project-name=nokey-wallet
```

---

## 🔧 Build Configuration

### Environment Variables

For production, you may want to add:

```bash
# .env.production
VITE_APP_TITLE=NoKey Wallet
VITE_NETWORK_URL=wss://westend-rpc.polkadot.io
```

### Build Optimization

The project is already optimized with:
- Vite's automatic code splitting
- Tree shaking for unused code
- CSS minification
- Modern ES modules

### Production Build Locally

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

---

## 📊 Performance Tips

1. **Enable Compression**: Most hosting platforms do this automatically
2. **CDN**: Vercel, Netlify, and Cloudflare provide global CDN by default
3. **Caching**: Configure cache headers (hosting platforms handle this)
4. **Analytics**: Add Vercel Analytics or Google Analytics if needed

---

## 🔒 Security Considerations for Production

**⚠️ Important**: This is a demo/proof-of-concept. Before production:

1. **Storage**: Replace localStorage with:
   - iOS: Keychain Services
   - Android: Android Keystore
   - Web: Web Crypto API + IndexedDB

2. **Authentication**: Implement real:
   - WebAuthn/FIDO2 for biometric
   - OAuth/OIDC for email recovery
   - Threshold cryptography for social recovery

3. **Network**: Connect to real blockchain:
   - Use @polkadot/api for real connections
   - Implement proper error handling
   - Add transaction confirmation

4. **Encryption**: Use platform-specific:
   - Web Crypto API instead of crypto-js
   - Hardware-backed keys where available
   - Secure key derivation (PBKDF2, Argon2)

---

## 📱 Custom Domain

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown
4. Wait for SSL certificate (automatic)

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS
4. HTTPS is automatic

---

## 🐛 Troubleshooting

### Build fails with "Module not found"

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Blank page after deployment

- Check browser console for errors
- Verify `base` path in vite.config.js
- Ensure all assets are in `public/` or imported in components

### Environment variables not working

- Ensure they start with `VITE_`
- Rebuild after adding new env vars
- Check hosting platform's environment variable settings

---

## 📞 Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- GitHub Pages: [pages.github.com](https://pages.github.com)

---

**Recommended**: Use Vercel for the fastest and easiest deployment experience.
