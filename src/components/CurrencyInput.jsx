import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Input } from 'semantic-ui-react';
import { currencySelector } from '../selectors';

const mapStateToProps = (state) => {
  const currencies = currencySelector(state);
  console.log(currencies);
  return { currencies };
};

class CurrencyInput extends React.Component {
  render() {
    const { currency, currencies, onChange, onClick } = this.props;

    return (
      <Input
        maxLength={12}
        onChange={onChange}
        placeholder="Amount"
        value={currency.amount}
        fluid
        action={
          <Dropdown
            onChange={onClick}
            button
            scrolling
            text={currency.code}
            options={currencies}
            style={{ position: 'initial' }}
          />
        }
      />
    )
  }
}

export default connect(mapStateToProps)(CurrencyInput);