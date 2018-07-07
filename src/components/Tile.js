import React from 'react';
import { Grid } from 'material-ui';
import PropTypes from 'prop-types';
import '../styles/Tile.css'

const determineOpacity = ( combi, wind, src ) => {
    if ( combi ) {
        if ( combi.chi && src.endsWith('d') ) return 0.5
    } else if ( wind ) {
        if ( src.startsWith(wind) ) return 0.5
    }
    return 1
}

const Tile = ( props ) => {
    const { onClick, src, ...rest } = props

    return (
        <Grid item>
            <input type="image"
                    className="Tile"
                    style={{ opacity: determineOpacity(rest.combi, rest.wind, src) }}
                    
                    onClick={onClick}
                    src={`./img/${src}.png`}
                    alt={`Deck Tile ${src}`}
                    {...rest}
            />
        </Grid>
    );
}

Tile.propTypes = {
    src:    PropTypes.string.isRequired,
    onClick:    PropTypes.func.isRequired
}

export default Tile