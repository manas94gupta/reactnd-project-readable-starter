import React from 'react';
import { connect } from 'react-redux';
import { deletePost, votePost } from '../../actions/posts';
import { UPVOTE, DOWNVOTE } from '../../actions/_types';
import { Link, withRouter } from 'react-router-dom';
import { Item, Icon, Button, Popup } from 'semantic-ui-react';

const Post = ({
  author,
  body,
  category,
  commentCount,
  id,
  timestamp,
  title,
  voteScore,
  dispatchDelete,
  dispatchVote,
}) => {
  if (!id) {
    return <p>Post not found.</p>;
  }

  return (
    <Item>
      <Item.Content>
        <Item.Header>
          <Link to={`/${category}/${id}`}>{title}</Link>
        </Item.Header>
        <Item.Meta>
          {`${author} - ${new Date(timestamp).toDateString()}`}
        </Item.Meta>
        <Item.Description>{body}</Item.Description>
        <Item.Extra>
          <Icon name="comments" /> {commentCount}
          {' | '}
          {voteScore > 5 ? (
            <Icon name="smile" />
          ) : voteScore < -5 ? (
            <Icon name="frown" />
          ) : (
            <Icon name="meh" />
          )}
          {voteScore}
          {' — '}
          <Button.Group compact basic icon>
            <Popup
              trigger={
                <Button
                  icon="thumbs up outline"
                  onClick={() => dispatchVote({ id, option: UPVOTE })}
                />
              }
              content="Upvote"
            />
            <Popup
              trigger={
                <Button
                  icon="thumbs down outline"
                  onClick={() => dispatchVote({ id, option: DOWNVOTE })}
                />
              }
              content="Downvote"
            />
          </Button.Group>
          <Button
            color="red"
            floated="right"
            onClick={() => dispatchDelete({ id, category })}
          >
            Delete
          </Button>
          <Button as={Link} to={`/editpost/${id}`} secondary floated="right">
            Edit
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchDelete({ id, category }) {
    return dispatch(deletePost({ id, category }));
  },
  dispatchVote({ id, option }, ownProps) {
    return dispatch(votePost({ id, option }));
  },
});

export default withRouter(connect(null, mapDispatchToProps)(Post));
