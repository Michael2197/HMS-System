export const toDateInput = (d?: string|Date) =>
  (d ? new Date(d) : new Date()).toISOString().slice(0, 10);
