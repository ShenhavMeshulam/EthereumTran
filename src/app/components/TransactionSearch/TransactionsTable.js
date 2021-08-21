import { makeStyles } from '@material-ui/core';
import React, { useCallback, useRef } from 'react';
import Transaction from './Transaction';

const useStyles = makeStyles(() => ({
    tabel: {
        gridColumnStart: '2',
        gridRowStart: '4',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        border: ' 1px solid #e7eaf3',
        borderRadius: '10px',
        backgroundColor: '#f8fafd'
    },
    header: {
        display: 'grid',
        height: '40px',
        color: '#e9ecf7',
        gridTemplateColumns: '16% 16% 16% 16% 16% 16%',
        borderBottom: '2px solid #e7eaf3',
        backgroundColor: '#3f51b5'
    },
    headerItem: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        height: '100%',
        width: '100%',
        overflowY: 'auto'
    }

}));

const COLUMNS = [
    { header: 'timeStamp' },
    { header: 'from' },
    { header: 'to' },
    { header: 'value(Eth)' },
    { header: 'confirmations' },
    { header: 'hash' }
]

export default ({ transactions, setPageNumber, isLoading, hasMore }) => {
    const classes = useStyles();

    const observer = useRef();
    const lastTransactionRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) setPageNumber(prev => prev + 1)
        })
        if (node) observer.current.observe(node)
    }, [isLoading, hasMore]);

    return (
        <div className={classes.tabel}>
            <div className={classes.header}>
                {COLUMNS.map((x) => <div className={classes.headerItem}>{x.header}</div>)}
            </div>
            <div className={classes.content}>
                {
                    transactions.map((tran, index) => {
                        if (transactions.length === index + 1) {
                            return <Transaction key={index} reference={lastTransactionRef} key={tran.hash} transaction={tran} />
                        } else {
                            return <Transaction key={index} transaction={tran} />
                        }
                    })
                }
            </div>
        </div>
    );
};