import axios from 'axios';
import config from "../../../config";

import {
    FETCH_CARS_REQUEST,
    FETCH_CARS_SUCCESS,
    FETCH_CARS_FAILURE,
    DELETE_CARS_SUCCESS,
    DELETE_CARS_REQUEST,
    DELETE_CARS_FAILURE
} from '../constants/actionTypes';



const requestCars = () => ({
    type: FETCH_CARS_REQUEST
});

const receiveCars = (cars) => ({
    type: FETCH_CARS_SUCCESS,
    payload: cars
});

const carsError = (error) => ({
    type: FETCH_CARS_FAILURE,
    payload: error
});

const deleteCarRequest = () => ({
    type: DELETE_CARS_REQUEST
});

const deleteCarSuccess = (id) => ({
    type: DELETE_CARS_SUCCESS,
    payload: id
});

const deleteCarFailure = (error) => ({
    type: DELETE_CARS_FAILURE,
    payload: error
});



export const fetchCars = (criteria) => (dispatch) => {
    dispatch(requestCars());
    const {CAR_SERVICE} = config
    return axios.post(`${CAR_SERVICE}/api/car/_list`, criteria, { withCredentials: true })
        .then(response => {
            const { carResponseDtoList, totalPages } = response;
            dispatch(receiveCars({ cars: carResponseDtoList, totalPages }));
        })
        .catch(error => {
            const errorPayload = error.response && error.response.data
                ? error.response.data.message || ["An error occurred"]
                : ["An unexpected network error occurred"];
            dispatch(carsError(errorPayload));
        });
}

export const deleteCar = (id) => (dispatch) => {
    dispatch(deleteCarRequest())
    const {CAR_SERVICE} = config
    return axios.delete(`${CAR_SERVICE}/api/car/${id}`, { withCredentials: true })
        .then(response => {
            dispatch(deleteCarSuccess(id))
        })
        .catch(error => {
            const errorPayload = error.response && error.response.data
                 ? error.response.data.message || ["An error occurred"]
                 : ["An unexpected network error occurred"];
            dispatch(deleteCarFailure(errorPayload));
        })
}
export default {
    fetchCars,
    deleteCar,
}

