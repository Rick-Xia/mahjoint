import React, { Component } from 'react';
import ResultPanel from '../components/ResultPanel';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid:  false
        };
    }

    checkSpecialCombinations( tiles ) {

    }

    checkNormalCombination( tiles ) {

    }

    calculatePoints( tiles, args ) {
        console.log(`tiles received, which are: ${JSON.stringify(tiles)}`);
        console.log(`args received, which are: ${JSON.stringify(args)}`);
        this.setState({
            valid: true
        });
    }

    removeResult() {
        this.setState({ valid:  false });
    }

    render() {
        return <ResultPanel valid={this.state.valid} />;
    }
}

export default Result;