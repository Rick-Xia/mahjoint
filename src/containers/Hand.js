import React from 'react'
import Tile from '../components/Tile'
import TileGroup from '../components/TileGroup'
import { Grid } from 'material-ui'

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.id = "hand"
        this.max = 14

        this.curTiles = { // number of tiles currently being used
            s: [0,0,0,0,0,0,0,0,0],
            m: [0,0,0,0,0,0,0,0,0],
            p: [0,0,0,0,0,0,0,0,0],
            d: [0,0,0,0,0,0,0]
        }
        this.handTiles = []
        this.curCombis = []

        // Takeaway: keep data that you intend to share across components in store.
        // I should put all tiles info to Redux store
        this.amount = 0
        this.nextKeyForNewTile = 0
        this.state = {
            tiles: []
        }
    }

    // Are tiles to add have been run out?
    isThisTileRunOut( type, num, arg ) {
        // TODO: add check for arg 'chi'
        return this.curTiles[type][num - 1] >= 4 ||
                ( arg === "pon" && this.curTiles[type][num - 1] >= 2 ) ||
                ( (arg === "kan" || arg === "ckan") && this.curTiles[type][num - 1] >= 1 )
    }

    // 
    pickTilesFromDeck( type, tilesToPick ) {
        const amountbeforeadd = this.amount
        for ( let index in tilesToPick ) {
            this.curTiles[ type ][ tilesToPick[index]-1 ] += 1
            this.amount += (this.amount-amountbeforeadd >= 3)? 0 : 1
        }

        if ( this.amount === this.max ) this.props.onFullHand( this.handTiles, this.curCombis )
    }

    // API for Deck to call when user click on deck
    //  add new tiles / new tile combination to hand
    addTiles ( type, num, arg ) {
        if ( this.amount >= this.max || (arg && this.amount + 3 > this.max) ) {
            return console.log(`the hand is full ` + this.amount);
        }

        if ( arg ) this.addCombi( type, num, arg )
        else this.addSingleTile( type, num )
    }
    
    checkTileAvailability ( type, tiles ) {
        let tiletypeBase = this.curTiles[ type ].slice()

        for ( let i in tiles ) {
            if ( ++tiletypeBase[ tiles[i]-1 ] > 4 ) {
                return false
            }
        }
        return true
    }

    determineTilesToAdd ( num, arg ) {
        let tileGroup = []

        if ( arg === 'chi' ) {
            let firstTile = (num > 7)? 7 : num
            for( let i = 0; i < 3; ++i ) tileGroup.push( firstTile + i )
        }
        else if ( arg === 'pon' ) {
            for( let i = 0; i < 3; ++i ) tileGroup.push( num );
        }
        else if ( arg === 'kan' || arg === 'ckan' ) {
            for( let i = 0; i < 4; ++i ) tileGroup.push( num );
        }

        return tileGroup
    }

    addCombi ( type, num, arg ) {
        let tilesToAdd = this.determineTilesToAdd( num, arg )
        if ( !this.checkTileAvailability( type, tilesToAdd ) ) {
            return console.log(`Some tiles have been run out`);
        }

        let basekey = this.nextKeyForNewTile++
        let newTileGroup = (
            <TileGroup
                onClick={() => this.handleHandTileGroupClick( basekey, type, tilesToAdd )}
                tiletype={type}
                num={num}
                groupid={basekey}
                key={basekey}
                tilelist={tilesToAdd}
            />
        )
        let newHandTiles = this.state.tiles.slice()
        newHandTiles.push( newTileGroup )
        this.curCombis.push( [ arg, basekey, type, ...tilesToAdd ] )
        this.setState({ tiles: newHandTiles })
        this.pickTilesFromDeck( type, tilesToAdd )
    }

    addSingleTile ( type, num ) {
        let returnTileGroup = [ num ]
        if ( !this.checkTileAvailability( type, returnTileGroup ) ) {
            return console.log(`Some tiles have been run out`)
        }

        let basekey = this.nextKeyForNewTile++;
        let newTile = (
            <Tile
                key={basekey}
                id={basekey}
                tiletype={type}
                num={num}
                src={num + type}
                onClick={() => this.handleHandTileClick(basekey)}
            />
        )

        let newHandTiles = this.state.tiles.slice()
        newHandTiles.push( newTile )
        this.handTiles.push( [ type, num, basekey ] )
        this.setState({ tiles: newHandTiles })
        this.pickTilesFromDeck( type, returnTileGroup )
    }

    handleHandTileClick = ( key ) => {
        let newTiles = this.state.tiles.filter(t => {
            if ( t.props.id !== key ) return true
            else {
                this.curTiles[t.props.tiletype][t.props.num - 1] -= 1
                this.amount -= 1
                return false
            }
        })
        this.setState({ tiles: newTiles })
        console.log(JSON.stringify(this.curTiles))
        this.handTiles = this.handTiles.filter(t => {
            return t[2] !== key
        })
        console.log(JSON.stringify(this.handTiles))

        this.props.onBreakHand()
    }

    handleHandTileGroupClick = ( key, type, tiles ) => {
        let newTiles = this.state.tiles.filter(t => {
            return t.props.groupid !== key
        })
        for ( let i in tiles ) {
            this.curTiles[ type ][ tiles[i]-1 ] -= 1
            this.amount -= 1
        }
        this.setState({ tiles: newTiles })

        this.curCombis = this.curCombis.filter( com => {
            return com[1] !== key;
        })

        console.log('curTiles are: ' + JSON.stringify(this.curTiles))
        console.log('curCombis are: ' + JSON.stringify(this.curCombis))
        this.props.onBreakHand()
    }

    clearAllTiles() {
        this.amount = 0
        this.handTiles = []
        this.curCombis = []
        for (let type in this.curTiles) {
            this.curTiles[type] = this.curTiles[type].map(num => 0)
        }
        this.setState({ tiles: [] })
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
