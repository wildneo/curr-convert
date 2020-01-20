import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { invoke } from 'lodash';
import { Input } from 'semantic-ui-react';
import Dropdown from './Dropdown';
import { getSearchQuery, filteredCurrencySelector } from '../selectors';
import * as actions from '../actions';
import { mask } from '../utils';

const mapStateToProps = (state) => {
  const searchQuery = getSearchQuery(state);
  const currencies = filteredCurrencySelector(state);
  return { searchQuery, currencies };
};
const actionsList = {
  setSearchQuery: actions.setSearchQuery,
  clearSearchQuery: actions.clearSearchQuery,
};

class CurrencyInput extends React.Component {
  static propTypes = {
    onCurrencyChange: PropTypes.func,
    onAmountChange: PropTypes.func,
    activeCode: PropTypes.string,
    amount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  };

  handleAmoumtChange = (event, data) => {
    const { value } = data;
    const newValue = mask(value);
    invoke(this.props, 'onAmountChange', event, { value: newValue });
  }

  handleCurrencyChange = (event, data) => {
    invoke(this.props, 'onCurrencyChange', event, data);
  }

  handleSearchChange = (e, { value }) => {
    const { setSearchQuery } = this.props;
    setSearchQuery({ value });
  }

  handleSearchClear = () => {
    const { clearSearchQuery } = this.props;
    clearSearchQuery();
  }

  render() {
    const { searchQuery, currencies, activeCode, amount } = this.props;

    return (
      <Input
        onChange={this.handleAmoumtChange}
        value={amount}
        maxLength={12}
        placeholder="Amount"
        fluid
        action={
          <Dropdown
            onClose={this.handleSearchClear}
            value={activeCode}
          >
            <Dropdown.Search
              onChange={this.handleSearchChange}
              value={searchQuery}
            />
            <Dropdown.List
              onChange={this.handleCurrencyChange}
              currencies={currencies}
              value={activeCode}
            />
          </Dropdown>
        }
      />
    )
  }
}

export default connect(mapStateToProps, actionsList)(CurrencyInput);