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
  setQuoteCurrency: actions.setQuoteCurrency,
  setSecondAmount: actions.setSecondAmount,
};

class CurrencySecond extends React.Component {
  handleChange = (e, { value }) => {
    const { setSecondAmount } = this.props;
    setSecondAmount({ value });
  }

  handleClick = (e, { value }) => {
    const { setQuoteCurrency, fetchConverted, base } = this.props;
    setQuoteCurrency({ value });
    fetchConverted(base, value);
  }

  render() {
    const { quote, secondAmount } = this.props;

    return (
      <CurrencyInput
        activeCode={quote}
        amount={secondAmount}
        onAmountChange={this.handleChange}
        onCurrencyChange={this.handleClick}
      />
    )
  }
}

export default connect(mapStateToProps, actionsList)(CurrencySecond);