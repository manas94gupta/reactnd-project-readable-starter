import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { firstToUpperCase } from '../../utils/helpers';
import { addComment } from '../../actions/comments';
import { Form } from 'semantic-ui-react';
import uuid from 'uuid/v4';

const allInputsFilled = R.compose(R.all(R.compose(R.not, R.isEmpty)), R.values);
const basicState = () => ({
  inputs: {
    author: '',
    message: '',
  },
  loading: false,
  isFormSubmittable: false,
});

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = basicState();
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
    const { author, message } = this.state.inputs;
    const { dispatchSubmit, postId: parentId } = this.props;
    const id = uuid();
    const timestamp = Date.now();
    this.setState({ loading: true });

    dispatchSubmit({
      id,
      timestamp,
      author,
      body: message,
      parentId,
    }).then(() => {
      this.setState(basicState());
    });
  };

  render() {
    const { author, message } = this.state.inputs;
    const { loading, isFormSubmittable } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} loading={loading}>
        <Form.Input
          id="author"
          name="author"
          label={firstToUpperCase('author')}
          placeholder={firstToUpperCase('author')}
          value={author}
          onChange={this.handleChange}
        />
        <Form.TextArea
          id="message"
          name="message"
          label={firstToUpperCase('message')}
          placeholder={firstToUpperCase('message')}
          value={message}
          onChange={this.handleChange}
        />
        <Form.Button disabled={!isFormSubmittable}>Submit</Form.Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSubmit(comment) {
    return dispatch(addComment(comment));
  },
});

export default connect(null, mapDispatchToProps)(CommentForm);
