# SarkariType - Deployment Checklist

Follow these steps to get your app live on GitHub Pages!

---

## Phase 1: Prepare Your Repository ✅

- [ ] All files are in `/sarkari-type/` folder
- [ ] `sarkari-type/` subfolder contains the React app
- [ ] Check `.gitignore` is in place
- [ ] No `node_modules/` folder is committed

**Verify**: Run `git status` in your terminal
```bash
cd sarkari-type
git status
```

Expected output: Only source files, no `node_modules` or `dist`.

---

## Phase 2: Initial Git Setup ✅

- [ ] Repository initialized: `git init`
- [ ] Remote added: `git remote add origin https://github.com/yourusername/sarkari-type.git`
- [ ] Initial commit made

**Commands**:
```bash
cd sarkari-type
git add .
git commit -m "Initial SarkariType project setup"
```

---

## Phase 3: GitHub Repository Settings 🔧

### Make Repository Public

- [ ] Go to GitHub repository
- [ ] Click **Settings** (top right)
- [ ] Scroll to **Visibility**
- [ ] Click **Change visibility**
- [ ] Select **Public**
- [ ] Confirm

**Why?** Free GitHub Pages requires public repo.

### Enable GitHub Pages

- [ ] In **Settings**, click **Pages** (left sidebar)
- [ ] Under "Build and deployment"
- [ ] Set **Source** to **GitHub Actions**
- [ ] Click **Save**

**Expected**: Green checkmark appears with "Ready to deploy"

---

## Phase 4: Push Code to GitHub 🚀

```bash
cd sarkari-type
git push -u origin main
```

Or if your branch is `master`:
```bash
git push -u origin master
```

**Expected output**:
```
Enumerating objects: ...
Counting objects: ...
Compressing objects: ...
Writing objects: ...
...
Branch 'main' set up to track remote 'origin/main'.
```

---

## Phase 5: Monitor First Build 👀

1. Go to your GitHub repository
2. Click **Actions** tab (top menu)
3. You should see a workflow named "Build and Deploy to GitHub Pages"
4. Watch the status:
   - ⏳ Yellow dot = Building
   - ✅ Green checkmark = Success
   - ❌ Red X = Error

**Expected time**: 2-3 minutes for first build

### If Build Fails

1. Click on the failed workflow
2. Click on **Build** job
3. Read the error message
4. Common issues:
   - Missing dependency in `package.json`
   - TypeScript error in code
   - Path misconfiguration

**Need help?** Check the error and let me know.

---

## Phase 6: First Deployment Confirmation ✅

After build succeeds:

1. Go to **Settings** → **Pages**
2. Look for green checkmark: "Your site is published"
3. Copy the URL

**Your site is at:**
```
https://yourusername.github.io/sarkari-type/
```

Replace `yourusername` with your GitHub username.

4. **Click the link and test the app!**

---

## Phase 7: Test the Application 🧪

### On Pre-Test Screen

- [ ] Page loads without errors
- [ ] "Generate AI Text" button works
- [ ] "Fetch Wikipedia" button works
- [ ] Can paste custom text
- [ ] "Start Test" button activates
- [ ] Scoring options visible
- [ ] Display settings visible

### On During-Test Screen

- [ ] Timer counts down/up correctly
- [ ] Typing input works
- [ ] Reference text visible
- [ ] Stats bar shows:
  - [ ] WPM
  - [ ] Accuracy
  - [ ] Mistakes
  - [ ] Timer
- [ ] Pause/Resume buttons work
- [ ] Submit button works
- [ ] Fullscreen button works

### On Post-Test Screen

- [ ] Congratulations message displays
- [ ] Results show:
  - [ ] Final WPM
  - [ ] Accuracy
  - [ ] Score
  - [ ] Duration
- [ ] Text comparison shows
- [ ] Colors are correct:
  - [ ] Green for correct
  - [ ] Red for errors
  - [ ] Yellow/Orange for other errors
- [ ] "Download PDF" button works
- [ ] "Try Again" button works

---

## Phase 8: Make Updates 🔄

### When You Want to Change Something

#### Option A: GitHub Web Editor (Easiest)

1. Go to your repository on GitHub
2. Navigate to the file
3. Click the pencil icon ✏️
4. Make changes
5. Scroll down and click "Commit changes"
6. Enter a message (e.g., "Fix button color")
7. Click "Commit"

#### Option B: Command Line

```bash
cd sarkari-type/sarkari-type/src

# Edit a file (using your IDE)
# Then commit:

git add .
git commit -m "Update something"
git push
```

### Automatic Deployment

After every push:
1. GitHub Actions automatically builds
2. Deploys to GitHub Pages
3. Changes visible in 2-3 minutes

---

## Phase 9: Provide Feedback 💬

After testing, create a GitHub Issue:

1. Go to your repository
2. Click **Issues** tab
3. Click **New Issue**
4. Use this template:

```markdown
## What I Was Testing
Testing the pre-test screen configuration

## What Worked
- Time configuration dropdown
- Custom text paste

## What Didn't Work
- AI text generation button throws error
- Screenshot: [attach screenshot]

## Expected Behavior
AI text button should generate random text

## Browser & OS
Chrome on Windows 11
```

---

## Phase 10: Iterate 🔁

After I fix something:

1. Wait for green checkmark in Actions
2. Refresh your site (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
3. Test the changes
4. Send feedback on what you think
5. Repeat until happy!

---

## Common Issues & Solutions

### Issue: Site shows 404 error

**Solution**:
- Wait 5 minutes for Pages to update
- Hard refresh: `Ctrl+Shift+R`
- Check URL: `https://yourusername.github.io/sarkari-type/`

### Issue: Build failed (red X in Actions)

**Solution**:
1. Click the failed workflow
2. Click "Build" job
3. Read the error at the bottom
4. Common fixes:
   - Check syntax in edited file
   - Ensure file path is correct
   - Reinstall dependencies: `npm install`

### Issue: Typing feels slow/laggy

**Solution**:
- Close other browser tabs
- Try a different browser
- Check: Settings → disable "Guide Pointer"
- Close CPU-heavy applications

### Issue: Can't see changes after pushing

**Solution**:
- Wait 2-3 minutes for build
- Check Actions tab - is it green?
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache

---

## Success Criteria

✅ You can:
- [ ] Access your app at `https://yourusername.github.io/sarkari-type/`
- [ ] Click through all three screens
- [ ] Type text and see WPM updates
- [ ] Download PDF report
- [ ] Make code edits in GitHub web editor
- [ ] See changes deploy automatically
- [ ] Report issues via GitHub Issues

---

## Timeline

| Step | Time |
|------|------|
| Push code | Immediate |
| First build | 2-3 minutes |
| Site goes live | Immediate after build |
| Make change | 1 minute to code |
| Deploy change | 2-3 minutes for build |
| **Total time to live** | **5 minutes** |

---

## Support

If you get stuck:

1. Check [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) for detailed instructions
2. Check [QUICK_START.md](QUICK_START.md) for overview
3. Open a GitHub Issue with:
   - Screenshot
   - What you were trying to do
   - Error message (if any)

---

## Next Steps

1. ✅ Commit files: `git add . && git commit -m "..."`
2. ✅ Push to GitHub: `git push origin main`
3. ✅ Make repo public
4. ✅ Enable GitHub Pages
5. ✅ Wait for build (check Actions tab)
6. ✅ Visit your live site!
7. ✅ Test thoroughly
8. ✅ Send feedback

**You've got this! 🚀**
