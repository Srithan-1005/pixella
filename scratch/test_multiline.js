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
  return { result, inQuotes };
}

let multiLineCount = 0;
let rowCount = 0;
let buffer = '';
let headers = null;

const rl = readline.createInterface({
  input: fs.createReadStream('job_descriptions.csv', { encoding: 'utf8' }),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (!headers) {
    headers = parseCSVLine(line).result;
    return;
  }
  
  if (buffer) {
    buffer += '\n' + line;
  } else {
    buffer = line;
  }

  const { result, inQuotes } = parseCSVLine(buffer);
  if (inQuotes) {
    multiLineCount++;
    return; // continue accumulating until quote closes
  }

  rowCount++;
  buffer = '';

  if (rowCount >= 500) {
    rl.close();
  }
});

rl.on('close', () => {
  console.log('Successfully parsed', rowCount, 'rows.');
  console.log('Multiline lines encountered:', multiLineCount);
});
