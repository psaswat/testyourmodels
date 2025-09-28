# 🔥 Firebase Authentication Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `testyourmodels-blog`
4. Enable Google Analytics (optional)
5. Click **"Create project"**

## Step 2: Enable Authentication

1. In your Firebase project, go to **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable the following providers:
   - ✅ **Email/Password** (enable)
   - ✅ **Google** (enable)
   - ✅ **Facebook** (enable - optional)

## Step 3: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"**
3. Click **"Web"** icon (`</>`)
4. Register app with name: `testyourmodels-blog`
5. Copy the **config object**

## Step 4: Update Your Code

Replace the placeholder config in `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Configure OAuth Providers

### Google OAuth:
1. In Authentication > Sign-in method > Google
2. Add your domain to **Authorized domains**
3. For development, add: `localhost:3000`

### Facebook OAuth (Optional):
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Get App ID and App Secret
5. Add to Firebase Authentication > Facebook provider

## Step 6: Test Your Setup

1. Run your app: `npm start`
2. Click "Sign In" button
3. Try creating an account with email/password
4. Try signing in with Google
5. Check Firebase Console > Authentication > Users

## 🎯 Features You'll Get:

- ✅ **Email/Password Authentication**
- ✅ **Google Sign-In**
- ✅ **Facebook Sign-In** (if configured)
- ✅ **User Profile Management**
- ✅ **Secure Session Handling**
- ✅ **Password Reset** (built-in)
- ✅ **Email Verification** (built-in)

## 📊 Free Tier Limits:

- **10,000 verifications/month** (more than enough for a blog)
- **Unlimited users**
- **All authentication methods included**
- **No credit card required**

## 🚀 Next Steps:

Once configured, your authentication will be fully functional with:
- Real user accounts
- Secure password handling
- Social login options
- Admin panel protection
- User profile management

Your blog is now ready for production! 🎉
