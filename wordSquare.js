function normaliseLetters(str) {
  return (str || '').toLowerCase().replace(/[^a-z]/g, '');
}

function makeLetterCounts(str) {
  const s = normaliseLetters(str);
  const counts = {};
  for (const ch of s) counts[ch] = (counts[ch] || 0) + 1;
  return counts;
}

function wordFitsBag (word, bag) {
  const w = normaliseLetters(word);
  
  const need = {};
  for (const ch of w) {
    need[ch] = (need[ch] || 0) + 1;
    if ((bag[ch] || 0) < need[ch]) return false;
  }
  return true;
}

function filterValidWords(n, bag, lines) {
  const out = [];
  const seen = new Set();

  for (const raw of lines) {
    const w = normaliseLetters((raw || '').trim());
    if (w.length !== n) continue;          
    if (!/^[a-z]+$/.test(w)) continue;     
    if (!wordFitsBag(w, bag)) continue;    
    if (seen.has(w)) continue;             
    seen.add(w);
    out.push(w);
  }

  out.sort();
  return out;
}

function getNeededPrefix(rows) {
  if (rows.length === 0) return '';

  const wordLength = rows[0].length;
  const r = rows.length;
  if (r >= wordLength) return '';

  let prefix = '';
  for (let i = 0; i < r; i++) {
    prefix += rows[i][r];
  }
  return prefix;
}


module.exports = {
  normaliseLetters,
  makeLetterCounts,
  wordFitsBag,
  filterValidWords,
  getNeededPrefix,
};