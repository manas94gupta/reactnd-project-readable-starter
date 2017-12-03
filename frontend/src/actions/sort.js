import { SORT_BY } from './_types';

export const sort = (sortBy, sortDirection) => ({
  type: SORT_BY,
  sortBy,
  sortDirection,
});
