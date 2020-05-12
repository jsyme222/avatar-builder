import {
    SET_AVATAR,
    SET_SIDEBAR,
    SET_PANEL,
    SET_BASE,
    SET_TOPS,
    SET_BOTTOMS,
    SET_HAIR,
    SET_FACIALHAIR,
    SET_LAYERS,
    SET_GENDER,
    SET_ACCESSORIES,
    SET_EYEBROWS,
    SET_EYES,
    SET_NOSE,
    SET_MOUTH,
} from '../constants/action-types';


const LAYERS = {
        base: [],
        face: {},
        hair: [],
        facialHair: [],
        hat: {},
        tops: [],
        bottoms: [],
        feet: [],
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
        tab: 2,
        title: 'Tops'
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
            layers: {
                ...LAYERS,
                base: state.layers.base,
            }
        });
    }
    if(action.type === SET_BASE) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                base: action.payload
            }
        });
    }
    if(action.type === SET_TOPS) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                tops: action.payload
            }
        });
    }
    if(action.type === SET_BOTTOMS) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                bottoms: action.payload
            }
        });
    }
    if(action.type === SET_EYEBROWS) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                face: {
                    ...state.layers.face,
                    eyebrows: action.payload
                }
            }
        });
    }
    if(action.type === SET_EYES) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                face: {
                    ...state.layers.face,
                    eyes: action.payload
                }
            }
        });
    }
    if(action.type === SET_NOSE) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                face: {
                    ...state.layers.face,
                    nose: action.payload
                }
            }
        });
    }
    if(action.type === SET_MOUTH) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                face: {
                    ...state.layers.face,
                    mouth: action.payload
                }
            }
        });
    }
    if(action.type === SET_HAIR) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                hair: action.payload
            }
        });
    }
    if(action.type === SET_FACIALHAIR) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                facialHair: action.payload
            }
        });
    }
    if(action.type === SET_ACCESSORIES) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                accessories: action.payload
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
}

export default rootReducer;