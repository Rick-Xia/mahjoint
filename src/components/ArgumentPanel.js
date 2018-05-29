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

class ArgumentPanel extends React.Component {

    onClickDummy() {}

    generateWinds = ( wind ) => {
        let grid = [];
        for ( let i=1; i<=4; ++i ) {
            grid.push(
                <Grid key={i} item>
                    <Tile src={i + 'd'} onClick={this.onClickDummy} />
                </Grid>
            );
        }
        return grid;
    }

    render() {
        const oneshotErr = this.props.oneshotErr;
        const quadDrawErr = this.props.quadDrawErr;

        return (
        <Grid container>
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

            <Grid className="dora-wind-panel" item>
                <Grid container direction="column">
                    <Grid className="dora" item>
                        <Grid container direction="row">
                            <Grid item>
                                <p> DORA </p>
                            </Grid>
                            <Grid item>
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

                    <Grid className="prevalent-wind" item container justify='flex-end'>
                        <p>Prevalent wind</p>
                        { this.generateWinds('prevalent') }
                    </Grid>

                    <Grid className="player-wind" item container justify='flex-end'>
                        <p>Player wind</p>
                        { this.generateWinds('player') }
                    </Grid>
                </Grid>
            </Grid>

            <Popover
                open={Boolean(oneshotErr)}
                anchorEl={oneshotErr}
                onClose={this.props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className="OneShot-popover-text">You have to be "Ready" to achieve One-Shot</Typography>
            </Popover>

            <Popover
                open={Boolean(quadDrawErr)}
                anchorEl={quadDrawErr}
                onClose={this.props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className="OneShot-popover-text">Robbing Quad is not compatible with Self-pick</Typography>
            </Popover>
        </Grid>);
    }
}

export default ArgumentPanel;