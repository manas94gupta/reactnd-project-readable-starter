import { combineReducers } from 'redux';
import postsReducer from './posts';
import commentsReducer from './comments';
import categoriesReducer from './categories';
import sortReducer from './sort';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  sort: sortReducer,
});

export default rootReducer;
