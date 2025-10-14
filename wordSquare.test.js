const { normaliseLetters, makeLetterCounts, wordFitsBag, filterValidWords, getNeededPrefix, squareIsValid} = require('./wordSquare');

describe('Utility functions for cleaning input letters and generating frequency maps to count instances of letters', () => {
    test('normaliseLetters should convert input to lowercase and remove invalid characters', () => {
        expect(normaliseLetters('A1a_B!')).toBe('aab');
        expect(normaliseLetters('Hello-World')).toBe('helloworld');
        expect(normaliseLetters('')).toBe('');
    });
    
    test('makeLetterCounts should return a correct frequency map of letters', () => {
    expect(makeLetterCounts('aaccdeeeemmnnnoo'))
      .toEqual({ a: 2, c: 2, d: 1, e: 4, m: 2, n: 3, o: 2 });

    expect(makeLetterCounts('AaBbC!'))
      .toEqual({ a: 2, b: 2, c: 1 });

    expect(makeLetterCounts('')).toEqual({});
  });
});

describe('Word feasibility against a letter bag', () => {
  test('returns true when the word can be formed from the bag', () => {
    const bag = makeLetterCounts('aaccdeeeemmnnnoo');
    expect(wordFitsBag('mean', bag)).toBe(true);
    expect(wordFitsBag('once', bag)).toBe(true);
  });

  test('returns false when a needed letter is missing', () => {
    const bag = makeLetterCounts('abc');
    expect(wordFitsBag('dad', bag)).toBe(false);
  });

  test('returns false when a letter is needed more times than available', () => {
    const bag = makeLetterCounts('abc');
    expect(wordFitsBag('aa', bag)).toBe(false);
  });

  test('input is treated case insensitively via the normaliseLetters function utility', () => {
    const bag = makeLetterCounts('AabB');
    expect(wordFitsBag('BaB', bag)).toBe(true);
  });
});

describe('Dictionary filtering to build candidate word set', () => {
  test('includes only n-letter words that can be formed from the letter bag', () => {
    const n = 4;
    const bag = makeLetterCounts('aaccdeeeemmnnnoo');

    const lines = [
      'mean',   // ok
      'once',   // ok
      'neon',   // ok
      'moan',   // ok
      'zebra',  // reject
      'x',      // reject
      'm-e-a-n',// reject
      'MEAN',   // ok
      'stone',  // reject
      'a e a n' // reject
    ];

    const result = filterValidWords(n, bag, lines);

    expect(result).toEqual(expect.arrayContaining(['mean', 'once', 'neon', 'moan']));

    expect(result).not.toEqual(expect.arrayContaining(['zebra', 'x', 'stone']));
  });

  test('returns empty array if nothing matches', () => {
    const n = 3;
    const bag = makeLetterCounts('abc');
    const lines = ['dddd', 'eeee', 'aa', 'toolong'];
    expect(filterValidWords(n, bag, lines)).toEqual([]);
  });

  test('normalises case and trims whitespace', () => {
    const n = 4;
    const bag = makeLetterCounts('aaccdeeeemmnnnoo');
    const lines = ['  MEAN  ', '\tOnce\n'];
    const result = filterValidWords(n, bag, lines);
    expect(result).toEqual(expect.arrayContaining(['mean', 'once']));
  });
});

describe('getNeededPrefix', () => {
   test('returns an empty string when there are no rows yet', () => {
    expect(getNeededPrefix([])).toBe('');
  });

  test('derives the next prefix from the current column', () => {
    expect(getNeededPrefix(['moan'])).toBe('o');

    expect(getNeededPrefix(['moan', 'once'])).toBe('ac');

    expect(getNeededPrefix(['moan', 'once', 'acme'])).toBe('nee');
  });

  test('returns empty string once the 4×4 square is complete', () => {
    expect(getNeededPrefix(['moan', 'once', 'acme', 'need'])).toBe('');
  });
});

describe('squareIsValid', () => {
  test('empty or single row is always valid so far', () => {
    expect(squareIsValid([])).toBe(true);
    expect(squareIsValid(['moan'])).toBe(true);
  });

  test('returns true when rows mirror columns so far- valid partial squares that are following the pattern)', () => {
    expect(squareIsValid(['moan', 'once'])).toBe(true);
    expect(squareIsValid(['moan', 'once', 'acme'])).toBe(true);
    expect(squareIsValid(['base', 'area', 'seal'])).toBe(true);
    expect(squareIsValid(['moan', 'once', 'acme', 'need'])).toBe(true);
  });

  test('returns false on a row/column mismatch', () => {
    expect(squareIsValid(['pear', 'once'])).toBe(false);
    expect(squareIsValid(['moan', 'once', 'amid'])).toBe(false);
    expect(squareIsValid(['mars', 'oven'])).toBe(false);
    expect(squareIsValid(['mead', 'earl', 'acid'])).toBe(false);
    expect(squareIsValid(['abcd', 'efgh', 'ijkl'])).toBe(false);
  });

  test('returns true for a valid full 4×4 table', () => {
    expect(squareIsValid(['moan', 'once', 'acme', 'need'])).toBe(true);
  });
});