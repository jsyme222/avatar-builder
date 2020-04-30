import {
    SET_AVATAR,
    SET_SIDEBAR,
    SET_PANEL,
    SET_BASE,
    SET_LAYERS,
    SET_GENDER,
    SET_TOP,
    SET_HAIR,
} from '../constants/action-types';

export function setAvatar(payload) {
    return {type: SET_AVATAR, payload}
};

export function setLayers(payload) {
    return {type: SET_LAYERS, payload}
};

export function setBase(payload) {
    return {type: SET_BASE, payload}
};

export function setTop(payload) {
    return {type: SET_TOP, payload}
};

export function setHair(payload) {
    return {type: SET_HAIR, payload}
};

export function setGender(payload) {
    return {type: SET_GENDER, payload}
};

export function setSidebarOpen(payload) {
    return {type: SET_SIDEBAR, payload}
};

export function setPanel(payload) {
    return {type: SET_PANEL, payload}
};