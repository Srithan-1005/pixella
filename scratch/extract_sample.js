const fs = require('fs');
const path = require('path');
const readline = require('readline');

function parseCSVLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i+1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return { result, inQuotes };
}

function cleanSkills(raw) {
  if (!raw) return [];
  // Split on common delimiters: comma, semicolon, bullet points, newline
  const parts = raw.split(/[,;\n\r•]+/).map(s => s.trim().replace(/^['"\[\]{}]+|['"\[\]{}]+$/g, '')).filter(Boolean);
  const cleaned = [];
  for (const part of parts) {
    if (part.length > 50) {
      // If a chunk is too long, break it into sensible words/phrases
      const sub = part.split(/\s{2,}|\band\b/i).map(s => s.trim()).filter(s => s.length > 2 && s.length <= 40);
      cleaned.push(...sub);
    } else if (part.length >= 2) {
      cleaned.push(part);
    }
  }
  return Array.from(new Set(cleaned)).slice(0, 8);
}

function parseSalaryMinMax(rangeStr) {
  // e.g. "$59K-$99K" or "$120,000 - $160,000"
  if (!rangeStr) return { min: 60000, max: 100000 };
  const matches = rangeStr.match(/\$?(\d+)(?:K|,000)?\s*-\s*\$?(\d+)(?:K|,000)?/i);
  if (matches) {
    let min = parseInt(matches[1], 10);
    let max = parseInt(matches[2], 10);
    if (min < 1000) min *= 1000;
    if (max < 1000) max *= 1000;
    return { min, max };
  }
  return { min: 60000, max: 100000 };
}

async function extractSample() {
  const csvPath = path.join(__dirname, '..', 'job_descriptions.csv');
  const outDir = path.join(__dirname, '..', 'public', 'data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'job_descriptions.json');

  const rl = readline.createInterface({
    input: fs.createReadStream(csvPath, { encoding: 'utf8' }),
    crlfDelay: Infinity
  });

  let headers = null;
  const rows = [];
  let buffer = '';
  const TARGET_COUNT = 500;

  for await (const line of rl) {
    if (!headers) {
      headers = parseCSVLine(line).result;
      continue;
    }

    if (buffer) {
      buffer += '\n' + line;
    } else {
      buffer = line;
    }

    const { result, inQuotes } = parseCSVLine(buffer);
    if (inQuotes) continue;

    buffer = '';

    if (result.length >= 15) {
      const salaryNums = parseSalaryMinMax(result[3]);
      const obj = {
        id: result[0] || `job-${rows.length + 1}`,
        experience: result[1] || 'Not specified',
        qualifications: result[2] || 'Degree',
        salaryRange: result[3] || 'Competitive',
        salaryMin: salaryNums.min,
        salaryMax: salaryNums.max,
        location: result[4] || 'Remote',
        country: result[5] || 'Global',
        workType: result[8] || 'Full-Time',
        companySize: result[9] || '500+',
        postingDate: result[10] || new Date().toISOString().split('T')[0],
        preference: result[11] || 'Any',
        contactPerson: result[12] || '',
        contact: result[13] || '',
        jobTitle: result[14] || 'Specialist',
        role: result[15] || result[14] || 'Specialist',
        jobPortal: result[16] || 'HireOrbit',
        description: result[17] || '',
        benefits: result[18] ? result[18].replace(/^[{\['"]+|[}\]'"]+$/g, '').replace(/', '/g, ', ') : '',
        skills: cleanSkills(result[19]),
        responsibilities: result[20] || '',
        company: result[21] || 'Innovate Inc',
      };

      rows.push(obj);
      if (rows.length >= TARGET_COUNT) {
        break;
      }
    }
  }

  fs.writeFileSync(outPath, JSON.stringify(rows, null, 2), 'utf8');
  console.log(`Successfully generated ${rows.length} high-quality records to ${outPath}`);
}

extractSample().catch(console.error);
