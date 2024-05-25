import React, { useState } from 'react';
import Button from "../../../components/Button";
import TextField from "../../../components/TextField";

const Filters = ({ onApply }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleApplyFilters = () => {
        onApply({
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        });
    };

    return (
        <div>
            <TextField value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Minimum Price" />
            <TextField value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Maximum Price" />
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
    );
};

export default Filters;