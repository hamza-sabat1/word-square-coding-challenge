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

module.exports = {
  normaliseLetters,
  makeLetterCounts,
  wordFitsBag,
};