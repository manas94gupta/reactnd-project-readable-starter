import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as R from 'ramda';
import { firstToUpperCase } from '../../utils/helpers';
import uuid from 'uuid/v4';
import { addPost, editPost } from '../../actions/posts';
import { Form, Button, Header } from 'semantic-ui-react';

const allInputsFilled = R.compose(R.all(R.compose(R.not, R.isEmpty)), R.values);

const commonAttrs = function(name) {
  return {
    id: name,
    name,
    label: firstToUpperCase(name),
    placeholder: firstToUpperCase(name),
    onChange: this.handleChange,
  };
};

class PostForm extends Component {
  constructor(props) {
    super(props);
    const { author, title, body: message, category } = props.post || {};

    this.state = {
      inputs: {
        author: author || '',
        title: title || '',
        message: message || '',
        category: category || '',
      },
      loading: false,
      isFormSubmittable: false,
    };
  }

  componentWillReceiveProps({ post }) {
    if (post && R.all(R.equals(''), R.values(this.state.inputs))) {
      const { author, title, body: message, category } = post;
      this.setState({ inputs: { author, title, message, category } });
    }
  }

  handleChange = (e, { name, value }) =>
    this.setState(prevState => {
      const newInputsState = {
        ...prevState.inputs,
        [name]: value,
      };

      return {
        inputs: newInputsState,
        loading: false,
        isFormSubmittable: allInputsFilled(newInputsState),
      };
    });

  handleSubmit = e => {
    e.preventDefault();
    const { author, title, message, category } = this.state.inputs;
    const { dispatchSubmit, post, history } = this.props;
    const id = post ? post.id : uuid();
    const timestamp = post ? post.timestamp : Date.now();
    this.setState({ loading: true });

    dispatchSubmit({
      id,
      timestamp,
      author,
      title,
      body: message,
      category,
    }).then(() => {
      history.push(`/${category}/${id}`);
    });
  };

  render() {
    const { categoryOptions, post, history } = this.props;
    const { loading, isFormSubmittable } = this.state;
    const { author, title, message, category } = this.state.inputs;
    const isEdit = typeof post !== 'undefined';

    return (
      <Form onSubmit={this.handleSubmit} loading={loading}>
        <Header as="h2">{isEdit ? 'Edit' : 'Add'} post</Header>
        <Form.Input
          {...commonAttrs.call(this, 'author')}
          value={author}
          readOnly={isEdit}
        />
        <Form.Input {...commonAttrs.call(this, 'title')} value={title} />
        <Form.TextArea {...commonAttrs.call(this, 'message')} value={message} />
        <Form.Select
          {...commonAttrs.call(this, 'category')}
          value={category}
          options={categoryOptions}
          disabled={isEdit}
        />
        <Button disabled={!isFormSubmittable}>Submit</Button>{' '}
        {isEdit && (
          <Button
            onClick={e => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Cancel
          </Button>
        )}
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const mapper = cat => ({
    key: cat,
    text: firstToUpperCase(cat),
    value: cat,
  });
  const categoryOptions = R.compose(R.map(mapper), R.pluck('name'), R.values)(
    state.categories,
  );

  if (ownProps.id) {
    return {
      post: state.posts[ownProps.id],
      categoryOptions,
    };
  }

  return { categoryOptions };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatchSubmit(post) {
    if (ownProps.id) {
      return dispatch(editPost(post));
    } else {
      return dispatch(addPost(post));
    }
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostForm),
);
