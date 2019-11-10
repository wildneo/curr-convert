import React from 'react';
import { connect } from 'react-redux';
import { Divider, Segment, Grid, Container, Icon } from 'semantic-ui-react';
import CurrencySecond from './CurrencySecond';
import CurrencyFirst from './CurrencyFirst';
import * as actions from '../actions';

const mapStateToProps = ({ fetchCurrenciesState }) => ({
  fetchCurrenciesState
});

const actionsList = {
  switchInputs: actions.switchInputs,
}

class App extends React.Component {
  handleClick = () => {
    const { switchInputs } = this.props;
    switchInputs();
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
                <Icon
                  onClick={this.handleClick}
                  link
                  name="refresh"
                />
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
