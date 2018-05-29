import React from 'react';
import ArgumentPanel from '../components/ArgumentPanel';

class ArgumentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: "0",
            oneshot: "0",
            oneshotErr: null,
            ron: "0",
            quadDraw: "0",
            quadDrawErr: null,
            dora: 0
        };
    }

    readArguments() {
        return this.state;
    }

    handleReadyHandChange = this.handleReadyHandChange.bind(this);
    handleReadyHandChange( event ) {
        if ( event.target.value === "0" && this.state.oneshot !== "0" ) {
            this.setState({
                ready: event.target.value,
                oneshot: "0"
            });
        } else {
            this.setState({ ready: event.target.value });
        }
    }

    handleOneShotChange = this.handleOneShotChange.bind(this);
    handleOneShotChange( event ) {
        if ( this.state.ready === "0" ) {
            this.setState({
                ready: "1",
                oneshot: event.target.value,
                oneshotErr: event.currentTarget
            });
        } else {
            this.setState({ oneshot: event.target.value });
        }
    };

    handleClose = this.handleClose.bind(this);
    handleClose() {
        this.setState({
            oneshotErr: null,
            quadDrawErr: null
        });
    };

    handleRonChange = this.handleRonChange.bind(this);
    handleRonChange( event ) {
        if ( event.target.value === "1" && this.state.quadDraw === "2" ) {
            this.setState({
                ron: event.target.value,
                quadDraw: "0",
                quadDrawErr: event.currentTarget
            });
        } else {
            this.setState({ ron: event.target.value });
        }
    }

    handleQuadDrawChange = this.handleQuadDrawChange.bind(this);
    handleQuadDrawChange( event ) {
        if ( event.target.value === "2" && this.state.ron === "1" ) {
            this.setState({
                ron: "0",
                quadDraw: event.target.value,
                quadDrawErr: event.currentTarget
            });
        } else {
            this.setState({ quadDraw: event.target.value });
        }
    }

    handleQuadChange = this.handleQuadChange.bind(this);
    handleQuadChange( event ) {
        if ( this.state.draw !== "0" ) {
            this.setState({
                draw: "0",
                quad: event.target.value,
                quadDrawErr: event.currentTarget
            })
        }
        this.setState({ quad: event.target.value });
    }

    addDora = this.addDora.bind(this);
    addDora() {
        let newdora = this.state.dora + 1;
        this.setState({ dora: newdora });
    }

    removeDora = this.removeDora.bind(this);
    removeDora() {
        let newdora = this.state.dora - 1;
        this.setState({ dora: ( newdora<0? 0 : newdora ) });
    }


    render() {
        return <ArgumentPanel ready={this.state.ready} onChangeReadyHand={this.handleReadyHandChange}
                    oneShot={this.state.oneshot} onChangeOneShot={this.handleOneShotChange}
                    ron={this.state.ron} onChangeRon={this.handleRonChange}
                    quadDraw={this.state.quadDraw} onChangeQuadDraw={this.handleQuadDrawChange}
                    dora={this.state.dora} removeDora={this.removeDora} addDora={this.addDora}
                    oneshotErr={this.state.oneshotErr} quadDrawErr={this.state.quadDrawErr}
                    handleClose={this.handleClose}/>;
    }
}

export default ArgumentContainer;