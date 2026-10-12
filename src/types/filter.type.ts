export const FILTERS = [ "Все", "Активные", "Выполненные" ] as const;
export type Filter = (typeof FILTERS)[number];
