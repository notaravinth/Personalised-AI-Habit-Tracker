# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: HabitReflect (or your preferred name)
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose closest to your location
5. Click "Create new project"
6. Wait for the project to be set up (1-2 minutes)

## 2. Run the Database Schema

1. In your Supabase project dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste it into the SQL editor
5. Click **"Run"** or press `Ctrl+Enter` / `Cmd+Enter`
6. You should see a success message

This creates:
- ✅ `profiles` table (user profiles)
- ✅ `habits` table (user habits)
- ✅ `habit_logs` table (daily check-ins)
- ✅ Row Level Security policies (users can only see their own data)
- ✅ Indexes for performance

## 3. Get Your Credentials

1. In your Supabase dashboard, go to **Settings** > **API** (left sidebar)
2. Find these two values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (looks like: `eyJhbGc...` - long string)

## 4. Configure Your Local Environment

1. Open the `.env` file in the project root
2. Replace the placeholder values with your actual credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

3. Save the file

## 5. Share Credentials With Your Team

**IMPORTANT**: Do NOT commit the `.env` file to Git (it's already in `.gitignore`)

**To share with teammates:**
1. Send them the Supabase URL and anon key via Slack/Discord/Email (secure channel)
2. They should add these values to their own local `.env` file
3. Reference `.env.example` for the format

## 6. Enable Email Authentication (Optional)

By default, Supabase has email/password auth enabled. To customize:

1. Go to **Authentication** > **Providers** in Supabase dashboard
2. Configure email settings or add social providers (Google, GitHub, etc.)

## 7. Test the Connection

Restart your dev server after adding the `.env` file:

```bash
npm run dev
```

The app should now be able to connect to Supabase!

## Database Structure

### Tables Created:

**profiles**
- User profile information (name, avatar)
- Linked to Supabase Auth users

**habits**
- User's habits (title, description)
- Each user can have multiple habits

**habit_logs**
- Daily check-ins for each habit
- Tracks: status, reflection, energy level
- One log per habit per day

## Security

✅ Row Level Security (RLS) is enabled
✅ Users can only access their own data
✅ All operations are authenticated
✅ Credentials are in `.env` (not committed to Git)

## Next Steps

1. **Your teammate** can implement authentication using `supabase.auth.signUp()` and `supabase.auth.signInWithPassword()`
2. **You** can start fetching and saving data in the Dashboard
3. Import the supabase client: `import { supabase } from '../lib/supabase'`

## Troubleshooting

**"Missing Supabase environment variables" error:**
- Make sure `.env` file exists in project root
- Restart your dev server after creating `.env`
- Check that variables start with `VITE_` prefix

**Can't connect to database:**
- Verify URL and key are correct
- Check Supabase project is active (not paused)
- Check browser console for errors

**RLS errors:**
- Make sure user is authenticated before querying
- Check policies in Supabase dashboard (Authentication > Policies)
