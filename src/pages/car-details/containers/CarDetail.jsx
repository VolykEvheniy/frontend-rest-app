import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCar, updateCarAndBrand, addCar} from "../actions/carDetailAction";
import Loading from "../../../components/Loading";
import Error from '../components/Error';
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import {toast, ToastContainer} from "react-toastify";
import CarEditForm from "../components/CarEditForm";
import CarView from "../components/CarView";
import CarActions from "../components/CarActions";
import {createUseStyles} from "react-jss";


const useStyles = createUseStyles({
    content: {
        padding: '30px'
    }
});


const CarDetail = () => {
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { car, loading, error, editMode: initialEditMode } = useSelector(state => state.detail);
    const [formData, setFormData] = useState({});
    const [backupData, setBackupData] = useState({});
    const isNew = id === 'new'
    const [editMode, setEditMode] = useState(isNew || initialEditMode);


    useEffect(() => {
        if (!isNew) {
            dispatch(fetchCar(id));
        }
    }, [dispatch, id, isNew]);

    useEffect(() => {
        if (!isNew) {
            setFormData(car);
            setBackupData(car);
        }

    }, [car, isNew]);


    const toggleEditMode = () => {
        if (!editMode) {
            setBackupData(formData);
            setEditMode(true);
        } else {
            if (isNew) {
                navigate('/cars');
            } else {
                setFormData(backupData);
                setEditMode(false);
            }
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const saveChanges = () => {
        if (isNew) {
            dispatch(addCar(formData));
            navigate('/cars');
        } else {
            dispatch(updateCarAndBrand(formData));
        }
        setEditMode(false);
        toast.success(isNew ? 'Car added successfully' : 'Car updated successfully');
    };

    return (
        <div className={classes.content}>
            {loading && <Loading />}
            {error && <Error errors={error} />}

            <Card>
                <CardContent>
                    {editMode ? (
                        <CarEditForm formData={formData} handleInputChange={handleInputChange} />
                    ) : (
                        <CarView carData={formData} />
                    )}
                    <CarActions editMode={editMode} toggleEditMode={toggleEditMode} saveChanges={saveChanges} isNew={isNew}/>
                </CardContent>
            </Card>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default CarDetail;