import { useState, useEffect } from 'react';

export default function SetEquipped(items){
    const [equipped, setEquippedItems] = useState({
        idArray: [],
        items: []
    });

    useEffect(() => {
        if(Array.isArray(items)){
            let idArray = [];
            let equipped = [];
            items.length &&
                items.map((h) => {
                    if(h && h.id){
                        equipped.push(h);
                        idArray.push(h.id);
                    }
                    return true;
                });
            setEquippedItems({
                idArray: idArray,
                equipped: equipped
            });
        }
    }, [items, ])

    return equipped;
}