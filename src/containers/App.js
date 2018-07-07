import React, { Component } from 'react';
import '../styles/App.css';
import Nav from './Nav';
import Deck from './Deck';
import Hand from './Hand';
import ArgumentContainer from './ArgumentContainer';
import ResultContainer from './ResultContainer';
import { Grid } from 'material-ui';

class App extends Component {

  addTileToHand = ( num, type, arg = null ) => {
    this.refs.hand.addTiles( type, num, arg )
  }

  clearAll = () => {
    // clear all hand tiles + combi selection + reset all game args +
    //  reset dora to 0 + reset winds (?) + reset result
    this.refs.hand.clearAllTiles()
    this.refs.result.removeResult()
  }

  sendResult = ( tiles, combis ) => {
    let args = this.refs.args.readArguments();
    this.refs.result.calculatePoints( tiles, combis, args );
  }

  removeResult = () => {
    this.refs.result.removeResult();
  }

  render() {
    return (
      <div>
        <Nav id="navbar" clearTiles={this.clearAll} />

        <Grid className="Highest-wrapper" container wrap="nowrap" direction="column" justify="center">

          <Grid className="Deck-wrapper" item style={{marginTop: 70}}>
            <Deck id="all-tiles" addtohand={this.addTileToHand} />
          </Grid>

          <Grid className="Grid-hand-item" item>
            <Grid container>
              <Grid item xs={3} />
              <Grid item>
                <Hand ref='hand' id="hand-tiles" onFullHand={this.sendResult} onBreakHand={this.removeResult}/>
              </Grid>
            </Grid>
          </Grid>

          <Grid className="Grid-args-item" item>
            <ArgumentContainer ref='args' />
          </Grid>
          
          <Grid className="Grid-result-item" item>
            <ResultContainer ref='result' />
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default App;
