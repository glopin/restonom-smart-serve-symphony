import { describe, it, expect } from 'vitest';
import { cn } from './utils'; // Assuming utils.ts is in the same directory

describe('cn function', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active');
  });

  it('should override conflicting classes with tailwind-merge', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2'); // tailwind-merge behavior
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('should handle mixed array and string inputs', () => {
    expect(cn(['p-4', 'm-2'], 'bg-red-500', { 'text-white': true })).toBe('p-4 m-2 bg-red-500 text-white');
  });

  it('should return empty string for no inputs', () => {
    expect(cn()).toBe('');
  });

  it('should ignore falsy values', () => {
    expect(cn('bg-red-500', null, undefined, false, 'text-white')).toBe('bg-red-500 text-white');
  });
});
