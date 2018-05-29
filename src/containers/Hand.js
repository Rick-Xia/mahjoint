import React from 'react';
import Tile from '../components/Tile';
import TileGroup from '../components/TileGroup';
import { Grid } from 'material-ui';

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.curTiles = {
            s: [0,0,0,0,0,0,0,0,0],
            m: [0,0,0,0,0,0,0,0,0],
            p: [0,0,0,0,0,0,0,0,0],
            d: [0,0,0,0,0,0,0]
        };
        // Takeaway: keep data that you intend to share across components in store.
        // I should put all tiles info to Redux store
        this.id = "hand";
        this.amount = 0;
        this.amountAdded = 0;
        this.max = 14;
        this.state = {
            tiles: []
        };
    }

    isThisTileRunOut(type, num, arg) {
        return this.curTiles[type][num - 1] >= 4 ||
                ( arg === "pon" && this.curTiles[type][num - 1] >= 2 ) ||
                ( (arg === "kan" || arg === "ckan") && this.curTiles[type][num - 1] >= 1 );
    }

    pickTilesFromDeck( type, tiles ) {
        for ( let index in tiles ) {
            this.curTiles[ type ][ tiles[index]-1 ] += 1;
            this.amount++;
        }
        console.log(`now amount is ` + this.amount)
    }

    addTiles ( type, num, arg ) {
        if (arg !== 0) console.log(typeof arg);
        if ( this.amount >= this.max || (arg && this.amount + 3 > this.max) ) {
            return console.log(`the hand is full ` + this.amount);
        }

        switch ( arg ) {
            case 'chi': this.addCombiChi( type, num ); break;
            case 'pon': this.addCombiPon( type, num ); break;
            case 'kan': this.addCombiKan( type, num ); break;
            case 'ckan': this.addCombiCkan( type, num ); break;
            default: this.addSingleTile( type, num );
        }
    }

    checkTileAvailability ( type, tiles ) {
        let tiletypeBase = this.curTiles[ type ].slice();
        for ( let i in tiles ) {
            if ( ++tiletypeBase[ tiles[i]-1 ] > 4 ) return false;
        }
        return true;
    }

    // addTileGroup ( type, num ) {}

    addCombiChi ( type, num ) {
        let lastTile = (num + 2 > 9)? 9 : num + 2, returnTileGroup = [];
        for( let index = lastTile-2; index <= lastTile; ++index ) {
            returnTileGroup.push( index );
        }
        if ( !this.checkTileAvailability( type, returnTileGroup ) ) {
            return console.log(`Some tiles have been run out`);
        }

        let basekey = this.amountAdded++;
        let newChiTileGroup = (
            <TileGroup
                onClick={() => this.handleHandTileGroupClick(  basekey, type, returnTileGroup  )}
                tiletype={type}
                num={num}
                groupid={basekey}
                key={basekey}
                tilelist={returnTileGroup}
            />
        );
        let newHandTiles = this.state.tiles.slice();
        newHandTiles.push( newChiTileGroup );
        this.setState({ tiles: newHandTiles });

        this.pickTilesFromDeck( type, returnTileGroup );
        if ( this.amount === this.max ) this.props.onFullHand( this.curTiles );
    }

    addCombiPon ( type, num ) {
        let returnTileGroup = [];
        for( let i = 0; i < 3; ++i ) returnTileGroup.push( num );

        if ( !this.checkTileAvailability( type, returnTileGroup ) ) {
            return console.log(`Some tiles have been run out`);
        }

        let basekey = this.amountAdded++;
        let newChiTileGroup = (
            <TileGroup
                onClick={() => this.handleHandTileGroupClick( basekey, type, returnTileGroup )}
                tiletype={type}
                num={num}
                groupid={basekey}
                key={basekey}
                tilelist={returnTileGroup}
            />
        );

        let newHandTiles = this.state.tiles.slice();
        newHandTiles.push( newChiTileGroup );
        this.setState({ tiles: newHandTiles });

        this.pickTilesFromDeck( type, returnTileGroup );
        if ( this.amount === this.max ) this.props.onFullHand( this.curTiles );
    }

    addCombiKan ( type, num ) {
        let returnTileGroup = [];
        for( let i = 0; i < 4; ++i ) returnTileGroup.push( num );

        if ( !this.checkTileAvailability( type, returnTileGroup ) ) {
            return console.log(`Some tiles have been run out`);
        }


        let basekey = this.amountAdded++;
        let newChiTileGroup = (
            <TileGroup
                onClick={() => this.handleHandTileGroupClick( basekey, type, returnTileGroup )}
                tiletype={type}
                num={num}
                groupid={basekey}
                key={basekey}
                tilelist={returnTileGroup}
            />
        );

        let newHandTiles = this.state.tiles.slice();
        newHandTiles.push( newChiTileGroup );
        this.setState({ tiles: newHandTiles });

        this.pickTilesFromDeck( type, returnTileGroup );
        if ( this.amount === this.max ) this.props.onFullHand( this.curTiles );
    }

    addCombiCkan ( type, num ) {
        let returnTileGroup = [];
        for( let i = 0; i <= 4; ++i ) returnTileGroup.push( num );

        if ( !this.checkTileAvailability( type, returnTileGroup ) ) {
            return console.log(`Some tiles have been run out`);
        }

        let basekey = this.amountAdded++;
        let newChiTileGroup = (
            <TileGroup
                onClick={() => this.handleHandTileGroupClick( basekey, type, returnTileGroup )}
                tiletype={type}
                num={num}
                groupid={basekey}
                key={basekey}
                tilelist={returnTileGroup}
            />
        );

        let newHandTiles = this.state.tiles.slice();
        newHandTiles.push( newChiTileGroup );
        this.setState({ tiles: newHandTiles });

        this.pickTilesFromDeck( type, returnTileGroup );
        if ( this.amount === this.max ) this.props.onFullHand( this.curTiles );
    }

    addSingleTile ( type, num ) {
        let returnTileGroup = [ num ];

        if ( !this.checkTileAvailability( type, returnTileGroup ) ) {
            return console.log(`Some tiles have been run out`);
        }

        let basekey = this.amountAdded++;
        let newChiTileGroup = (
            <Tile
            key={basekey}
            id={basekey}
            tiletype={type}
            num={num}
            src={num + type}
            onClick={() => this.handleHandTileClick(basekey)}
            />
        );

        let newHandTiles = this.state.tiles.slice();
        newHandTiles.push( newChiTileGroup );
        this.setState({ tiles: newHandTiles });

        this.pickTilesFromDeck( type, returnTileGroup );
        if ( this.amount === this.max ) this.props.onFullHand( this.curTiles );
    }

    removeOneTileFromHand(type, num) {
        this.curTiles[type][num - 1] -= 1;
        this.props.onBreakHand();
    }

    handleHandTileClick = (key) => {
        let newTiles = this.state.tiles.filter(t => {
            if ( t.props.id !== key ) return true;
            else {
                this.curTiles[t.props.tiletype][t.props.num - 1] -= 1;
                return false;
            }
        });
        this.setState({ tiles: newTiles });
        this.props.onBreakHand();
    }

    handleHandTileGroupClick = ( key, type, tiles ) => {
        let newTiles = this.state.tiles.filter(t => {
            return t.props.groupid !== key;
        });
        for ( let i in tiles ) {
            this.curTiles[ type ][ tiles[i]-1 ] -= 1;
            this.amount -= 1;
        }
        this.setState({ tiles: newTiles });

        console.log(JSON.stringify(this.curTiles));
        this.props.onBreakHand();
    }

    clearAllTiles() {
        let newTiles = [];
        this.amount = 0;
        for (let type in this.curTiles) {
            this.curTiles[type] = this.curTiles[type].map(num => 0);
        }
        this.setState({ tiles: newTiles });
    }

    render() {
        return (
            <Grid container spacing={8} direction="row">
                { this.state.tiles }
            </Grid>
        );
    }
}

export default Hand;
