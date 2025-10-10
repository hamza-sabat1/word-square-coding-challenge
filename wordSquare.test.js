const { normaliseLetters, makeLetterCounts } = require('./wordSquare');

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

