import {
    FETCH_CARS_REQUEST,
    FETCH_CARS_SUCCESS,
    FETCH_CARS_FAILURE, DELETE_CARS_REQUEST, DELETE_CARS_SUCCESS, DELETE_CARS_FAILURE
} from '../constants/actionTypes';


const initialState = {
    cars: [],
    loading: false,
    error: [],
    totalPages: 0,
};

export default function carReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CARS_REQUEST:
            return {...state, loading: true};
        case FETCH_CARS_SUCCESS:
            return {
                ...state,
                loading: false,
                cars: action.payload.cars,
                totalPages: action.payload.totalPages,
            };
        case FETCH_CARS_FAILURE:
            return {...state, loading: false, error: action.payload.error};
        case DELETE_CARS_REQUEST:
            return {...state, loading: true};
        case DELETE_CARS_SUCCESS:
            return {
                ...state,
                loading: false,
                cars: state.cars.filter(car => car.id !== action.payload)
            };
        case DELETE_CARS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}