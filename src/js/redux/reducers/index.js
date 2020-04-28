import {
    SET_AVATAR,
} from '../constants/action-types';

const AVATAR = {
    backgroundColor: null,
    base: null,
    gender: null,
    outfit: null,
    face: {
        eyebrows: null,
        eyes: null,
        ears: null,
        mouth: null,
        nose: null,
        expression: null,
    },
    hair: {
        style: null,
        color: null,
    },
    hat: null,
    top: null,
    bottom: null,
    feet: {
        left: null,
        right: null
    },
    accessories: []
};

const USER = {
    username: null,
};

const STATE = {
    loading: true,
    avatar: AVATAR,
    user: USER,
};

function rootReducer(state=STATE, action) {
    if(action.type === SET_AVATAR) {
        return Object.assign({}, state, {
            avatar: action.payload
        });
    }
    return state;
};

export default rootReducer;