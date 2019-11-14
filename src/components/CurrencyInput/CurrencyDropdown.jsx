import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import CurrencyList from './CurrencyList';


export default class CurrencyDropdown extends React.Component {
  state = {
    currentValue: this.props.value,
  }

  handleUpdate = (e, { value }) => {
    this.setState({ currentValue: value });
  }

  render() {
    const { value, onChange } = this.props;
    const { currentValue } = this.state;

    return (
      <Dropdown
        onOpen={this.handleUpdate}
        button
        scrolling
        text={value}
        value={value}
        style={{ position: 'initial' }}
      >
        <Dropdown.Menu>
          <CurrencyList
            value={currentValue}
            onChange={onChange}
          />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
