import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';

import SearchTransactions from './TransactionSearch/SearchTransactions';

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  contet: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    top: '64px',
    bottom: '0'
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.app}>
      <Header />
      <div className={classes.contet}>
        <SearchTransactions />
      </div>
    </Box>
  );
}