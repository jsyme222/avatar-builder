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
    SET_ACCESSORIES,
    SET_BOTTOMS,
    SET_FACE,
    SET_FEET,
    SET_EQUIPPED,
    SET_DETAILS,
    SET_ALL_LAYERS,
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

export function setHair(payload) {
    return {type: SET_HAIR, payload}
}

export function setHats(payload) {
    return {type: SET_HATS, payload}
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

export function setFeet(payload) {
    return {type: SET_FEET, payload}
}

export function setSidebarOpen(payload) {
    return {type: SET_SIDEBAR, payload}
}

export function setPanel(payload) {
    return {type: SET_PANEL, payload}
}

export function setEquipped(payload) {
    return {type: SET_EQUIPPED, payload}
}

export function setDetails(payload) {
    return {type: SET_DETAILS, payload}
}

export function setAllLayers(payload) {
    return {type: SET_ALL_LAYERS, payload}
}