const fs = require('fs');
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
  return result;
}

const rl = readline.createInterface({
  input: fs.createReadStream('job_descriptions.csv', { encoding: 'utf8' }),
  crlfDelay: Infinity
});

let headers = null;
let sampleRow = null;

rl.on('line', (line) => {
  if (!headers) {
    headers = parseCSVLine(line);
  } else if (!sampleRow) {
    sampleRow = parseCSVLine(line);
    rl.close();
  }
});

rl.on('close', () => {
  console.log('Headers count:', headers.length);
  headers.forEach((h, idx) => console.log(`${idx}: [${h}] -> [${sampleRow[idx] ? sampleRow[idx].slice(0, 40) : 'undefined'}]`));
});
