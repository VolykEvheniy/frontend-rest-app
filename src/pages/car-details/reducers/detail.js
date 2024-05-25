import {
    FETCH_CAR_DETAIL_REQUEST,
    FETCH_CAR_DETAIL_SUCCESS,
    FETCH_CAR_DETAIL_FAILURE,
    SET_EDIT_MODE, UPDATE_CAR_REQUEST, UPDATE_CAR_SUCCESS, UPDATE_CAR_FAILURE,
    UPDATE_BRAND_REQUEST, UPDATE_BRAND_SUCCESS, UPDATE_BRAND_FAILURE,
    ADD_CAR_REQUEST, ADD_CAR_SUCCESS, ADD_CAR_FAILURE,
} from '../constants/actionTypes';

const initialState = {
    car: {},
    loading: false,
    error: [],
    editMode: false
};


export default function carDetailReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CAR_REQUEST:
        case UPDATE_BRAND_REQUEST:
        case UPDATE_CAR_REQUEST:
        case FETCH_CAR_DETAIL_REQUEST:
            return {
                ...state, loading: true
            }
        case ADD_CAR_SUCCESS:
        case UPDATE_CAR_SUCCESS:
        case FETCH_CAR_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                car: action.payload,
            }
        case UPDATE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                car: {...state.car, brand: action.payload}
            }
        case ADD_CAR_FAILURE:
        case UPDATE_CAR_FAILURE:
        case FETCH_CAR_DETAIL_FAILURE:
        case UPDATE_BRAND_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case SET_EDIT_MODE:
            return {
                ...state,
                editMode: action.payload
            }
        default:
            return state;
    }
}