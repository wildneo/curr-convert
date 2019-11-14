import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { currencySelector } from '../../selectors';

const mapStateToProps = (state) => {
  const currencies = currencySelector(state);
  return { currencies };
};

class CurrencyList extends React.Component {
  render() {
    // const { currentCode } = this.state;
    const { value, currencies, onChange } = this.props;

    return (
      currencies.map((currency) => (
        <Dropdown.Item
          active={currency.code === value}
          onClick={onChange}
          key={currency.code}
          value={currency.code}
          text={currency.name}
          description={currency.code}
          style={{ whiteSpace: 'normal' }}
        />
      ))
    );
  }
}

export default connect(mapStateToProps)(CurrencyList);
