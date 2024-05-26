import React, { useState } from 'react';
import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import {useIntl} from "react-intl";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    }
});

const Filters = ({ onApply }) => {
    const classes = useStyles();
    const { formatMessage } = useIntl();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleApplyFilters = () => {
        onApply({
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        });
    };

    return (
        <div className={classes.container}>
            <TextField value={minPrice} onChange={e => setMinPrice(e.target.value)} label={formatMessage({id: 'minPrice'})} placeholder={formatMessage({id: 'from'})}/>
            <TextField value={maxPrice} onChange={e => setMaxPrice(e.target.value)} label={formatMessage({id: 'maxPrice'})} placeholder={formatMessage({id: 'to'})}/>
            <Button onClick={handleApplyFilters}>{formatMessage({id: 'applyFilters'})}</Button>
        </div>
    );
};

export default Filters;