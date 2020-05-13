const SUBCATEGORIES = {
    'EYEBROWS': props.setEyebrows,
    'EYES': props.setEyes,
    'NOSES': props.setNose,
    'MOUTHS': props.setMouth,
    'HEAD-HAIR': props.setHair,
    'FACIAL-HAIR': props.setFacialhair,
};

export function addRemove(obj, idArray){
    let data; // --> Array
    if(obj.subcategory){
        let field = obj.subcategory;
        if(idArray.includes(obj.id)){
            data = []
        }else {
            data = [obj, ]
        }
    }
    SUBCATEGORIES[field](data);
}