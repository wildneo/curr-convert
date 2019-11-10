import React from 'react';
import { Input } from 'semantic-ui-react';
import CurrencyDropdown from './CurrencyDropdown';

export default class CurrencyInput extends React.Component {
  render() {
    const {
      onAmountChange,
      onCurrencyChange,
      text,
      amount,
    } = this.props;

    return (
      <Input
        onChange={onAmountChange}
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
