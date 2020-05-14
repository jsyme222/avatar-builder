import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import ItemsList from './items-list';
import Item from './item';

function EquippedItemsList(props) {
    const [item, setItem] = useState(null);

    useEffect(() => {
        setItem(props.item);
    }, [props.item, ]);

    return (
        <div>
            <Item item={item} equipped={false} />
        </div>
    )
}

export default EquippedItemsList;