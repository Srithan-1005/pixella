
const url = 'https://qbtjixrndzcxcvhvgoju.supabase.co/rest/v1/jobs?select=*';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidGppeHJuZHpjeGN2aHZnb2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTEzOTYsImV4cCI6MjA4MDIyNzM5Nn0.KalaeAqA2q7C4W3nPZfTi1rO0uBMgLSOYEEH85iwOCE';

async function testJobs() {
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Jobs Count:', Array.isArray(data) ? data.length : 'Error');
    console.log('Data:', JSON.stringify(data).substring(0, 500));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testJobs();
