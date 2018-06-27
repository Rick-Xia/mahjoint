import React from 'react';
import Radio from 'material-ui/Radio';
import RadioGroup from 'material-ui/Radio/RadioGroup';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import FormControl from 'material-ui/Form/FormControl';
import FormLabel from 'material-ui/Form/FormLabel';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Tile from '../components/Tile';
import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    typography: {
      margin: theme.spacing.unit * 2,
    },
});

class ArgumentPanel extends React.Component {

    generateWinds = ( wind, handleClick ) => {
        let grid = [];
        for ( let i=1; i<=4; ++i ) {
            grid.push(
                <Grid key={i} item>
                    <Tile src={i + 'd'} onClick={() => handleClick(i)} wind={wind} />
                </Grid>
            );
        }
        return grid;
    }

    render() {
        const oneshotErr = this.props.oneshotErr;
        const quadDrawErr = this.props.quadDrawErr;

        return (
        <Grid container justify="center" spacing={40} style={{marginTop: 40}}>
            <Grid className="readyHand-radio" item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Ready Hand</FormLabel>
                    <RadioGroup
                        aria-label="Ready Hand"
                        name="ready"
                        value={this.props.ready}
                        onChange={this.props.onChangeReadyHand}
                    >
                        <FormControlLabel value="0" control={<Radio />} label="N/A" />
                        <FormControlLabel value="1" control={<Radio />} label="Ready Hand" />
                        <FormControlLabel value="2" control={<Radio />} label="Double Ready" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            
            <Grid className="oneShot-radio" item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">One Shot</FormLabel>
                    <RadioGroup
                        aria-label="One Shot"
                        name="one shot"
                        value={this.props.oneShot}
                        onChange={this.props.onChangeOneShot}
                    >
                        <FormControlLabel value="0" control={<Radio />} label="N/A" />
                        <FormControlLabel value="1" control={<Radio />} label="One-Shot" />
                    </RadioGroup>
                    
                </FormControl>
            </Grid>

            <Grid className="ron-radio" item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Ron</FormLabel>
                    <RadioGroup
                        aria-label="type of Ron"
                        name="ron"
                        value={this.props.ron}
                        onChange={this.props.onChangeRon}
                    >
                        <FormControlLabel value="0" control={<Radio />} label="Ron" />
                        <FormControlLabel value="1" control={<Radio />} label="Self-pick" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid className="draw-radio" item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Special Draw/Quad</FormLabel>
                    <RadioGroup
                        aria-label="type of special draw or quad operations"
                        name="quadDraw"
                        value={this.props.quadDraw}
                        onChange={this.props.onChangeQuadDraw}
                    >
                        <FormControlLabel value="0" control={<Radio />} label="N/A" />
                        <FormControlLabel value="1" control={<Radio />} label="Last-Draw/ Last-Tile" />
                        <FormControlLabel value="2" control={<Radio />} label="Robbing Quad" />
                        <FormControlLabel value="3" control={<Radio />} label="Dead Wall Draw" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid className="dora-wind-panel" item >
                <Grid container direction="column" >

                    <Grid className="dora" item >
                        <Grid container direction="row" >

                            <Grid item>
                                <p> DORA </p>
                            </Grid>

                            <Grid item style={{ marginLeft: "auto" }}>
                                <IconButton color="primary" className="remove-dora" onClick={this.props.removeDora} aria-label="Remove a dora">
                                    <RemoveIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <p> { this.props.dora } </p>
                            </Grid>
                            <Grid item>
                                <IconButton color="primary" className="add-dora" onClick={this.props.addDora} aria-label="Add a dora">
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="prevalent-wind" item container>
                        <Grid item style={{ marginRight: "auto" }}>
                            <p>Prevalent</p>
                        </Grid>
                        { this.generateWinds(this.props.curPrevalentWind, this.props.onPrevalentWindClick) }
                    </Grid>

                    <Grid className="seat-wind" item container>
                        <Grid item style={{ marginRight: "auto" }}>
                            <p>Seat</p>
                        </Grid>
                        { this.generateWinds(this.props.curSeatWind, this.props.onSeatWindClick) }
                    </Grid>
                </Grid>
            </Grid>

            <Popover
                open={Boolean(oneshotErr)}
                anchorEl={oneshotErr}
                onClose={this.props.onPopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={this.props.classes.typography}>You have to be "Ready" to achieve One-Shot</Typography>
            </Popover>

            <Popover
                open={Boolean(quadDrawErr)}
                anchorEl={quadDrawErr}
                onClose={this.props.onPopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={this.props.classes.typography}>Robbing Quad is not compatible with Self-pick</Typography>
            </Popover>
        </Grid>);
    }
}

export default withStyles(styles)(ArgumentPanel)