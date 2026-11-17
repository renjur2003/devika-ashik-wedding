# Live Deployment Guide — Devika & Ashik Wedding Website

This project is structured for effortless zero-cost deployment:
- **Prerequisite:** GitHub Repository
- **Backend:** Render (Free Web Service for RSVP API)
- **Frontend:** Vercel (Free Vite React static hosting)

---

## Step 1: Push Code to GitHub

1. Go to [github.com/new](https://github.com/new) in your browser.
2. Enter a repository name: `devika-ashik-wedding`.
3. Choose **Public** or **Private**, and leave all "Initialize this repository with" checkboxes empty.
4. Click **Create repository**.
5. Copy the commands shown on GitHub, or run these in your PowerShell inside `m:\digital invitation-devika`:
   ```powershell
   git remote add origin https://github.com/<YOUR_USERNAME>/devika-ashik-wedding.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy Backend on Render (Free)

1. Go to [render.com](https://render.com/) and sign up / log in with your GitHub account.
2. Click **New +** → **Web Service**.
3. Select your `devika-ashik-wedding` repository.
4. Fill in these 5 simple fields:
   - **Name:** `devika-ashik-backend`
   - **Region:** Singapore (or nearest location)
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Instance Type:** `Free`
5. Click **Create Web Service**.
6. Wait 1–2 minutes for it to build. Once live, Render gives you a URL (e.g., `https://devika-ashik-backend.onrender.com`).
   *Test it by opening `https://<YOUR-RENDER-URL>/api/health` in your browser — it will show `status: ok`.*

---

## Step 3: Deploy Frontend on Vercel (Free)

1. Go to [vercel.com](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New...** → **Project**.
3. Find your `devika-ashik-wedding` repository and click **Import**.
4. Settings will automatically detect:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Open the **Environment Variables** accordion and add:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://devika-ashik-backend.onrender.com` *(paste your Render backend URL from Step 2)*
6. Click **Deploy**.

🎉 **Your website is now 100% LIVE!** Vercel gives you an instant, secure HTTPS link like `https://devika-ashik-wedding.vercel.app` that you can share with all your guests on WhatsApp and social media!

