import React from 'react';
import { connect } from 'react-redux';
import { Divider, Segment, Grid, Icon, Message } from 'semantic-ui-react';
import CurrencySecond from './CurrencySecond';
import CurrencyFirst from './CurrencyFirst';
import * as actions from '../actions';

const mapStateToProps = ({ fetchCurrenciesState }) => ({
  fetchCurrenciesState
});

const actionsList = {
  switchInputs: actions.switchInputs,
}

class ConvertWidget extends React.Component {
  handleClick = () => {
    const { switchInputs } = this.props;
    switchInputs();
  }

  renderErrMsg() {
    return (
      <Message negative>
        <Message.Header>
          Sorry!
        </Message.Header>
        <p>Service is not available now, please try again later.</p>
      </Message>
    );
  }

  renderWidget() {
    const { fetchCurrenciesState } = this.props;
    const isFetching = fetchCurrenciesState === 'requested';

    return (
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
    );
  }

  render() {
    const { fetchCurrenciesState } = this.props;
    const isFailed = fetchCurrenciesState === 'failed';

    return isFailed
      ? this.renderErrMsg()
      : this.renderWidget();
  }
};


export default connect(mapStateToProps, actionsList)(ConvertWidget);
