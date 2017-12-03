import React from 'react';
import Post from './Post';
import CommentsList from '../Comments/CommentsList';
import CommentForm from '../Comments/CommentForm';
import { Header, Item } from 'semantic-ui-react';

const PostDetails = details => (
  <div>
    {/* Post */}
    <Item.Group divided>
      <Post {...details} />
    </Item.Group>
    {/* Comments */}
    {Array.isArray(details.comments) && (
      <CommentsList comments={details.comments} />
    )}
    {/* Add reply form */}
    {!!details.id && (
      <section>
        <Header as="h3">Add reply</Header>
        <CommentForm postId={details.id} />
      </section>
    )}
  </div>
);

export default PostDetails;
