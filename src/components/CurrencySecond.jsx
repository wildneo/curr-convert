import React from 'react';
import { connect } from 'react-redux';
import CurrencyInput from './CurrencyInput';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = state.convert;

  return props;
};

const actionsList = {
  calculateFirst: actions.calculateFirst,
  fetchFirstRate: actions.fetchFirstRate,
  setSecondCurrency: actions.setSecondCurrency,
  setSecondAmount: actions.setSecondAmount,
};

class CurrencySecond extends React.Component {
  handleChange = (e, { value }) => {
    const { calculateFirst } = this.props;
    calculateFirst({ value });
  }

  handleClick = (e, { value }) => {
    const { setSecondCurrency, fetchFirstRate, from, to } = this.props;
    setSecondCurrency({ value });
    fetchFirstRate(to.code, from.code);
  }

  componentDidMount() {
    const { fetchFirstRate, from, to } = this.props;
    fetchFirstRate(to.code, from.code);
  }

  render() {
    const { to } = this.props;

    return (
      <CurrencyInput currency={to} onChange={this.handleChange} onClick={this.handleClick} />
    )
  }
}

export default connect(mapStateToProps, actionsList)(CurrencySecond);