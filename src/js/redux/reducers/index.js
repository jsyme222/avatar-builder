import {
    SET_AVATAR,
    SET_SIDEBAR,
    SET_PANEL,
    SET_BASE,
    SET_FACE,
    SET_TOP,
    SET_BOTTOM,
    SET_HAIR,
    SET_LAYERS,
    SET_GENDER,
    SET_ACCESSORIES,
    SET_EYEBROWS,
    SET_EYES,
    SET_NOSE,
    SET_MOUTH,
} from '../constants/action-types';


const LAYERS = {
        base: {
            pk: null,
            layer: null,
            title: "",
            image: {
                alt: "",
                title: "",
                fixed_to: null,
                image: "",
                pk: null,
            },
        },
        face: [
            {
                pk: null,
                layer: null,
                title: "",
                image: {
                    alt: "",
                    title: "",
                    fixed_to: null,
                    image: "",
                    pk: null,
                }
            },
        ],
        hair: {
            pk: null,
            title: "",
            layer: [
                {
                    layer: -1,
                    image: ""
                },
                {
                    layer: 50,
                    image: ""
                }
            ]
        },
        hat: null,
        top: {
            pk: null,
            title: "",
            layer: null,
            image: "",
        },
        bottom: {
            pk: null,
            layer: null,
            title: "",
            image: {
                alt: "",
                title: "",
                fixed_to: null,
                image: "",
                pk: null,
            },
        },
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
        tab: 3,
        title: 'Faces'
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
                    pk: action.payload.pk,
                }
            }
        });
    }
    if(action.type === SET_TOP) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                top: {
                    image: action.payload.image,
                    title: action.payload.title,
                    pk: action.payload.pk
                }
            }
        });
    }
    if(action.type === SET_BOTTOM) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                bottom: {
                    image: action.payload.image,
                    title: action.payload.title,
                    pk: action.payload.pk
                }
            }
        });
    }
    if(action.type === SET_FACE) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                face: action.payload
            }
        });
    }
    if(action.type === SET_EYEBROWS) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                face: [
                    ...state.layers.face,
                    action.payload
                ]
            }
        });
    }
    if(action.type === SET_EYES) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                face: [
                    ...state.layers.face,
                    action.payload
                ]
            }
        });
    }
    if(action.type === SET_MOUTH) {
        return Object.assign({}, state, {
            layers: {
                ...state.layers,
                face: [
                    ...state.layers.face,
                    action.payload
                ]
            }
        });
    }
    if(action.type === SET_HAIR) {
        return Object.assign({}, state, {
            layers: [
                ...state.layers,
                action.payload
            ]
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