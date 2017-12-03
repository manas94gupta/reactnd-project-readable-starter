import * as API from '../utils/api';
import { catchAsyncActionsErrors } from '../utils/helpers';

import { RECEIVE_COMMENTS, EDIT_COMMENT, VOTE_COMMENT } from './_types';

const receiveComments = (postId, comments) => ({
  type: RECEIVE_COMMENTS,
  postId,
  comments,
});

const commentVoted = ({ id, voteScore, parentId }) => ({
  type: VOTE_COMMENT,
  id,
  voteScore,
  parentId,
});

const commentEdited = comment => ({
  type: EDIT_COMMENT,
  comment,
});

export const getCommentsOfPost = id =>
  catchAsyncActionsErrors(async dispatch => {
    const comments = await API.fetchComments(id);
    dispatch(receiveComments(id, comments));
  });

export const addComment = comment =>
  catchAsyncActionsErrors(async dispatch => {
    await API.addComment(comment);
    dispatch(getCommentsOfPost(comment.parentId));
  });

export const editComment = ({ id, body, timestamp }) =>
  catchAsyncActionsErrors(async dispatch => {
    const newComment = await API.editComment({ id, body, timestamp });
    dispatch(commentEdited(newComment));
  });

export const deleteComment = ({ id, parentId }) =>
  catchAsyncActionsErrors(async dispatch => {
    await API.deleteComment(id);
    dispatch(getCommentsOfPost(parentId));
  });

export const voteComment = ({ id, option }) =>
  catchAsyncActionsErrors(async dispatch => {
    const comment = await API.voteComment(id, option);
    dispatch(commentVoted(comment));
  });
