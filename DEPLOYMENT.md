# 🚀 eListaMo Deployment Guide

## Quick Fix for Vercel 404 Issues

If you're getting 404 errors on Vercel, follow these steps:

### ✅ Files Added to Fix 404:

1. **`vercel.json`** - Contains SPA rewrites configuration
2. **`public/_redirects`** - Fallback for client-side routing
3. **Updated `vite.config.ts`** - Proper base path configuration

### 🛠️ Manual Deployment Steps:

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New Project"**
3. **Import from GitHub**: Select `miloai404-ai/eListaMo`
4. **Configure Project**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build` 
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **Add Environment Variables** (if using Supabase):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
6. **Click Deploy**

### 🔧 If Still Getting 404:

1. **Check Build Logs** in Vercel dashboard
2. **Verify** that `dist/index.html` exists after build
3. **Force Redeploy** by pushing a small commit
4. **Check Functions Tab** - should show no functions for SPA

### 🌐 Expected Routes:
- `/` - Landing page
- `/login` - Login page  
- `/dashboard` - Dashboard (after login)

### 🐛 Common Issues:

**Issue**: Routes work on dev but 404 on Vercel
**Solution**: The `vercel.json` rewrite rules should fix this

**Issue**: Build fails
**Solution**: Check that all dependencies are in `package.json`

**Issue**: Blank page
**Solution**: Check browser console for errors, likely missing env vars

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

---

**Need help?** Check the latest commit - all fixes have been applied! 🇵🇭
