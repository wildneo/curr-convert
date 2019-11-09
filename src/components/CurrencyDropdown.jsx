import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { currencySelector } from '../selectors';

const mapStateToProps = (state) => {
  const currencies = currencySelector(state);
  return { currencies };
};

class CurrencyDropdown extends React.Component {
  render() {
    const { text, currencies, onChange } = this.props;

    return (
      <Dropdown
        onChange={onChange}
        button
        scrolling
        text={text}
        options={currencies}
        style={{ position: 'initial' }}
      />
    )
  }
}

export default connect(mapStateToProps)(CurrencyDropdown);