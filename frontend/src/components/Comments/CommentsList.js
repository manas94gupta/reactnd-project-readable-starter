import React from 'react';
import { connect } from 'react-redux';
import { voteComment, deleteComment } from '../../actions/comments';
import { UPVOTE, DOWNVOTE } from '../../actions/_types';
import { Comment, Popup, Button } from 'semantic-ui-react';
import EditComment from './EditComment';

const CommentsList = ({ comments, dispatchVote, dispatchDelete }) => (
  <Comment.Group>
    {comments.map(({ id, parentId, timestamp, body, author, voteScore }) => (
      <Comment key={id}>
        <Comment.Content>
          <Comment.Author>{author}</Comment.Author>
          <Comment.Metadata>
            <div>{new Date(timestamp).toDateString()}</div>
            <div>
              {' — vote'} {voteScore}
            </div>
          </Comment.Metadata>
          <Comment.Text>
            <p>{body}</p>
          </Comment.Text>
          <Comment.Actions>
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
            </Button.Group>{' '}
            <Button.Group compact basic icon>
              <EditComment id={id} body={body} />
              <Popup
                trigger={
                  <Button
                    icon="delete"
                    onClick={() => dispatchDelete({ id, parentId })}
                  />
                }
                content="Delete"
              />
            </Button.Group>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    ))}
  </Comment.Group>
);

const mapDispatchToProps = dispatch => ({
  dispatchVote({ id, option }) {
    return dispatch(voteComment({ id, option }));
  },
  dispatchDelete({ id, parentId }) {
    return dispatch(deleteComment({ id, parentId }));
  },
});

export default connect(null, mapDispatchToProps)(CommentsList);
