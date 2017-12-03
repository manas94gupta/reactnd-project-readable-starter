import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firstToUpperCase } from '../../utils/helpers';
import { sort } from '../../actions/sort';
import {
  SORT_TYPES,
  SORT_ASCENDING,
  SORT_DESCENDING,
} from '../../actions/_types';
import { Form } from 'semantic-ui-react';

const sortByOptions = Object.values(SORT_TYPES).map(v => ({
  key: v,
  text: firstToUpperCase(v),
  value: v,
}));

const sortDirectionOptions = [SORT_ASCENDING, SORT_DESCENDING].map(v => ({
  key: v,
  text: firstToUpperCase(v),
  value: v,
}));

class PostSorter extends Component {
  constructor(props) {
    super(props);
    const { sortBy, sortDirection } = props;

    this.state = {
      sortByDropdown: sortBy || sortByOptions[0].value,
      sortDirectionDropdown: sortDirection || sortDirectionOptions[0].value,
    };
  }

  handleChange = (e, { name, value }) => {
    const { dispatchSort } = this.props;
    this.setState({ [`${name}Dropdown`]: value }, () => {
      const { sortByDropdown, sortDirectionDropdown } = this.state;
      dispatchSort(sortByDropdown, sortDirectionDropdown);
    });
  };

  render() {
    const { sortByDropdown, sortDirectionDropdown } = this.state;
    return (
      <Form style={{ marginTop: '2em' }}>
        <Form.Group inline>
          <Form.Dropdown
            label="Sort by"
            name="sortBy"
            value={sortByDropdown}
            options={sortByOptions}
            onChange={this.handleChange}
          />
          <Form.Dropdown
            name="sortDirection"
            value={sortDirectionDropdown}
            options={sortDirectionOptions}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  const [sortBy, sortDirection] = state.sort;
  return { sortBy, sortDirection };
};

const mapDispatchToProps = dispatch => ({
  dispatchSort(sortBy, sortDirection) {
    return dispatch(sort(sortBy, sortDirection));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostSorter);
