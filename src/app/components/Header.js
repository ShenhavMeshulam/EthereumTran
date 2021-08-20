import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  appBar: {
    display: 'flax',
    width: '100%',
    height: '4rem'
  },
  toolbar: {
    paddingLeft: '10px'
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          EthereumTran
        </Typography>
      </Toolbar>
    </AppBar>
  );
}