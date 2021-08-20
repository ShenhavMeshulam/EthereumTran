import { makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
    transaction: {
        display: 'grid',
        height: '40px',
        width: '100%',
        flexDirection: 'row',
        color: '#6c757e',
        borderBottom: '2px solid #e7eaf3',
        gridTemplateColumns: '16% 16% 16% 16% 16% 16%',
        justifyContent: 'space-between'
    },
    item: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
}));

const weiToEth = 1000000000000000000;


export default ({ transaction: { timeStamp, from, to, value, confirmations, hash }, reference }) => {
    const classes = useStyles();
    timeStamp = new Date(parseInt(timeStamp)).toString();
    value = value / weiToEth;

    const Property = ({ prop }) => {
        return <div className={classes.item} >
            <Tooltip title={prop}>
                <div className={classes.text}>
                    {prop}
                </div>
            </Tooltip>
        </div>
    }

    return (
        <div className={classes.transaction} ref={reference}>
            <Property prop={timeStamp} />
            <Property prop={from} />
            <Property prop={to} />
            <Property prop={value} />
            <Property prop={confirmations} />
            <Property prop={hash} />
        </div>);
};