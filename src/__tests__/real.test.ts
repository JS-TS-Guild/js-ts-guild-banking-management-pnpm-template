import { describe, it, expect } from 'vitest';
import isEqualChecker from '@/index';

describe('verify answers', () => {
  it('should equate same objects', () => {
    expect(isEqualChecker({ b: 2, a: 1 }, { a: 1, b: 2 })).toBe(true);
  });

  it('should not equate different  objects', () => {
    expect(isEqualChecker({ a: 1, c: 2 }, { a: 1, b: 2 })).toBe(false);
  });
});
