import { useState, useEffect } from 'react';

export default function SetEquipped(items){
    const [equipped, setEquipped] = useState({
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
            setEquipped({
                idArray: idArray,
                equipped: equipped
            });
        }
    }, [items, ])

    return equipped;
}