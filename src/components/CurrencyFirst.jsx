import React from 'react';
import { connect } from 'react-redux';
import CurrencyInput from './CurrencyInput';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = state.convert;

  return props;
};

const actionsList = {
  calculateSecond: actions.calculateSecond,
  fetchSecondRate: actions.fetchSecondRate,
  setFirstCurrency: actions.setFirstCurrency,
  setFirstAmount: actions.setFirstAmount,
};

class CurrencyFirst extends React.Component {
  handleChange = (e, { value }) => {
    const { calculateSecond } = this.props;
    calculateSecond({ value });
  }

  handleClick = (e, { value }) => {
    const { setFirstCurrency, fetchSecondRate, from, to } = this.props;
    setFirstCurrency({ value });
    fetchSecondRate(from.code, to.code);
  }

  componentDidMount() {
    const { fetchSecondRate, from, to } = this.props;
    fetchSecondRate(from.code, to.code);
  }

  render() {
    const { from } = this.props;

    return (
      <CurrencyInput currency={from} onChange={this.handleChange} onClick={this.handleClick} />
    )
  }
}

export default connect(mapStateToProps, actionsList)(CurrencyFirst);