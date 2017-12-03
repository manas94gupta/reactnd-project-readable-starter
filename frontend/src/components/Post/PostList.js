import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Item } from 'semantic-ui-react';
import Post from '../Post/Post';
import PostSorter from '../Post/PostSorter';
import { SORT_ASCENDING } from '../../actions/_types';

const PostList = ({ posts = [] }) => {
  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div>
      <PostSorter />
      <Item.Group divided>
        {posts.map(post => <Post key={post.id} {...post} />)}
      </Item.Group>
    </div>
  );
};

const mapStateToProps = (state, { posts = [] }) => {
  if (!state.sort) {
    return {};
  }

  const [sortBy, sortOrder] = state.sort;

  if (sortBy === 'none') {
    return {};
  }

  const sortedPosts = R.sortBy(R.prop(sortBy))(posts);

  return {
    posts: sortOrder === SORT_ASCENDING ? sortedPosts : sortedPosts.reverse(),
  };
};

export default connect(mapStateToProps)(PostList);
