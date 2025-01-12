import { describe, it, expect } from 'vitest';
import isEqual from '@/is-equal';

describe('existence of function', () => {
  it('should exist', () => {
    expect(isEqual).toBeDefined();
  });
});
