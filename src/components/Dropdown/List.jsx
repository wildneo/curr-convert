import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import { Dropdown as DropdownUI } from 'semantic-ui-react';

export default class List extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    currencies: PropTypes.array,
    value: PropTypes.string,
  };

  handleChange = (event, { value }) => {
    invoke(this.props, 'onChange', event, { value });
  }

  render() {
    const { value, currencies } = this.props;

    return (
      <DropdownUI.Menu scrolling>
        {currencies.map((currency) => (
          <DropdownUI.Item
            onClick={this.handleChange}
            active={currency.code === value}
            key={currency.code}
            value={currency.code}
            text={currency.name}
            description={currency.code}
            style={{ whiteSpace: 'normal' }}
          />
        ))}
      </DropdownUI.Menu>
    );
  }
}
