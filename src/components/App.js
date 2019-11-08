import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Divider, Segment, Grid, Input, Container, Icon } from 'semantic-ui-react';
import CurrencySecond from './CurrencySecond';
import CurrencyFirst from './CurrencyFirst';
import * as actions from '../actions';

const mapStateToProps = ({ fetchCurrenciesState, currencies }) => {
  const { from } = currencies;
  return { fetchCurrenciesState };
};
const actionsList = {
  setFirstCurrency: actions.setFirstCurrency,
  setSecondCurrency: actions.setSecondCurrency,
};

class App extends React.Component {
  handleFirstClick = (e, { value }) => {
    const { setFirstCurrency, fetchRates } = this.props;
    fetchRates(value);
  }

  handleSecondClick = (e, { value }) => {
    const { setSecondCurrency } = this.props;
    setSecondCurrency({ value });
  }

  render() {
    const { fetchCurrenciesState } = this.props;
    const isFetching = fetchCurrenciesState === 'requested';

    return (
      <Container text>
        <Segment loading={isFetching}>
          <Grid columns="equal" stackable>
            <Grid.Column>
              <CurrencyFirst />
            </Grid.Column>
            <Grid.Column width="one">
              <Divider vertical>
                <Icon link name="refresh"/>
              </Divider>
            </Grid.Column>
            <Grid.Column>
              <CurrencySecond />
            </Grid.Column>
          </Grid>
          
          
          
        </Segment>
      </Container>
    );
  }
};


export default connect(mapStateToProps, actionsList)(App);
