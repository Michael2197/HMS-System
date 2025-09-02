// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/admin/auth.slice';
import invoicesReducer from '@/features/finance/invoices.slice';
import hrReducer from '@/features/hr/hr.slice';
import ledgerReducer from '@/features/finance/ledger.slice';
import trialReducer from '@/features/finance/trial.slice';

// add other slices as they are implemented (inventory, hr, husbandry...)
const rootReducer = combineReducers({
  auth: authReducer,
  invoices: invoicesReducer,
  hr: hrReducer,
  ledger: ledgerReducer,
  trial: trialReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
