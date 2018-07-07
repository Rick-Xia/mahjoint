import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { Grid } from 'material-ui'

const resultStyles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        minWidth: 700,
    }),
})

class ResultPanel extends Component {
    han = 0

    finalPoints () {
        let retVal = ""
        switch ( this.han ) {
            case 0: break;
            case 1: retVal = "1300 (400/700)"; break;
            case 2: retVal = "2600 (700/1300)"; break;
            case 3: retVal = "5200 (1300/2600)"; break;
            case 4: retVal = "7700 (2000/3900)"; break;
            case 5: retVal = "MANGAN 8,000 (2000/4000)"; break;
            case 6: 
            case 7: retVal = "HANEMAN 12,000 (3000/6000)"; break;
            case 8:
            case 9:
            case 10: retVal = "BAIMAN 16,000 (4000/8000)"; break;
            case 11:
            case 12: retVal = "SANBAIMAN 24,000 (6000/12000)"; break;
            default: retVal = "YAKUMAN 32,000 (8000/16,000)"; break; 
        }
        return retVal
    }

    buildCells( valid, yaku ) {
        let cells = []
        if ( valid === 0 ) {
            cells.push(
                <Typography component="p" key={0}>Waiting for a complete hand</Typography>
            )
        } else if ( valid === -1 ) {
            cells.push(
                <Typography component="p" color="error" key={-1}>Invalid handtiles</Typography>
            )
        } else {
            if ( !yaku ) console.log('no yaku received')
            else {
                console.log("yaku received " + JSON.stringify(yaku) )
                let key = 234, result
                for ( let y in yaku ) {
                    result = <Typography component="p" key={key++}>{y + ": " + yaku[y] + " han"}</Typography>
                    cells.push(result)
                }
            }
        }
        return cells
    }

    render () {
        this.han = this.props.yaku.TOTAL
        return (
            <Grid container justify="center">
                <Grid item>
                    <Paper className={this.props.classes.root} elevation={4} >
                        <Typography variant="headline" component="h3">
                            GAME RESULT {this.finalPoints()}
                        </Typography>
                        { this.buildCells( this.props.valid, this.props.yaku ) }
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(resultStyles)(ResultPanel)
