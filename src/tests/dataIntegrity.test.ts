import { describe, expect, it } from 'vitest';
import { categories } from '../data/categories';
import { contests } from '../data/contests';
import { entries } from '../data/entries';
import { packages } from '../data/packages';
import { responsibilitySections } from '../data/responsibility';
import { blockedPurpose, canAdvancePurpose } from '../utils/guards';

function hasDuplicates(values: number[]) {
  return new Set(values).size !== values.length;
}

describe('MockContest static data', () => {
  it('has exactly one recommended package', () => {
    expect(packages.filter((pack) => pack.recommended)).toHaveLength(1);
  });

  it('uses unique contest and entry IDs', () => {
    expect(hasDuplicates(contests.map((contest) => contest.id))).toBe(false);
    expect(hasDuplicates(entries.map((entry) => entry.id))).toBe(false);
  });

  it('keeps entry scores and ratings in range', () => {
    expect(entries.every((entry) => entry.score >= 0 && entry.score <= 100)).toBe(true);
    expect(entries.every((entry) => entry.rating >= 1 && entry.rating <= 5)).toBe(true);
  });

  it('has one winner and valid contest categories', () => {
    expect(entries.filter((entry) => entry.winner)).toHaveLength(1);
    expect(contests.every((contest) => categories.includes(contest.category))).toBe(true);
  });

  it('blocks production development purpose and defines responsibility boundaries', () => {
    expect(canAdvancePurpose(blockedPurpose)).toBe(false);
    expect(responsibilitySections).toHaveLength(4);
    expect(responsibilitySections.every((section) => section.items.length > 0)).toBe(true);
  });
});
