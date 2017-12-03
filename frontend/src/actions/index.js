import * as navigationActions from './navigation';
import * as postsActions from './posts';
import * as commentsActions from './comments';
import * as sortActions from './sort';

export default {
  ...navigationActions,
  ...postsActions,
  ...commentsActions,
  ...sortActions,
};
