import React from 'react';
import { Input } from 'semantic-ui-react';
import CurrencyDropdown from './CurrencyDropdown';

export default class CurrencyInput extends React.Component {
  render() {
    const { currency, onAmountChange, onCurrencyChange } = this.props;

    return (
      <Input
        onChange={onAmountChange}
        value={currency.amount}
        placeholder="Amount"
        fluid
        maxLength={12}
        action={
          <CurrencyDropdown
            onChange={onCurrencyChange}
            text={currency.code}
          />
        }
      />
    )
  }
}
