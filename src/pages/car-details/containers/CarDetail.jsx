import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCar, setEditMode, updateCar} from "../actions/carDetailAction";
import Loading from "../../../components/Loading";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import Error from '../components/Error'


const CarDetail = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const {car, loading, error, editMode } = useSelector(state => state.detail);

    console.log("Store", useSelector((state => state.detail)))
    useEffect(() => {
        dispatch(fetchCar(id));
    }, [dispatch, id]);

    const toggleEditMode = () => {
        dispatch(setEditMode(!editMode));
    };

    const saveChanges = () => {
        dispatch(updateCar(car));
    };


    return (
        <div>
            {loading && <Loading variant="loading"/>}
            {error && <Error errors={error}/>}
            {editMode ? (
                <TextField value={car.name} onChange={(e) => dispatch(updateCar({ ...car, name: e.target.value }))} />
            ) : (
                <h3>{car.name}</h3>
            )}
            {car.brand.name} - {car.model} - {car.price}

            <Button onClick={toggleEditMode}>
                {editMode ? 'Cancel' : 'Edit'}
            </Button>
            {editMode && <Button onClick={saveChanges}>Save</Button>}
        </div>
    );
};

export default CarDetail;