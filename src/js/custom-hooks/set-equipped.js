import React, { useState, useEffect } from 'react';

export default function SetEquipped(items){
    const [equipped, setEquipped] = useState({
        idArray: [],
        items: []
    });

    useEffect(() => {
        console.log(items);
        if(Array.isArray(items)){
            let idArray = [];
            let equipped = [];
            items.length &&
                items.map((h) => {
                    equipped.push(h);
                    idArray.push(h.id);
                    return true;
                });
            setEquipped({
                idArray: idArray,
                equipped: equipped
            });
        }
    }, [items, ])

    return equipped;
}