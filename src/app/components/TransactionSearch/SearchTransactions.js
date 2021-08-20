import { makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import TransactionsTable from './TransactionsTable';
import useTransactionsFacth from './useTransactionsFacth';

const useStyles = makeStyles(() => ({
    app: {
        display: 'grid',
        gridTemplateColumns: '5% 90% 5%',
        gridTemplateRows: '5% 7% 3% 75% 10%',
        height: '100%',
        width: '100%',
        backgroundColor: '#f8f9fa'
    },
    loading: {
        gridColumnStart: '2',
        gridRowStart: '3'
    },
    searchBox: {
        gridColumnStart: '2',
        gridRowStart: '2'
    }
}));

export default ({ className }) => {
    const classes = useStyles();

    const [pageNumber, setPageNumber] = useState(1);
    const [ethereumAdress, setEthereumAdress] = useState('');
    const { transactions, hasMore, isLoading, error } = useTransactionsFacth(ethereumAdress, pageNumber);

    var handleEthereumAdressChange = ({ target: { value } }) => {
        setEthereumAdress(value);
        setPageNumber(1);
    }
    return (
        <div className={`${className} ${classes.app}`}>
            <TextField className={classes.searchBox} label="Ethereum Adress" onChange={handleEthereumAdressChange} label="Ethereum Adress" />
            <div className={classes.loading}>{isLoading && 'Loading...'}</div>
            <TransactionsTable isLoading={isLoading} hasMore={hasMore} transactions={transactions} setPageNumber={setPageNumber} />
        </div>);
};