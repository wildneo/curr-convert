import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import { Input } from 'semantic-ui-react';

export default class SearchInput extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    currencies: PropTypes.array,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
  };

  handleClick = (event) => {
    event.stopPropagation();
    invoke(this.props, 'onClick', event, this.props);
  }

  handleChange = (event, { value }) => {
    invoke(this.props, 'onChange', event, { value });
  }

  render() {
    const { value } = this.props;

    return (
      <Input
        onClick={this.handleClick}
        onChange={this.handleChange}
        value={value}
        icon='search'
        iconPosition='left'
        className='search'
      />
    );
  }
}
