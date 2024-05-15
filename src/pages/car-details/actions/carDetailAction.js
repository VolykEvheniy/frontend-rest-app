import axios from 'axios';
import config from "../../../config";

import {
    FETCH_CAR_DETAIL_REQUEST,
    FETCH_CAR_DETAIL_SUCCESS,
    FETCH_CAR_DETAIL_FAILURE,
    SET_EDIT_MODE,
    UPDATE_CAR_SUCCESS,
    UPDATE_CAR_REQUEST,
    UPDATE_CAR_FAILURE
} from '../constants/actionTypes';

const requestCar = () => ({
    type: FETCH_CAR_DETAIL_REQUEST
});

const receiveCarSuccess = (car) => ({
    type: FETCH_CAR_DETAIL_SUCCESS,
    payload: car
});

const receiveCarFailure = (error) => ({
    type: FETCH_CAR_DETAIL_FAILURE,
    payload: error
});

export const setEditMode = (edit) => ({
    type: SET_EDIT_MODE,
    payload: edit
});

const updateCarRequest = () => ({
    type: UPDATE_CAR_REQUEST
});

const updateCarSuccess = (car) => ({
    type: UPDATE_CAR_SUCCESS,
    payload: car
});

const updateCarFailure = (error) => ({
    type: UPDATE_CAR_FAILURE,
    payload: error
});



export const fetchCar = (id) => (dispatch) => {
    dispatch(requestCar());
    const {CAR_SERVICE} = config;
    return axios.get(`${CAR_SERVICE}/api/car/${id}`)
        .then(response => {
            const {brand, color, id, model, price, year} = response;
            const car = {
                brand, color, id, model, price, year
            }
            dispatch(receiveCarSuccess(car))
            console.log("CAR", car)
        })
        .catch(error => {
                const errorPayload = error.response && error.response.data
                    ? error.response.data.message || ["An error occurred"]
                    : ["An unexpected network error occurred"];
                dispatch(receiveCarFailure(errorPayload));
            }
        )
}

export const updateCar = (car) => (dispatch) => {
    dispatch(updateCarRequest());
    const { CAR_SERVICE } = config;
    return axios.put(`${CAR_SERVICE}/api/car/${car.id}`, car)
        .then(response => {
            const {brand, color, id, model, price, year} = response;
            const car = {
                brand, color, id, model, price, year
            }
            dispatch(updateCarSuccess(car));
            dispatch(setEditMode(false));
        })
        .catch(error => {
            const errorPayload = error.response && error.response.data
                ? error.response.data.message || ["An error occurred"]
                : ["An unexpected network error occurred"];
            dispatch(updateCarFailure(errorPayload));
        });
}

export default {
    fetchCar,
    updateCar,
}

