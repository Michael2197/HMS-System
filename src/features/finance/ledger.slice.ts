// src/features/finance/ledger.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { JournalEntry } from '../../types/finance';
import { sumLinesCredit, sumLinesDebit } from '../../utils/finance';

interface LedgerState {
  entries: JournalEntry[];
  loading: boolean;
  error?: string | null;
}

const initialState: LedgerState = {
  entries: [],
  loading: false,
  error: null
};

const ledger = createSlice({
  name: 'ledger',
  initialState,
  reducers: {
    loadEntries(state, action: PayloadAction<JournalEntry[]>) {
      state.entries = action.payload;
      state.loading = false;
      state.error = null;
    },
    addEntry(state, action: PayloadAction<JournalEntry>) {
      const entry = action.payload;
      const d = sumLinesDebit(entry);
      const c = sumLinesCredit(entry);
      if (Math.abs(d - c) > 0.0001) {
        throw new Error('Debits and credits must balance');
      }
      entry.createdAt = entry.createdAt || new Date().toISOString();
      state.entries.push(entry);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearLedger(state) {
      state.entries = [];
      state.error = null;
      state.loading = false;
    }
  }
});

export const { loadEntries, addEntry, setLoading, setError, clearLedger } = ledger.actions;

// selectors
export const selectLedgerEntries = (s: any) => s.ledger?.entries || [];
export const selectLedgerLoading = (s: any) => s.ledger?.loading || false;

export default ledger.reducer;
