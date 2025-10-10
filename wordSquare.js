function normaliseLetters(str) {
  return (str || '').toLowerCase().replace(/[^a-z]/g, '');
}

function makeLetterCounts(str) {
  const s = normaliseLetters(str);
  const counts = {};
  for (const ch of s) counts[ch] = (counts[ch] || 0) + 1;
  return counts;
}

module.exports = {
  normaliseLetters,
  makeLetterCounts,
};