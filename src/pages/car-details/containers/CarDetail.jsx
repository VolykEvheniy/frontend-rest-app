import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCar, updateCarAndBrand, addCar} from "../actions/carDetailAction";
import Loading from "../../../components/Loading";
import Error from '../components/Error';
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import CardContent from '../../../components/CardContent'
import {toast, ToastContainer} from "react-toastify";
import CarEditForm from "../components/CarEditForm";
import CarView from "../components/CarView";
import CarActions from "../components/CarActions";
import {createUseStyles} from "react-jss";
import {useIntl} from "react-intl";


const useStyles = createUseStyles({
    content: {
        padding: '30px'
    },
    backBtn: {
        marginBottom: '10px'
    }
});

const validations = {
    brand: (data) => data.brand?.name ? {} : { brand: 'Brand name is required' },
    model: (data) => data.model ? {} : { model: 'Model is required' },

};

const CarDetail = () => {
    const { formatMessage } = useIntl();
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { car, loading, error, editMode: initialEditMode } = useSelector(state => state.detail);
    const [formData, setFormData] = useState({});
    const [backupData, setBackupData] = useState({});
    const isNew = id === 'new'
    const [editMode, setEditMode] = useState(isNew || initialEditMode);
    const [formErrors, setFormErrors] = useState({});


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
                setFormErrors({});
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
        const errors = validateFormData(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        if (isNew) {
            dispatch(addCar(formData));
            navigate('/cars');
        } else {
            dispatch(updateCarAndBrand(formData));
        }
        setEditMode(false);
        setFormErrors({});
        toast.success(isNew ? 'Car added successfully' : 'Car updated successfully');
    };
    const handleBack = () => {
        navigate('/cars');
    };

    const validateFormData = (data) => {
        let errors = {};
        if (!data.brand?.name) errors.brand = formatMessage({id: 'emptyBrand'});
        if (!data.model) errors.model = formatMessage({id: 'emptyModel'});
        if (!data.brand?.country) errors.country = formatMessage({id: 'emptyCountry'});
        if (!data.year || data.year.length !== 4 || isNaN(data.year)) errors.year = formatMessage({id: 'yearValidation'});
        if (!data.price || isNaN(data.price) || data.price <= 0) errors.price = formatMessage({id: 'priceValidation'});
        if (!data.color) errors.color = formatMessage({id: 'emptyColor'});
        return errors;
    };

    return (
        <div className={classes.content}>
            {loading && <Loading />}
            {error && <Error errors={error} />}

            {isNew && (
                <div className={classes.backBtn}>
                    <Button onClick={handleBack} className={classes.backButton}>
                        {formatMessage({id: 'back'})}
                    </Button>
                </div>

            )}

            <Card>
                <CardContent>
                    {editMode ? (
                        <CarEditForm formData={formData} handleInputChange={handleInputChange} errors={formErrors}/>
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