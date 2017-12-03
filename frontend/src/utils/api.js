const getAuthHeaders = () => {
  const headers = new Headers();
  headers.append('Authorization', 'wth');
  headers.append('Content-Type', 'application/json');
  return headers;
};

const fetchBE = (pathname, options) => {
  const _options = {
    method: 'get',
    headers: getAuthHeaders(),
    // credentials: 'include',
    ...options,
  };

  return fetch(`http://localhost:3001/${pathname}`, _options)
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const fetchCategories = () => fetchBE('categories');
export const fetchPosts = () => fetchBE('posts');
export const fetchComments = postId => fetchBE(`posts/${postId}/comments`);

export const addPost = post =>
  fetchBE('posts', { method: 'POST', body: JSON.stringify(post) });
export const editPost = ({ id, body, title }) =>
  fetchBE(`posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, body }),
  });
export const deletePost = id => fetchBE(`posts/${id}`, { method: 'DELETE' });
export const votePost = (id, option) =>
  fetchBE(`posts/${id}`, { method: 'POST', body: JSON.stringify({ option }) });

export const addComment = comment =>
  fetchBE('comments', { method: 'POST', body: JSON.stringify(comment) });
export const editComment = ({ id, body, timestamp }) =>
  fetchBE(`comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ timestamp, body }),
  });
export const deleteComment = id =>
  fetchBE(`comments/${id}`, { method: 'DELETE' });
export const voteComment = (id, option) =>
  fetchBE(`comments/${id}`, {
    method: 'POST',
    body: JSON.stringify({ option }),
  });
