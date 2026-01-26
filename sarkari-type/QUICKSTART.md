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

(Replace with your actual API key from the Perplexity dashboard)

### 3. Restart dev server

```bash
npm run dev
```

**That's it for local! ✅**

---

## GitHub Pages Deployment (Already Done! ✅)

### You've Already Added the Secret!

I can see you've already added `PERPLEXITY_API_KEY` to your repository secrets. Perfect! 🎉

The GitHub Actions workflow is now updated to use your secret automatically.

### Next Deploy Will Use Your API Key

The next time you:
- Push any commit to master, OR
- Manually trigger the workflow at: https://github.com/kostubh/sarkari_type/actions

Your Perplexity API will be integrated into the deployed site!

**Note:** If you want to match the naming convention exactly, you can optionally rename your secret from `PERPLEXITY_API_KEY` to `VITE_PERPLEXITY_API_KEY`, but it's not required - the workflow now works with your current naming.

---

## ✅ Verify It's Working

### After Next Deployment:

1. Open your GitHub Pages site: https://kostubh.github.io/sarkari_type/
2. Select **AI Generated** text source
3. Choose a topic (e.g., "Technology")
4. Click **Generate Text**
5. If you see fresh, unique text each time (not repeated samples) = ✅ API Working!
6. Check [Perplexity dashboard](https://www.perplexity.ai/settings/api):
   - **Last Used** column should show recent timestamp after generation

### For Local Development:

1. Create `.env` file with your API key (see above)
2. Restart dev server
3. Test text generation
4. Check browser console (F12):
   - No "Using sample text" warning = ✅ Working!
   - Shows warning = API key not loaded locally

---

## 🐛 Issues?

See [API_SETUP.md](./API_SETUP.md) for detailed troubleshooting.

**Common fixes:**
- **Local**: Restart dev server after creating `.env`
- **Local**: Check API key format (starts with `pplx-`)
- **Local**: Verify `.env` file is in `sarkari-type/` folder (not root)
- **GitHub Pages**: Wait for deployment to complete after pushing
- **GitHub Pages**: Check Actions tab for any build errors
