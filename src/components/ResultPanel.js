import React, { Component } from 'react';

const darkBlue = 'rgb(059, 089, 152)';

class ResultPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ret: (<h1>The result is not ready</h1>)
        };
    }

    componentWillReceiveProps(nextProps) {
        if ( nextProps.valid ) {
            this.setState({
                ret: <h1>Results!!!!!!!!</h1>
            });
        } else {
            this.setState({
                ret: <h1>The result is not ready</h1>
            });
        }
    }

    buildResult() {}

    render() {
        return (
            <div style={{ background: darkBlue }}>
                {this.state.ret}
            </div>
        );
    }
}

export default ResultPanel;