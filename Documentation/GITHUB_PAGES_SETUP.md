# GitHub Pages Setup Guide for SarkariType

This guide explains how to turn your repository into a live website using **GitHub Pages** - no local builds required!

---

## What is GitHub Pages?

GitHub Pages automatically builds and deploys your website whenever you push code. It's **completely free** and handles the entire build process for you.

---

## Initial Setup (One-time)

### Step 1: Make Your Repository Public (Required for Free GitHub Pages)

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Visibility** section
4. Click **Change visibility**
5. Select **Public** and confirm

> **Note**: For a public repo, your code is visible to everyone (which is fine - it's just HTML/CSS/JS). Your API keys are **NOT** stored in the code - they're stored as GitHub Secrets (see below).

---

### Step 2: Configure GitHub Pages

1. In repository **Settings**, scroll to **Pages** (left sidebar)
2. Under "Build and deployment":
   - **Source**: Select `GitHub Actions`
3. No other changes needed - the workflow file handles everything

---

### Step 3: Set up Your Perplexity API Key as a Secret

This keeps your API key secure and hidden from the code.

1. Go to repository **Settings**
2. Click **Secrets and variables** → **Actions** (left sidebar)
3. Click **New repository secret**
4. Name: `PERPLEXITY_API_KEY`
6. Click **Add secret**

Now your API key is secure and only used during the build.

---

## Deployment Workflow

### Every Time You Want to Deploy:

```
1. Edit code files in your IDE or GitHub web editor
   ↓
2. Commit and push to GitHub
   ↓
3. GitHub Actions automatically:
   - Installs dependencies (npm)
   - Builds the React app (vite build)
   - Generates the Cloudflare Worker
   - Deploys to GitHub Pages
   ↓
4. Your site is live at: https://yourusername.github.io/sarkari-type
```

**No local setup needed. Just push and it works.**

---

## Quick Start Guide

### Option A: Edit Files in GitHub Web Editor (Easiest)

1. Go to your GitHub repository
2. Click any file
3. Click the pencil icon (✏️) to edit
4. Make changes
5. Click "Commit changes" and confirm
6. Watch the build in **Actions** tab

### Option B: Clone and Edit Locally (With Node.js Installed)

If you later want to test locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/sarkari-type.git
cd sarkari-type/sarkari-type

# Install dependencies
npm install

# Start dev server (auto-reloads on save)
npm run dev

# When ready to deploy, just push to GitHub
git add .
git commit -m "Update feature"
git push
```

---

## Viewing Build Status

After pushing code:

1. Go to your repository
2. Click **Actions** tab (top)
3. You'll see your workflow running
4. Green checkmark ✓ = Successful build
5. Red X = Build failed (check logs for errors)

---

## Your Live Website URL

Once the first build succeeds, your site will be live at:

```
https://yourusername.github.io/sarkari-type
```

(Replace `yourusername` with your GitHub username)

---

## Making Code Changes

### File Structure for GitHub Pages

All editable files are in `/sarkari-type/src/`:

```
sarkari-type/
├── src/
│   ├── components/          ← Edit React components here
│   ├── utils/               ← Edit algorithms here
│   ├── App.tsx              ← Main app file
│   ├── App.css              ← Global styles
│   └── index.css            ← Tailwind styles
├── public/                  ← Favicon and static assets
├── package.json             ← Dependencies (auto-managed)
└── vite.config.ts          ← Build configuration
```

### Three Ways to Edit:

#### 1. GitHub Web Editor (No setup)
- Click pencil icon on any file
- Edit and commit
- Automatic build

#### 2. VS Code Desktop (If you want to)
- Install [Visual Studio Code](https://code.microsoft.com)
- Install [Git](https://git-scm.com)
- Clone: `git clone <your-repo-url>`
- Edit files in VS Code
- Commit and push

#### 3. GitHub Codespaces (GitHub's online VS Code - Free)
- Click **Code** button on repo
- Select **Codespaces** tab
- Click **Create codespace on main**
- VS Code opens in browser
- Edit, commit, push - all done

---

## Testing Before Deployment

### In GitHub Web Editor

1. Edit a file
2. Click green **Commit changes** button
3. Go to **Actions** tab
4. Wait for green checkmark
5. Visit `https://yourusername.github.io/sarkari-type` to see your changes

### With Local Development

```bash
npm run dev   # Starts http://localhost:5173
# Make changes, see them instantly
npm run build # Test production build
```

---

## Troubleshooting

### Build Failed (Red X in Actions)

1. Click on the failed workflow
2. Click **Build** job
3. Read the error message
4. Common issues:
   - Missing dependencies in `package.json`
   - Syntax errors in code
   - Missing environment variables

### Site Shows 404 After Build

- Wait 1-2 minutes for GitHub Pages to update
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Check the URL is: `https://yourusername.github.io/sarkari-type/`

### API Key Not Working

1. Check secret is added (Settings → Secrets and variables → Actions)
2. Check the workflow file references the secret correctly
3. Rebuild by pushing a dummy commit: `git commit --allow-empty -m "trigger rebuild"`

---

## Environment Variables for Different APIs

### For Cloudflare Worker (Advanced)

If you want to use Cloudflare Worker instead of direct API calls:

1. Create Cloudflare account at [cloudflare.com](https://cloudflare.com)
2. Set up Worker (free tier includes 100k requests/day)
3. Add Worker URL to GitHub secret: `CLOUDFLARE_WORKER_URL`
4. Update code to call Worker instead of Perplexity directly

---

## Free Hosting Summary

| Service | Cost | What It Does |
|---------|------|------------|
| GitHub Pages | Free | Hosts your built website |
| GitHub Actions | Free | Builds and deploys automatically |
| Perplexity Sonar API | Paid | Generates AI text (uses your API key) |
| Cloudflare Workers | Free (100k req/day) | Optional: hide API key, proxy calls |

---

## FAQ

**Q: Will everyone see my API key?**
A: No. The key is only stored in GitHub Secrets. It's used during the build process and embedded securely in the production code (never visible to users).

**Q: Can I use a private repository?**
A: Yes! Private repos get GitHub Pages too, but you need GitHub Pro ($4/month) or you can keep it public. Since it's just your personal project, public is fine.

**Q: How do I see my site?**
A: After a successful build, visit: `https://yourusername.github.io/sarkari-type/`

**Q: Can I use a custom domain?**
A: Yes, in Settings → Pages → Custom domain (requires DNS setup).

**Q: Can I test locally before pushing?**
A: Yes, with `npm run dev` if you have Node.js installed. It's optional.

---

## Giving Feedback on the Webapp

For each deployment:

1. **Make a screenshot** of what you see
2. **Note what you like/dislike**
3. **Open an Issue** on GitHub with:
   - Screenshot
   - What you were testing
   - What worked/didn't work
4. **I'll fix it and deploy** the next version

This way we iterate quickly without you needing to touch any code!

---

## Next Steps

1. ✅ Make repo **public** (Settings → Visibility)
2. ✅ Enable **GitHub Pages** (Settings → Pages, Source: GitHub Actions)
3. ✅ Add secret **PERPLEXITY_API_KEY** (Settings → Secrets and variables)
4. ✅ Push the project files (I'm creating them now)
5. ✅ Watch **Actions** tab for first build
6. ✅ Visit your site URL and send feedback!

---

## Support

If something breaks:
1. Check the Actions tab for error logs
2. Open a GitHub Issue describing what went wrong
3. I'll investigate and fix

You've got this! 🚀
