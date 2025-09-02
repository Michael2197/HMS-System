// src/features/finance/trial.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { JournalEntry } from '../../types/finance';

/**
 * Trial balance state stores aggregated balances per account.
 * The recompute action accepts journal entries and rebuilds balances.
 */
interface TrialState {
  // balances: accountId -> balance (debit - credit)
  balances: Record<string, number>;
  lastUpdated?: string | null;
}

const initialState: TrialState = {
  balances: {},
  lastUpdated: null
};

const trial = createSlice({
  name: 'trial',
  initialState,
  reducers: {
    recompute(state, action: PayloadAction<JournalEntry[]>) {
      const entries = action.payload || [];
      const balances: Record<string, number> = {};

      for (const e of entries) {
        for (const l of e.lines) {
          if (!balances[l.accountId]) balances[l.accountId] = 0;
          balances[l.accountId] += (l.debit || 0) - (l.credit || 0);
        }
      }

      state.balances = balances;
      state.lastUpdated = new Date().toISOString();
    },
    clearTrial(state) {
      state.balances = {};
      state.lastUpdated = null;
    }
  }
});

export const { recompute, clearTrial } = trial.actions;
export default trial.reducer;
