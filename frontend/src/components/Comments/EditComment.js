import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../../actions/comments';
import { Popup, Button, Icon, Modal, Form } from 'semantic-ui-react';

class EditComment extends Component {
  constructor(props) {
    super(props);
    const { body } = props;

    this.state = { body, originalBody: body };
  }

  handleChange = (e, { value }) => {
    this.setState({ body: value });
  };

  handleSubmit = () => {
    const { body } = this.state;
    const { id, dispatchEditComment } = this.props;

    this.setState({ loading: true });

    dispatchEditComment({
      id,
      body,
      timestamp: Date.now(),
    }).then(() => {
      this.setState({ loading: false, open: false, originalBody: body });
    });
  };

  handleTriggerClick = () => {
    if (this.state.open === false) {
      // avoids at least a setState on first click
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    const { body, originalBody } = this.state;
    if (body !== originalBody) this.setState({ body: originalBody });
  };

  render() {
    const { body, open, loading } = this.state;

    return (
      <Modal
        open={open}
        onClose={this.handleClose}
        trigger={
          <Button icon onClick={this.handleTriggerClick}>
            <Popup
              style={{ marginBottom: '18px', marginLeft: '-10px' }}
              trigger={<Icon name="edit" />}
              content="Edit"
            />
          </Button>
        }
      >
        <Modal.Content>
          <Modal.Header as="h2">Edit post</Modal.Header>
          <Form loading={loading} onSubmit={this.handleSubmit}>
            <Form.TextArea value={body} onChange={this.handleChange} />
            <Button>Confirm</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchEditComment({ id, body, timestamp }) {
    return dispatch(editComment({ id, body, timestamp }));
  },
});

export default connect(null, mapDispatchToProps)(EditComment);
