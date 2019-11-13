import React from 'react';
import { Grid, Header, Container, Icon } from 'semantic-ui-react';
import ConvertWidget from './ConvertWidget';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Grid style={{ height: "80vh" }} textAlign="center" verticalAlign="middle">
          <Grid.Column>
              <Header as="h2" color="teal">
                <Icon name="money bill alternate outline" /> Currency Converter
              </Header>
            <ConvertWidget />
            <p>2019 Currency converter widget</p>
            <Icon name="github" />
            <a href="https://github.com/wildneo/curr-convert"> Source Code</a>

          </Grid.Column>
        </Grid>
      </Container>
    );
  }
};
