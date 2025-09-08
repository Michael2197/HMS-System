import ledgerReducer, { addEntry, loadEntries } from '../ledger.slice';
import { describe, it, expect } from 'vitest';
import type { JournalEntry } from '../../../types/finance';

describe('ledger slice', () => {
  it('adds balanced entry', () => {
    const initial = { entries: [], loading: false, error: null } as any;
    const entry: JournalEntry = {
      id: 'e1',
      date: new Date().toISOString(),
      description: 'test',
      lines: [
        { id: 'l1', accountId: 'A', debit: 100, credit: 0 },
        { id: 'l2', accountId: 'B', debit: 0, credit: 100 }
      ]
    };
    const state = ledgerReducer(initial, addEntry(entry));
    expect(state.entries.length).toBe(1);
  });

  it('rejects unbalanced entry by throwing', () => {
    const initial = { entries: [], loading: false, error: null } as any;
    const entry: JournalEntry = {
      id: 'e2',
      date: new Date().toISOString(),
      lines: [{ id: 'l1', accountId: 'A', debit: 50, credit: 0 }]
    };
    try {
      ledgerReducer(initial, addEntry(entry));
      // should not reach
      expect(false).toBe(true);
    } catch (e) {
      expect((e as Error).message).toMatch(/Debits and credits must balance/);
    }
  });
});
