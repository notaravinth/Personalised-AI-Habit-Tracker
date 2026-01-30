# Supabase Authentication Setup Guide

## Step 1: Create Your Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Organization**: Select or create one
   - **Project Name**: `HabitReflect` (or whatever you prefer)
   - **Database Password**: Create a strong password and **SAVE IT SOMEWHERE SAFE**
   - **Region**: Choose closest to you (e.g., US East, Europe, etc.)
4. Click **"Create new project"**
5. ⏳ Wait 1-2 minutes for setup to complete

---

## Step 2: Get Your Project Credentials

1. Once your project is ready, click on **⚙️ Settings** (bottom left sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL** - Copy this (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Project API keys** → **anon public** - Copy this (long string starting with `eyJ...`)

4. **Important:** Copy these to your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...your-long-key-here
   ```

---

## Step 3: Configure Authentication Settings

### Enable Email/Password Authentication

1. Go to **🔐 Authentication** in left sidebar
2. Click **Providers**
3. Find **Email** provider
4. Make sure it's **Enabled** (should be enabled by default)
5. Configure settings:
   - ✅ **Enable Email Confirmations** → Turn this **OFF** for development (turn ON for production)
   - ✅ **Enable Email OTP** → Keep OFF (unless you want magic links)
   - ✅ **Secure email change** → Keep enabled

---

## Step 4: Configure Email Templates (Optional but Recommended)

1. Still in **Authentication** → Click **Email Templates**
2. You'll see templates for:
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

### For Development:
Leave defaults as-is. Supabase will send test emails.

### For Production Later:
Customize these templates with your branding and redirect URLs.

---

## Step 5: Configure Site URL and Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Set:
   - **Site URL**: `http://localhost:5173` (for development)
   - **Redirect URLs**: Add these (one per line):
     ```
     http://localhost:5173/**
     http://localhost:5173/dashboard
     ```

### When you deploy:
Come back and add your production URLs (e.g., `https://yourapp.com`)

---

## Step 6: Disable Email Confirmation for Testing

**Important for Development:**

1. Go to **Authentication** → **Providers** → **Email**
2. Scroll down to **Email Confirmations**
3. **Toggle OFF** "Confirm email" 
4. Click **Save**

This lets you test signup/login without needing to verify emails.

**Note:** Turn this back ON when you go to production!

---

## Step 7: Set Up Password Requirements (Optional)

1. Go to **Authentication** → **Policies**
2. Under **Password** section, configure:
   - Minimum password length (default: 6 characters)
   - Password strength requirements

For development, defaults are fine.

---

## Step 8: Run Your Database Schema

Now run the SQL files we created:

1. Go to **🗄️ SQL Editor** (left sidebar)
2. Click **New query**
3. Run each file in order:
   - Copy `sql/1-core-tables.sql` → Paste → Run
   - Copy `sql/2-social-features.sql` → Paste → Run
   - Copy `sql/3-analytics.sql` → Paste → Run
   - Copy `sql/4-indexes.sql` → Paste → Run
   - Copy `sql/5-functions-triggers.sql` → Paste → Run
   - Copy `sql/6-views.sql` → Paste → Run

---

## Step 9: Test Authentication

### Create a Test User (Manual):

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Fill in:
   - **Email**: your-test@email.com
   - **Password**: TestPassword123!
   - ✅ **Auto Confirm User** (check this)
4. Click **Create user**

You now have a test user you can login with!

---

## Step 10: Verify Everything Works

### Check Tables:
1. Go to **Table Editor**
2. You should see all 6 tables listed

### Check Auth is Working:
1. Go to **Authentication** → **Users**
2. You should see your test user

---

## Your Credentials Summary

After completing these steps, you should have in your `.env` file:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Authentication Flow for Your App

### Your Teammate (Auth Page) Will Use:

**Sign Up:**
```javascript
const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
})
```

**Login:**
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
})
```

**After Login:**
Redirect to `/dashboard` (your page)

### You (Dashboard) Will Use:

**Get Current User:**
```javascript
const { data: { user } } = await supabase.auth.getUser()
```

**Create Profile for New User:**
```javascript
const { error } = await supabase
  .from('profiles')
  .insert([{ 
    id: user.id, 
    full_name: 'User Name',
    onboarding_completed: false 
  }])
```

---

## Common Issues & Solutions

### "Invalid API key" error
- Check your `.env` file has correct URL and key
- Restart your dev server after updating `.env`

### "User already registered" error
- Email already exists
- Check Authentication → Users in Supabase dashboard

### "Email link is invalid" error
- You have email confirmation enabled
- Disable it for development (Step 6)

### Can't login after signup
- Email confirmation might be required
- Check Authentication → Providers → Email settings

---

## Production Checklist (Later)

When you deploy your app:

- ✅ Enable email confirmation
- ✅ Configure custom SMTP (SendGrid, etc.)
- ✅ Update Site URL to your domain
- ✅ Add production redirect URLs
- ✅ Customize email templates
- ✅ Set strong password requirements
- ✅ Enable rate limiting

---

## Next Steps

1. ✅ Complete all steps above
2. ✅ Share credentials with your teammate via `.env` file
3. ✅ They implement login/signup
4. ✅ You implement Dashboard data fetching

Your authentication is now ready! 🎉
