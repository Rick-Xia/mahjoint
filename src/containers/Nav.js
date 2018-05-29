import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteForever from '@material-ui/icons/DeleteForever'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

// function ButtonAppBar(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
//             <MenuIcon />
//           </IconButton>

//           <Typography variant="title" color="inherit" className={classes.flex}>
//             MAHJOINT
//           </Typography>

//           <Button color="inherit" onClick={() => props.callback}>
//             <DeleteForever />
//           </Button>

//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      root: props.root,
      menuButton: props.menuButton,
      flex: props.flex,
      clearTIles: props.clearTiles
    };
  }

  render() {
    return (
      <div className={this.state.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={this.state.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="title" color="inherit" className={this.state.flex}>
              MAHJOINT
            </Typography>

            <Button color="inherit" onClick={() => this.state.clearTIles()}>
              <DeleteForever />
            </Button>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
