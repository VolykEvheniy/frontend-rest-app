import axios from 'axios';
import config from "../../../config";

import {
    FETCH_CAR_DETAIL_REQUEST,
    FETCH_CAR_DETAIL_SUCCESS,
    FETCH_CAR_DETAIL_FAILURE,
    SET_EDIT_MODE,
    UPDATE_CAR_SUCCESS,
    UPDATE_CAR_REQUEST,
    UPDATE_CAR_FAILURE,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_FAILURE,
    ADD_CAR_SUCCESS,
    ADD_CAR_REQUEST,
    ADD_CAR_FAILURE
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

const updateBrandRequest = () => ({
    type: UPDATE_BRAND_REQUEST
});

const updateBrandSuccess = (brand) => ({
    type: UPDATE_BRAND_SUCCESS,
    payload: brand
});

const updateBrandFailure = (error) => ({
    type: UPDATE_BRAND_FAILURE,
    payload: error
});

const addCarRequest = () => ({
    type: ADD_CAR_REQUEST
});

const addCarSuccess = (car) => ({
    type: ADD_CAR_SUCCESS,
    payload: car
});

const addCarFailure = (error) => ({
    type: ADD_CAR_FAILURE,
    payload: error
});



export const fetchCar = (id) => (dispatch) => {
    dispatch(requestCar());
    const {CAR_SERVICE} = config;
    return axios.get(`${CAR_SERVICE}/api/car/${id}`, { withCredentials: true })
        .then(response => {
            const {brand, color, id, model, price, year} = response;
            const car = {
                brand, color, id, model, price, year
            }
            dispatch(receiveCarSuccess(car))
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
    const carData = {
        model: car.model,
        year: car.year,
        color: car.color,
        price: car.price,
        brandId: car.brand.id,
    }
    dispatch(updateCarRequest());
    const { CAR_SERVICE } = config;
    return axios.put(`${CAR_SERVICE}/api/car/${car.id}`, carData, { withCredentials: true })
        .then(response => {
            console.log("updating");
            const {brand, color, id, model, price, year} = response;
            const car = {
                brand, color, id, model, price, year
            }
            dispatch(updateCarSuccess(car));
        })
        .catch(error => {
            const errorPayload = error.response && error.response.data
                ? error.response.data.message || ["An error occurred"]
                : ["An unexpected network error occurred"];
            dispatch(updateCarFailure(errorPayload));
        });
}

export const updateBrand = (brand) => (dispatch) => {
    const brandData = {
        name: brand.name,
        country: brand.country,
    }

    dispatch(updateBrandRequest())
    const { CAR_SERVICE } = config;
    axios.put(`${CAR_SERVICE}/api/brand/${brand.id}`, brandData, { withCredentials: true })
        .then(response => {
            const {id, country, name} = response;
            const brand = {
                id, name, country
            }
            dispatch(updateBrandSuccess(brand))
        })
        .catch(error => {
            const errorPayload = error.response && error.response.data
                ? error.response.data.message || ["An error occurred"]
                : ["An unexpected network error occurred"];
            dispatch(updateBrandFailure(errorPayload));
        })

}

export const  updateCarAndBrand = (car) => async (dispatch) => {
    try {
        await dispatch(updateBrand(car.brand));
        await dispatch(updateCar(car))
        dispatch(setEditMode(false));
    } catch (error) {
        const errorPayload = error.response && error.response.data
            ? error.response.data.message || ["An error occurred"]
            : ["An unexpected network error occurred"];
        dispatch(updateCarFailure(errorPayload));
    }
}

export const addCar = (carData) => (dispatch) => {
    dispatch(addCarRequest());
    const { CAR_SERVICE } = config;
    axios.post(`${CAR_SERVICE}/api/car`, carData, { withCredentials: true })
        .then(response => {
            const { model, year, color, price, brand} = response;
            const car = { model, year, color, price, brand}
            dispatch(addCarSuccess(car))
        })
        .catch(error => {
            const errorPayload = error.response && error.response.data
                ? error.response.data.message || ["An error occurred"]
                : ["An unexpected network error occurred"];
            dispatch(addCarFailure(errorPayload));
        })

}

export default {
    fetchCar,
    updateCarAndBrand,
    addCar,
}

