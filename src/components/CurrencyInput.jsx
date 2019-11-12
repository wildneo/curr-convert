import React from 'react';
import { Input } from 'semantic-ui-react';
import CurrencyDropdown from './CurrencyDropdown';
import mask from '../utils';

export default class CurrencyInput extends React.Component {
  handleChange = (event, data) => {
    const { onAmountChange } = this.props;
    const { value } = data;
    const newValue = mask(value);
    onAmountChange(event, { ...data, value: newValue });
  }

  render() {
    const {
      onCurrencyChange,
      text,
      amount,
    } = this.props;

    return (
      <Input
        onChange={this.handleChange}
        value={amount}
        fluid
        maxLength={12}
        placeholder="Amount"
        action={
          <CurrencyDropdown
            onChange={onCurrencyChange}
            text={text}
          />
        }
      />
    )
  }
}
