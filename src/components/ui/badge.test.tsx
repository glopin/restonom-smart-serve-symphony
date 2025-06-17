import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './badge'; // Assuming badge.tsx is in the same directory

describe('Badge component', () => {
  it('should render with default variant and children', () => {
    render(<Badge>Hello Badge</Badge>);
    const badgeElement = screen.getByText('Hello Badge');
    expect(badgeElement).toBeInTheDocument();
    // Default variant classes might be complex to assert directly without snapshots or more specific class checks
    // For now, just checking presence and basic structure.
    expect(badgeElement.classList.contains('bg-primary')).toBe(true);
    expect(badgeElement.classList.contains('text-primary-foreground')).toBe(true);
  });

  it('should render with a specified variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badgeElement = screen.getByText('Secondary Badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement.classList.contains('bg-secondary')).toBe(true);
    expect(badgeElement.classList.contains('text-secondary-foreground')).toBe(true);
  });

  it('should render with an outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    const badgeElement = screen.getByText('Outline Badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement.classList.contains('text-foreground')).toBe(true);
    // Outline variant doesn't have a background color by default in the provided cva
  });

  it('should apply additional classNames', () => {
    render(<Badge className="extra-class">Custom Class Badge</Badge>);
    const badgeElement = screen.getByText('Custom Class Badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement.classList.contains('extra-class')).toBe(true);
  });
});
