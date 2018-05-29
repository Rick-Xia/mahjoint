import React from 'react';
import { Grid } from 'material-ui';
import PropTypes from 'prop-types';

const TileGroup = ( {onClick, num, tiletype, groupid, ...rest} ) => {
    let minorID = groupid;
    let tileGroup = rest.tilelist;
    tileGroup = tileGroup.map( t => {
        let src = t + tiletype;
        return (
            <Grid key={minorID++} item>
                <input
                    type="image"
                    groupid={groupid}
                    num={num} 
                    onClick={onClick}
                    src={`./img/${src}.png`}
                    alt={`Deck Tile ${src}`} 
                    {...rest}
                />
            </Grid>
        );
    });

    return (
        <Grid item>
            <Grid container spacing={0}>
                { tileGroup }
            </Grid>
        </Grid>
    );
}

TileGroup.propTypes = {
    //src:    PropTypes.string.isRequired,
    onClick:    PropTypes.func.isRequired,
}

export default TileGroup;