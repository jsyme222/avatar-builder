import {
    SET_AVATAR,
    SET_SIDEBAR,
    SET_PANEL,
    SET_BASE,
    SET_LAYERS,
    SET_GENDER,
} from '../constants/action-types';


const LAYERS = {
        base: {
            title: "",
            image: "",
        },
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
    }

const AVATAR = {
    username: "",
    outfitName: "",
    gender: null,
    backgroundColor: null,
};

const STATE = {
    loading: true,
    sidebarOpen: false,
    openPanel: {
        tab: 0,
        title: 'Overview'
    },
    avatar: AVATAR,
    layers: LAYERS
};

function rootReducer(state=STATE, action) {
    if(action.type === SET_AVATAR) {
        return Object.assign({}, state, {
            avatar: action.payload
        });
    }
    if(action.type === SET_LAYERS) {
        return Object.assign({}, state, {
            layers: action.payload
        });
    }
    if(action.type === SET_BASE) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                base: {
                    image: action.payload.image,
                    title: action.payload.title,
                }
            }
        });
    }
    if(action.type === SET_GENDER) {
        return Object.assign({}, state, {
            avatar: {
                ...state.avatar,
                gender: action.payload
            }
        });
    }
    if(action.type === SET_SIDEBAR) {
        return Object.assign({}, state, {
            sidebarOpen: action.payload
        });
    }
    if(action.type === SET_PANEL) {
        return Object.assign({}, state, {
            openPanel: action.payload
        });
    }
    return state;
};

export default rootReducer;