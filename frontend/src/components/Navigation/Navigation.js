import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firstToUpperCase } from '../../utils/helpers';
import { Menu, Container, Header, Icon, Dropdown } from 'semantic-ui-react';

const Navigation = ({ categories }) => (
  <header>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="h1" header>
          <Icon name="book" />
          <Header.Content>Readable</Header.Content>
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>

        <Dropdown item simple text="Categories">
          <Dropdown.Menu>
            {categories.map(cat => (
              <Dropdown.Item as={Link} key={cat.name} to={`/${cat.path}`}>
                {firstToUpperCase(cat.name)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  </header>
);

const mapStateToProps = state => ({
  categories: Object.values(state.categories),
});

export default connect(mapStateToProps)(Navigation);
