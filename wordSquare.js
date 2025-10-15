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

function squareIsValid(rows) {
  const n = rows.length;
  if (n <= 1) return true;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (rows[r][c] !== rows[c][r]) return false;
    }
  }
  return true;
}

function updateLetters(remaining, word, consume) {
  const step = consume ? -1 : +1;
  for (const ch of normaliseLetters(word)) {
    remaining[ch] = (remaining[ch] || 0) + step;
  }
}

function buildWordSquare(n, letters, validWords) {
  const remaining = makeLetterCounts(letters);
  const rows = [];

  function backtrack() {
    if (rows.length === n) return true;

    const prefix = getNeededPrefix(rows);

    for (const w of validWords) {
      if (!w.startsWith(prefix)) continue;
      if (!wordFitsBag(w, remaining)) continue;

      updateLetters(remaining, w, true);
      rows.push(w);

      if (squareIsValid(rows) && backtrack()) return true;

      rows.pop();
      updateLetters(remaining, w, false);
    }
    return false;
  }

  return backtrack() ? rows : null;
}

module.exports = {
  normaliseLetters,
  makeLetterCounts,
  wordFitsBag,
  filterValidWords,
  getNeededPrefix,
  squareIsValid,
  updateLetters,
  buildWordSquare,
};