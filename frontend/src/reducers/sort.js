import { SORT_BY, SORT_TYPES, SORT_ASCENDING } from '../actions/_types';

const sortReducer = (state = [SORT_TYPES.NONE, SORT_ASCENDING], action) => {
  switch (action.type) {
    case SORT_BY:
      return [action.sortBy, action.sortDirection];

    default:
      return state;
  }
};

export default sortReducer;
