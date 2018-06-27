import React from 'react';
import ArgumentPanel from '../components/ArgumentPanel';

class ArgumentContainer extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            ready: "0",
            oneshot: "0",
            oneshotErr: null,
            ron: "0",
            quadDraw: "0",
            quadDrawErr: null,
            dora: 0,
            prevalentWind: "1",
            seatWind: "1",
        }
    }

    readArguments() {
        return this.state
    }

    handlePrevalentWindClick = ( i ) => {
        this.setState({ prevalentWind: i })
    }

    handleSeatWindClick = ( i ) => {
        this.setState({ seatWind: i })
    }

    handleReadyHandChange = ( event ) => {
        if ( event.target.value === "0" && this.state.oneshot !== "0" ) {
            this.setState({
                ready: event.target.value,
                oneshot: "0"
            });
        } else {
            this.setState({ ready: event.target.value });
        }
    }

    handleOneShotChange = ( event ) => {
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

    handleClose = () => {
        this.setState({
            oneshotErr: null,
            quadDrawErr: null
        });
    };

    handleRonChange = ( event ) => {
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

    handleQuadDrawChange = ( event ) => {
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

    handleQuadChange = ( event ) => {
        if ( this.state.draw !== "0" ) {
            this.setState({
                draw: "0",
                quad: event.target.value,
                quadDrawErr: event.currentTarget
            })
        }
        this.setState({ quad: event.target.value });
    }

    addDora = () => {
        let newdora = this.state.dora + 1;
        this.setState({ dora: newdora });
    }

    removeDora = () => {
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
                    curPrevalentWind={this.state.prevalentWind} curSeatWind={this.state.seatWind}
                    onPopoverClose={this.handleClose} onPrevalentWindClick={this.handlePrevalentWindClick}
                    onSeatWindClick={this.handleSeatWindClick} />;
    }
}

export default ArgumentContainer;