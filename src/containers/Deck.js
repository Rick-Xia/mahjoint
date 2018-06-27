import React from 'react';
import '../styles/Deck.css';
import Tile from '../components/Tile';
import { Grid } from 'material-ui';
import Button from 'material-ui/Button';

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            combi:  {
                chi:    false,
                pon:    false,
                kan:    false,
                ckan:   false
            }
        }

        this.handleCombinationClick = this.handleCombinationClick.bind(this);
        this.getCurrentCombination = this.getCurrentCombination.bind(this);
    }

    switchButtonColor( state ) {
        return state? "secondary" : "primary";
    }

    handleCombinationClick ( e ) {
        let newCombi = this.state.combi
        for ( let t in newCombi ) {
            if ( t === e ) newCombi[t] = !newCombi[t]
            else newCombi[t] = false
        }
        this.setState({ combi:  newCombi })
    }

    getCurrentCombination() {
        for ( let t in this.state.combi ) {
            if ( this.state.combi[t] ) return t
        }
        return null;
    }

    render() {
        return (
            <Grid container spacing={24} direction="column">
                { this.loadTileRow() }
                <Grid container justify='center' spacing={40} >
                    <Grid item>
                        <Button id="chi" variant="raised"
                                color={this.switchButtonColor(this.state.combi.chi)}
                                onClick={() => this.handleCombinationClick('chi')}
                        >
                            Chi
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button id="pon" variant="raised"
                                color={this.switchButtonColor(this.state.combi.pon)}
                                onClick={() => this.handleCombinationClick('pon')}
                        >
                            Pon
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button id="kan" variant="raised"
                                color={this.switchButtonColor(this.state.combi.kan)}
                                onClick={() => this.handleCombinationClick('kan')}
                        >
                            Kan
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button id="ckan" variant="raised"
                                color={this.switchButtonColor(this.state.combi.ckan)}
                                onClick={() => this.handleCombinationClick('ckan')}
                        >
                            Closed Kan
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    handleDeckTileClick ( i, type ) {
        let curCombi = this.getCurrentCombination()
        if ( curCombi === 'chi' && type === 'd' )
            return
        this.props.addtohand( i, type, curCombi );
    }

    loadTiles(type) {
        let amount = (type === 'd')? 7 : 9;
        let row = [];
        for ( let i=1; i<=amount; ++i ) {
            row.push(
                <Tile
                    key={"DeckTile_" + i + type}
                    src={i + type}
                    combi={this.state.combi}
                    onClick={() => this.handleDeckTileClick(i,type)}
                />
            );
        }
        return row;
    }

    loadTileRow() {
        let tileArray = [], tileTypes = ['s', 'm', 'p', 'd'];
        tileTypes.map((type) => {
            return tileArray.push(
                (<Grid item key={`row_of_${type}`} className={`row_of_${type}`}>
                    <Grid container direction="row" justify="center" spacing={24}>
                        { this.loadTiles(type) }
                    </Grid>
                </Grid>)
            )
        });
        return tileArray;
    }
}

export default Deck;
