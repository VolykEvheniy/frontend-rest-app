import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCar, setEditMode, updateCarAndBrand} from "../actions/carDetailAction";
import Loading from "../../../components/Loading";
import Error from '../components/Error';
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import {toast, ToastContainer} from "react-toastify";
import CarEditForm from "../components/CarEditForm";
import CarView from "../components/CarView";
import CarActions from "../components/CarActions";


const CarDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { car, loading, error, editMode } = useSelector(state => state.detail);
    const [formData, setFormData] = useState({});
    const [backupData, setBackupData] = useState({});
    const isNew = id === 'new'

    console.log("Id", id);

    console.log("isNew" , isNew)

    useEffect(() => {
        dispatch(fetchCar(id));
    }, [dispatch, id]);

    useEffect(() => {
        setFormData(car);
    }, [car]);

    console.log("formData",formData);

    const toggleEditMode = () => {
        if (!editMode) {
            setBackupData(formData)
        } else {
            setFormData(backupData)
        }
        dispatch(setEditMode(!editMode));
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const saveChanges = () => {
        dispatch(updateCarAndBrand(formData));
        toast.success('Car and brand were updated successfully');
    };

    return (
        <div style={{ padding: '20px' }}>
            {loading && <Loading />}
            {error && <Error errors={error} />}

            <Card>
                <CardContent>
                    {editMode ? <CarEditForm formData={formData} handleInputChange={handleInputChange}/> : <CarView carData={formData}/>}
                    <CarActions editMode={editMode} toggleEditMode={toggleEditMode} saveChanges={saveChanges}/>
                </CardContent>
            </Card>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default CarDetail;