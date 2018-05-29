import React from 'react';
import { Grid } from 'material-ui';
import PropTypes from 'prop-types';

const Tile = ( {onClick, src, ...rest} ) => {
    return (
        <Grid item>
            <input type="image" onClick={onClick} src={`./img/${src}.png`} alt={`Deck Tile ${src}`} {...rest} />
        </Grid>
    );
}

Tile.propTypes = {
    src:    PropTypes.string.isRequired,
    onClick:    PropTypes.func.isRequired
}

export default Tile;