
async function testFetch() {
  const url = 'https://qbtjixrndzcxcvhvgoju.supabase.co/auth/v1/health';
  try {
    const res = await fetch(url);
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Response:', text);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testFetch();
