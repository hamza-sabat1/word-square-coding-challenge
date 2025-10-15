// Usage:
//   node cli.js <n> <letters> <dictionaryPath>
// Example:
//   node cli.js 4 aaccdeeeemmnnnoo sample-dict.txt

const fs = require('fs');
const path = require('path');
const {
  normaliseLetters,
  makeLetterCounts,
  filterValidWords,
  buildWordSquare,
} = require('./wordSquare');

function showUsage() {
  console.error('Usage: node cli.js <n> <letters> <dictionaryPath>');
  console.error('Example: node cli.js 4 aaccdeeeemmnnnoo sample-dict.txt');
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    showUsage();
    process.exit(1);
  }

  const n = parseInt(args[0], 10);
  if (!Number.isInteger(n) || n <= 0) {
    console.error('Error: <n> must be a positive whole number (e.g., 4).');
    process.exit(1);
  }

  const letters = normaliseLetters(args[1] || '');
  if (letters.length !== n * n) {
    console.error(`Error: expected exactly ${n * n} letters for an ${n}×${n} square; received ${letters.length}.`);
    console.error('Tip: only a–z letters are counted after normalisation.');
    process.exit(1);
  }

  const dictPath = path.resolve(args[2]);
  if (!fs.existsSync(dictPath)) {
    console.error(`Error: dictionary file not found: ${dictPath}`);
    process.exit(1);
  }

  let lines = [];
  try {
    lines = fs.readFileSync(dictPath, 'utf8').split(/\r?\n/);
  } catch (err) {
    console.error('Error: failed to read dictionary file.');
    console.error(err.message || err);
    process.exit(1);
  }

  const bag = makeLetterCounts(letters);
  const candidates = filterValidWords(n, bag, lines);

  if (candidates.length === 0) {
    console.log('No solution found (no candidate words from the given dictionary fit the letter bag).');
    process.exit(0);
  }

  const result = buildWordSquare(n, letters, candidates);
  if (result) {
    console.log(result.join('\n'));
  } else {
    console.log('No solution found.');
  }
}

if (require.main === module) {
  main();
}
