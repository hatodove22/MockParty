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

  it('has valid contest categories and at most one winner per contest', () => {
    const winnerContestIds = entries.filter((entry) => entry.winner).map((entry) => entry.contestId);
    expect(winnerContestIds.length).toBeGreaterThan(0);
    expect(hasDuplicates(winnerContestIds)).toBe(false);
    expect(contests.every((contest) => categories.includes(contest.category))).toBe(true);
  });

  it('keeps entries attached to real contests with detail copy', () => {
    const contestIds = new Set(contests.map((contest) => contest.id));
    expect(entries.every((entry) => contestIds.has(entry.contestId))).toBe(true);
    expect(entries.every((entry) => entry.summary.length > 20)).toBe(true);
    expect(entries.every((entry) => entry.reviewCriteria.length >= 3)).toBe(true);
    expect(entries.every((entry) => entry.discussion.length >= 2)).toBe(true);
  });

  it('has marketplace metadata for each contest', () => {
    expect(contests.every((contest) => contest.thumbnail.startsWith('/assets/contest-thumbnails/'))).toBe(true);
    expect(contests.every((contest) => contest.packageName.length > 0)).toBe(true);
    expect(contests.every((contest) => contest.phase.length > 0)).toBe(true);
    expect(contests.every((contest) => contest.watchers >= contest.creators)).toBe(true);
    expect(contests.every((contest) => contest.timeline.length >= 3)).toBe(true);
    expect(contests.every((contest) => contest.requirements.length >= 3)).toBe(true);
  });

  it('covers open, finalist, and completed contest lifecycle states', () => {
    expect(contests.some((contest) => contest.status === 'Open')).toBe(true);
    expect(contests.some((contest) => contest.status === 'Finalist')).toBe(true);
    expect(contests.some((contest) => contest.status === 'Completed')).toBe(true);
    expect(contests.filter((contest) => contest.status !== 'Open').every((contest) => contest.daysLeft <= 2)).toBe(true);
  });

  it('blocks production development purpose and defines responsibility boundaries', () => {
    expect(canAdvancePurpose(blockedPurpose)).toBe(false);
    expect(responsibilitySections).toHaveLength(4);
    expect(responsibilitySections.every((section) => section.items.length > 0)).toBe(true);
  });
});
