# API Setup Guide

This guide explains how to set up the Perplexity API for AI-generated text in SarkariType.

## 🔑 Getting Your Perplexity API Key

1. Visit [Perplexity API Settings](https://www.perplexity.ai/settings/api)
2. Click "+ Generate API Key"
3. Give it a name (e.g., "SarkariType")
4. Copy the generated API key (starts with `pplx-`)

## 🛠️ Local Development Setup

### Step 1: Create `.env` File

In the `sarkari-type` folder, create a `.env` file:

```bash
cd sarkari-type
cp .env.example .env
```

### Step 2: Add Your API Key

Edit the `.env` file and add your API key:

```env
VITE_PERPLEXITY_API_KEY=pplx-YOUR_ACTUAL_KEY_HERE
```

**Example:**
```env
VITE_PERPLEXITY_API_KEY=pplx-QZS7FFdcDp...
```

### Step 3: Restart Development Server

If the dev server is running, restart it to load the environment variables:

```bash
npm run dev
```

## 🌐 GitHub Pages / Production Setup

For GitHub Pages deployment, you need to use **GitHub Secrets** to protect your API key.

### Step 1: Add GitHub Secret

1. Go to your repository: `https://github.com/kostubh/sarkari_type`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `VITE_PERPLEXITY_API_KEY`
5. Value: Your API key (e.g., `pplx-QZS7FFdcDp...`)
6. Click **Add secret**

### Step 2: Update GitHub Actions Workflow

Update `.github/workflows/deploy.yml` to inject the secret during build:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        working-directory: ./sarkari-type
        run: npm install
      
      - name: Build
        working-directory: ./sarkari-type
        env:
          VITE_PERPLEXITY_API_KEY: ${{ secrets.VITE_PERPLEXITY_API_KEY }}
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './sarkari-type/dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 🧪 Testing the API Integration

### Test in Browser Console

1. Open your app in browser
2. Open DevTools Console (F12)
3. Run:

```javascript
console.log('API Key configured:', import.meta.env.VITE_PERPLEXITY_API_KEY ? 'Yes ✓' : 'No ✗');
```

### Test Text Generation

1. Select **AI Generated** text source
2. Choose a topic (e.g., "Technology")
3. Click **Generate Text**
4. Check browser console for:
   - ✅ Success: No warnings, text generated
   - ⚠️ Fallback: "Using sample text" warning = API key missing
   - ❌ Error: Check API key validity

## 📊 Monitoring API Usage

1. Visit [Perplexity API Settings](https://www.perplexity.ai/settings/api)
2. Check the **Last Used** column
3. If it shows a recent timestamp after generating text, the API is working! ✅

## 🔒 Security Notes

- ⚠️ **Never commit `.env` file** - It's in `.gitignore` for safety
- ⚠️ **Don't share your API key** publicly
- ✅ Use GitHub Secrets for production deployment
- ✅ Rotate API keys periodically

## 🐛 Troubleshooting

### Issue: "Using sample text" warning

**Cause:** API key not found or invalid

**Fix:**
1. Check `.env` file exists in `sarkari-type/` folder
2. Verify key format: `VITE_PERPLEXITY_API_KEY=pplx-...`
3. Restart dev server after creating `.env`

### Issue: "API request failed: 401"

**Cause:** Invalid or expired API key

**Fix:**
1. Verify API key is correct
2. Check if key was deleted on Perplexity dashboard
3. Generate a new key if needed

### Issue: "API request failed: 429"

**Cause:** Rate limit exceeded

**Fix:**
1. Wait a few minutes
2. Check your API plan limits
3. Consider upgrading if needed

### Issue: Works locally but not on GitHub Pages

**Cause:** GitHub Secret not configured

**Fix:**
1. Add `VITE_PERPLEXITY_API_KEY` to GitHub Secrets
2. Update GitHub Actions workflow to inject secret
3. Re-run deployment workflow

## 💡 Fallback Behavior

The app is designed to **gracefully fallback** to sample text if:
- No API key is configured
- API request fails
- Network issues occur

This ensures the app always works, even without API access!

## 📝 Cost Considerations

Perplexity API pricing (as of 2026):
- **Free tier**: Limited requests per month
- **Sonar model**: ~$0.20 per 1M tokens

**Estimate for SarkariType:**
- 100-word text ≈ 150 tokens
- 1000 generations ≈ 150K tokens ≈ $0.03

Very affordable for personal use! 🎉
