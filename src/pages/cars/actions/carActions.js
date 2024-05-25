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
    return axios.post(`${CAR_SERVICE}/api/car/_list`, criteria)
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
    return axios.delete(`${CAR_SERVICE}/api/car/${id}`)
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

// export const fetchCars = (criteria = {page: 0, size: 10}) => async (dispatch) => {
//     dispatch(requestCars());
//     const { CAR_SERVICE } = config;
//
//     try {
//         const response = await fetch(`${CAR_SERVICE}/api/car/_list`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(criteria)
//         });
//
//         if (!response.ok) {
//             console.log('Network response was not ok');
//         }
//
//         const data = await response.json();
//         console.log("Parsed data", data);
//         const { carResponseDtoList, totalPages } = data;
//         dispatch(receiveCars({ cars: carResponseDtoList, totalPages }));
//
//     } catch (error) {
//         console.error("Fetch cars error:", error);
//         const errorPayload = error.response && error.response.data
//             ? error.response.data.message || ["An error occurred"]
//             : ["An unexpected network error occurred"];
//         dispatch(carsError(errorPayload));
//     }
// }


export default {
    fetchCars,
    deleteCar,
}

