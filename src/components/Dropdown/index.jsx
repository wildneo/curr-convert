import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import { Dropdown as DropdownUI } from 'semantic-ui-react';
import List from './List';
import Search from './Search';



class Dropdown extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ])
  };

  handleClose = (event, data) => {
    invoke(this.props, 'onClose', event, data);
  }

  render() {
    const { children, value } = this.props;

    return (
      <DropdownUI
        onClose={this.handleClose}
        value={value}
        text={value}
        button
        style={{ position: 'initial' }}
      >
      <DropdownUI.Menu>
        {children}
      </DropdownUI.Menu>
      </DropdownUI>
    )
  }
}

Dropdown.List = List;
Dropdown.Search = Search;

export default Dropdown;
