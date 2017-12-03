import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { firstToUpperCase } from '../../utils/helpers';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';
import Navigation from '../Navigation/Navigation';
import PostList from '../Post/PostList';
import PostDetails from '../Post/PostDetails';
import PostForm from '../Post/PostForm';

const AddPostButton = () => (
  <Button as={Link} to="/addpost" primary>
    Add post
  </Button>
);

const App = ({ category, posts = [], comments }) => (
  <div>
    <Navigation />

    <Container text style={{ paddingTop: '7em', paddingBottom: '2em' }}>
      <Switch>
        {/* Add/edit post */}
        <Route path="/addpost" component={PostForm} />
        <Route
          path="/editpost/:post_id"
          render={({ match }) => <PostForm id={match.params.post_id} />}
        />
        {/* Post details */}
        <Route
          path="/:category/:post_id"
          render={() => <PostDetails {...R.head(posts)} comments={comments} />}
        />
        {/* Categories */}
        <Route
          path="/:category"
          render={() => (
            <div>
              <AddPostButton />
              <Header as="h2">{category}</Header>
              <PostList posts={posts} />
            </div>
          )}
        />
        {/* Homepage */}
        <Route
          render={() => (
            <div>
              <AddPostButton />
              <PostList posts={posts} />
            </div>
          )}
        />
      </Switch>
    </Container>
  </div>
);

const mapStateToProps = (state, { match }) => {
  const { params } = match;

  if (params.post_id) {
    return {
      posts: [state.posts[params.post_id]],
      comments: state.comments[params.post_id],
    };
  }

  if (params.category) {
    if (!(params.category in state.categories)) {
      return { posts: [] };
    }
    return {
      category: firstToUpperCase(params.category),
      posts: R.compose(
        R.map(id => state.posts[id]),
        R.prop('posts'),
        R.prop(params.category),
      )(state.categories),
    };
  }

  return {
    posts: R.compose(
      R.map(id => state.posts[id]),
      R.flatten,
      R.values,
      R.pluck('posts'),
    )(state.categories),
  };
};

export default connect(mapStateToProps)(App);
