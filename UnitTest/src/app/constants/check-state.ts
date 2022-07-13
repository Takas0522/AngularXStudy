export const CHECK_STATE_VALUE = {
  nothing: 0,
  indeterminate: 1,
  all: 2
} as const;

export type CHECK_STATE = typeof CHECK_STATE_VALUE[keyof typeof CHECK_STATE_VALUE];
