# 🚀 Quick Setup - Perplexity API Integration

## Local Development (2 minutes)

### 1. Create `.env` file

```bash
cd sarkari-type
touch .env
```

### 2. Add your API key

Edit `.env` and add:

```env
VITE_PERPLEXITY_API_KEY=pplx-QZS7FFdcDp...
```

(Replace with your actual API key from the screenshot)

### 3. Restart dev server

```bash
npm run dev
```

**That's it for local! ✅**

---

## GitHub Pages Deployment (1 minute)

### 1. Add GitHub Secret

1. Go to: https://github.com/kostubh/sarkari_type/settings/secrets/actions
2. Click **New repository secret**
3. Name: `VITE_PERPLEXITY_API_KEY`
4. Value: `pplx-QZS7FFdcDp...` (your API key)
5. Click **Add secret**

### 2. Trigger deployment

The GitHub Actions workflow is already updated!

Just push any commit or go to:
https://github.com/kostubh/sarkari_type/actions

And click **Run workflow** manually.

**Your API will work on GitHub Pages! ✅**

---

## ✅ Verify It's Working

1. Open your app
2. Select **AI Generated** text source
3. Choose a topic
4. Click **Generate Text**
5. Check browser console (F12):
   - No "Using sample text" warning = ✅ Working!
   - Shows warning = API key not loaded
6. Check Perplexity dashboard:
   - **Last Used** should show recent timestamp

---

## 🐛 Issues?

See [API_SETUP.md](./API_SETUP.md) for detailed troubleshooting.

**Common fixes:**
- Restart dev server after creating `.env`
- Check API key format (starts with `pplx-`)
- Verify `.env` file is in `sarkari-type/` folder (not root)
