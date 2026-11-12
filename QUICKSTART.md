# Quick Start Guide - Pixella

## 🚀 Get Pixella Running in 15 Minutes!

### Step 1: Install Dependencies (2 mins)
```bash
cd c:\Users\Srikanth\OneDrive\Desktop\Job\pixella
npm install
```

### Step 2: Set Up Supabase (5 mins)

1. **Create Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose name: "pixella"
   - Choose password and region

2. **Get API Keys**
   - Go to Settings → API
   - Copy "Project URL" and "anon public" key

3. **Create `.env.local` file:**
```bash
# Copy from template
cp env.example .env.local
```

4. **Edit `.env.local` and add:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
OPENAI_API_KEY=your_openai_key_here
```

### Step 3: Set Up Database (3 mins)

1. In Supabase, go to "SQL Editor"
2. Click "New Query"
3. Copy and paste content from:
   - `supabase/migrations/001_initial_schema.sql`
   - Run it
4. Create another new query
5. Copy and paste content from:
   - `supabase/migrations/002_rls_policies.sql`
   - Run it

6. **Enable pgvector:**
   - Go to Database → Extensions
   - Search for "vector"
   - Enable it

### Step 4: Get OpenAI API Key (2 mins)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up/Login
3. Go to API Keys
4. Create new key
5. Copy and add to `.env.local`

### Step 5: Run the App! (1 min)

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🎉 That's It!

You should now see:
- ✅ Beautiful landing page
- ✅ Login/Signup pages
- ✅ All features working

---

## 🧪 Test the Features

### Test Resume Parser
1. Go to `/signup` and create account
2. Go to `/dashboard/profile`
3. Upload a resume (PDF or TXT)
4. See AI parse your skills!

### Test Job Matching
1. Browse jobs at `/jobs`
2. Click on a job
3. See your match score!

### Test Interview Prep
1. Go to `/interview-prep`
2. Enter a job title
3. Get AI-generated questions!

---

## 📝 Optional: Add Sample Data

Want to see the platform with data? Add some jobs manually in Supabase:

1. Go to Table Editor → companies
2. Add a company:
   ```
   name: "TechCorp"
   industry: "Technology"
   rating: 4.5
   ```

3. Go to Table Editor → jobs
4. Add a job:
   ```
   title: "Senior Software Engineer"
   company_id: (select the company you created)
   description: "We're looking for..."
   location: "San Francisco, CA"
   salary_min: 150000
   salary_max: 200000
   work_type: "remote"
   skills_required: ["React", "TypeScript", "Node.js"]
   status: "active"
   ```

---

## 🐛 Troubleshooting

### Dev server won't start?
```bash
# Try deleting node_modules and reinstalling
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database errors?
- Check that both migration files ran successfully
- Verify pgvector extension is enabled
- Check your Supabase URL and keys

### AI features not working?
- Verify your OpenAI API key is correct
- Check you have billing enabled on OpenAI
- Look at the console for error messages

---

## 🚀 Next Steps

1. **Test all features** thoroughly
2. **Customize the design** to your liking
3. **Add more sample data** for testing
4. **Deploy to Vercel** when ready
5. **Share with beta users!**

---

## 📚 Need Help?

- Check `README.md` for detailed docs
- Check `PROJECT_STATUS.md` for feature status
- Check `walkthrough.md` for architecture details
- Check Next.js docs: https://nextjs.org/docs
- Check Supabase docs: https://supabase.com/docs

---

**Ready to launch! 🎊**
