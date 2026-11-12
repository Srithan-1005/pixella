
const url = 'https://qbtjixrndzcxcvhvgoju.supabase.co/rest/v1';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidGppeHJuZHpjeGN2aHZnb2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTEzOTYsImV4cCI6MjA4MDIyNzM5Nn0.KalaeAqA2q7C4W3nPZfTi1rO0uBMgLSOYEEH85iwOCE';

async function seed() {
  try {
    // 1. Create a sample company
    console.log('Creating sample company...');
    const compRes = await fetch(`${url}/companies`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name: 'TechFlow',
        industry: 'Technology',
        rating: 4.8,
        description: 'A leading tech company.'
      })
    });
    
    const companies = await compRes.json();
    const companyId = Array.isArray(companies) ? companies[0]?.id : companies?.id;
    
    if (!companyId) {
       // Check if it already exists
       const checkRes = await fetch(`${url}/companies?name=eq.TechFlow&select=id`, {
         headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
       });
       const checkData = await checkRes.json();
       if (checkData.length > 0) {
         console.log('Company already exists.');
       } else {
         console.error('Failed to create/find company:', companies);
         return;
       }
    }

    // 2. Create sample jobs
    console.log('Creating sample jobs...');
    const jobs = [
      { title: 'Senior Frontend Engineer', location: 'San Francisco, CA', salary_min: 140000, salary_max: 180000, work_type: 'remote', experience_level: 'senior', skills_required: ['React', 'TypeScript', 'Next.js'], status: 'active', description: 'Exciting role for frontend experts.' },
      { title: 'Full Stack Developer', location: 'New York, NY', salary_min: 120000, salary_max: 160000, work_type: 'hybrid', experience_level: 'mid', skills_required: ['Node.js', 'React', 'PostgreSQL'], status: 'active', description: 'Build end-to-end solutions.' },
      { title: 'Junior Software Engineer', location: 'Austin, TX', salary_min: 80000, salary_max: 110000, work_type: 'remote', experience_level: 'entry', skills_required: ['JavaScript', 'Python'], status: 'active', description: 'Great start for your career.' }
    ];

    for (const job of jobs) {
      const res = await fetch(`${url}/jobs`, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...job, company_id: companyId || '00000000-0000-0000-0000-000000000000' })
      });
      console.log(`Created job: ${job.title} - Status: ${res.status}`);
    }
    
    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seed();
