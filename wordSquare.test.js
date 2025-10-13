const { normaliseLetters, makeLetterCounts, wordFitsBag } = require('./wordSquare');

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

