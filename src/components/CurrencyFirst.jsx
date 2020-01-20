import React from 'react';
import { connect } from 'react-redux';
import CurrencyInput from './CurrencyInput';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = state.convert;

  return props;
};

const actionsList = {
  fetchConverted: actions.fetchConverted,
  setBaseCurrency: actions.setBaseCurrency,
  setFirstAmount: actions.setFirstAmount,
};

class CurrencyFirst extends React.Component {
  handleChange = (e, { value }) => {
    const { setFirstAmount } = this.props;
    setFirstAmount({ value });
  }

  handleClick = (e, { value }) => {
    const { setBaseCurrency, fetchConverted, quote } = this.props;
    setBaseCurrency({ value });
    fetchConverted(value, quote);
  }

  render() {
    const { base, firstAmount } = this.props;

    return (
      <CurrencyInput
        activeCode={base}
        amount={firstAmount}
        onAmountChange={this.handleChange}
        onCurrencyChange={this.handleClick}
      />
    )
  }
}

export default connect(mapStateToProps, actionsList)(CurrencyFirst);