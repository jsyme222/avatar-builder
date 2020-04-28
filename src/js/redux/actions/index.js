import {
    SET_AVATAR,
} from '../constants/action-types';

export function setAvatar(payload) {
    return {type: SET_AVATAR, payload}
};