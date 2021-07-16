import {compute} from './compute';

describe('ComputeComponent', () => {
  it('should return 0 if input is negative', () => {
    const result = compute(-1);
    expect(result).toBe(0);
  });

  it('should increment input if positive', () => {
    const result = compute(1);
    expect(result).toBe(2);
  });
});
