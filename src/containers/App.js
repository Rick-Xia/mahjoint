import React, { Component } from 'react';
import '../styles/App.css';
import Nav from './Nav';
import Deck from './Deck';
import Hand from './Hand';
import Args from './ArgumentContainer';
import Result from './Result';
import { Grid } from 'material-ui';

class App extends Component {

  addTileToHand = ( num, type, arg = null ) => {
    this.refs.hand.addTiles( type, num, arg );
  }

  clearTiles = () => {
    this.refs.hand.clearAllTiles();
  }

  sendResult = ( tiles ) => {
    let args = this.refs.args.readArguments();
    this.refs.result.calculatePoints( tiles, args );
  }

  removeResult = () => {
    this.refs.result.removeResult();
  }

  render() {
    return (
      <div>
        <Grid className="Grid-top-wrapper" container direction="column">
          <Grid className="Grid-navbar-item" item >
            <Nav id="navbar" clearTiles={this.clearTiles} />
          </Grid>
          <Grid className="Grid-deck-item" item style={{marginBottom: 50, marginTop: 30}}>
            <Deck id="all-tiles" addtohand={this.addTileToHand} />
          </Grid>
          <Grid className="Grid-hand-item" item>
            <Hand ref='hand' id="hand-tiles" onFullHand={this.sendResult} onBreakHand={this.removeResult}/>
          </Grid>

          <Grid className="Grid-function-panel-wrapper" item style={{marginTop: 40}}>
            <Grid container alignItems="center" justify="space-around">
              <Grid className="Grid-args-item" item>
                <Args ref='args' />
              </Grid>
              <Grid className="Grid-result-item" item>
                <Result ref='result' />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default App;
