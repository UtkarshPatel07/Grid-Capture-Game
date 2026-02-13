# 🚀 Deployment Guide - Make Your App Live!

## 📋 What You Need

1. **GitHub Account** (free) - to store your code
2. **MongoDB Atlas Account** (free) - cloud database
3. **Render Account** (free) - for backend hosting
4. **Vercel Account** (free) - for frontend hosting

---

## STEP 1: Push Code to GitHub (5 minutes)

### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `grid-capture-game`
3. Description: "Real-time multiplayer grid capture game"
4. Keep it **Public** (for free hosting)
5. Click **Create repository**

### 1.2 Push Your Code

Open terminal in your project folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Grid Capture Game"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/grid-capture-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ **Your code is now on GitHub!**

---

## STEP 2: Setup MongoDB Atlas (10 minutes)

### 2.1 Create Account & Cluster

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create a **FREE M0 cluster**
   - Provider: AWS
   - Region: Choose closest to you
   - Cluster Name: `grid-capture`
4. Click **Create**

### 2.2 Setup Database Access

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
   - Username: `gridcapture`
   - Password: Click **Autogenerate Secure Password** (SAVE THIS!)
   - Database User Privileges: **Read and write to any database**
3. Click **Add User**

### 2.3 Setup Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 2.4 Get Connection String

1. Go to **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://gridcapture:<password>@grid-capture.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>` with the password you saved earlier**

✅ **Save this connection string - you'll need it!**

---

## STEP 3: Deploy Backend to Render (10 minutes)

### 3.1 Create Render Account

1. Go to https://render.com/
2. Sign up with GitHub (easier)

### 3.2 Create Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository: `grid-capture-game`
3. Configure:
   - **Name**: `grid-capture-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 3.3 Add Environment Variables

Click **Advanced** → **Add Environment Variable**:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 2.4 |
| `PORT` | `3001` |
| `NODE_ENV` | `production` |

4. Click **Create Web Service**

⏳ **Wait 5-10 minutes for deployment...**

✅ **When done, you'll get a URL like**: `https://grid-capture-backend.onrender.com`

**SAVE THIS URL!**

---

## STEP 4: Deploy Frontend to Vercel (5 minutes)

### 4.1 Create Vercel Account

1. Go to https://vercel.com/signup
2. Sign up with GitHub

### 4.2 Import Project

1. Click **Add New** → **Project**
2. Import your GitHub repository: `grid-capture-game`
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 4.3 Add Environment Variable

Click **Environment Variables**:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SOCKET_URL` | Your Render backend URL (e.g., `https://grid-capture-backend.onrender.com`) |

4. Click **Deploy**

⏳ **Wait 2-3 minutes for deployment...**

✅ **When done, you'll get a URL like**: `https://grid-capture-game.vercel.app`

---

## 🎉 YOU'RE LIVE!

Your app is now accessible to anyone at:
**https://grid-capture-game.vercel.app**

---

## 📱 Share Your App

Send this link to friends/recruiters:
```
https://grid-capture-game.vercel.app
```

Add to your resume:
```
Grid Capture - Real-time Multiplayer Game
Live Demo: https://grid-capture-game.vercel.app
GitHub: https://github.com/YOUR_USERNAME/grid-capture-game
```

---

## 🔧 Troubleshooting

### Frontend can't connect to backend?

1. Check `NEXT_PUBLIC_SOCKET_URL` in Vercel environment variables
2. Make sure it's your Render backend URL (with `https://`)
3. Redeploy frontend after changing env vars

### Backend shows "MongooseServerSelectionError"?

1. Check MongoDB Atlas connection string is correct
2. Make sure you replaced `<password>` with actual password
3. Check Network Access allows 0.0.0.0/0

### App is slow on first load?

- Render free tier sleeps after 15 minutes of inactivity
- First request wakes it up (takes 30-60 seconds)
- This is normal for free hosting!

---

## 💡 Pro Tips

1. **Custom Domain**: Vercel allows free custom domains
2. **Auto-Deploy**: Push to GitHub → Auto-deploys to Vercel/Render
3. **Logs**: Check Render/Vercel dashboards for error logs
4. **Monitoring**: Both platforms show usage stats

---

**Congratulations! Your app is live! 🚀**

