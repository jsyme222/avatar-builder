import {
    SET_AVATAR,
    SET_SIDEBAR,
    SET_PANEL,
    SET_BASE,
    SET_LAYERS,
    SET_GENDER,
    SET_GENDER_SELECTIONS,
    SET_TOPS,
    SET_HATS,
    SET_HAIR,
    SET_FACIALHAIR,
    SET_ACCESSORIES,
    SET_BOTTOMS,
    SET_FACE,
    SET_EYEBROWS,
    SET_EYES,
    SET_MOUTH,
    SET_NOSE,
} from '../constants/action-types';

export function setAvatar(payload) {
    return {type: SET_AVATAR, payload}
}

export function setLayers(payload) {
    return {type: SET_LAYERS, payload}
}

export function setBase(payload) {
    return {type: SET_BASE, payload}
}

export function setTops(payload) {
    return {type: SET_TOPS, payload}
}

export function setBottoms(payload) {
    return {type: SET_BOTTOMS, payload}
}

export function setFace(payload) {
    return {type: SET_FACE, payload}
}

export function setEyebrows(payload) {
    return {type: SET_EYEBROWS, payload}
}

export function setEyes(payload) {
    return {type: SET_EYES, payload}
}

export function setMouth(payload) {
    return {type: SET_MOUTH, payload}
}

export function setHair(payload) {
    return {type: SET_HAIR, payload}
}

export function setHats(payload) {
    return {type: SET_HATS, payload}
}

export function setFacialhair(payload) {
    return {type: SET_FACIALHAIR, payload}
}

export function setNose(payload) {
    return {type: SET_NOSE, payload}
}

export function setAccessories(payload) {
    return {type: SET_ACCESSORIES, payload}
}

export function setGender(payload) {
    return {type: SET_GENDER, payload}
}

export function setGenderSelections(payload) {
    return {type: SET_GENDER_SELECTIONS, payload}
}

export function setSidebarOpen(payload) {
    return {type: SET_SIDEBAR, payload}
}

export function setPanel(payload) {
    return {type: SET_PANEL, payload}
}