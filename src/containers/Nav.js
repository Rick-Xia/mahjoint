import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteForever from '@material-ui/icons/DeleteForever'
import Translate from '@material-ui/icons/Translate'
import List from '@material-ui/icons/FormatListNumbered'
import FrePanel from '../components/FrequencyPanel'

const styles = theme => ({
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
  typography: {
    margin: theme.spacing.unit * 2,
  },
})

const onClickDummy = () => {}

// function ButtonAppBar ( props )  {
class ButtonAppBar extends React.Component {
  state = {
    open: false,
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorPosition',
  }

  handleClickButton = () => {
    this.setState({ open: true, })
  }

  handleClose = () => {
    this.setState({ open: false, })
  }

  anchorEl = null;

  render() {
  const { classes } = this.props
  const {
    open,
    positionTop,
    positionLeft,
    anchorReference,
  } = this.state;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="title" color="inherit" className={classes.flex}>
            MAHJOINT
          </Typography>

          <Button color="inherit" onClick={this.handleClickButton}>
            <List />
          </Button>

          <Button color="inherit" onClick={() => onClickDummy()}>
            <Translate />
          </Button>

          <Button color="inherit" onClick={() => this.props.clearTiles()}>
            <DeleteForever />
          </Button>

        </Toolbar>

        <Popover
          open={open}
          anchorEl={this.anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={this.handleClose}
        >
          <FrePanel />
        </Popover>
        
      </AppBar>
    </div>
  )
}
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
