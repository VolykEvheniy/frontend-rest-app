import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCar, setEditMode, updateCarAndBrand} from "../actions/carDetailAction";
import Loading from "../../../components/Loading";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import Error from '../components/Error';
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Typography from '../../../components/Typography'
import {toast, ToastContainer} from "react-toastify";
import {useIntl} from "react-intl";


const CarDetail = () => {
    const { id } = useParams();
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const { car, loading, error, editMode } = useSelector(state => state.detail);

    const [formData, setFormData] = useState({});

    useEffect(() => {
        dispatch(fetchCar(id));
    }, [dispatch, id]);

    useEffect(() => {
        setFormData(car);
    }, [car]);

    console.log("formData",formData);

    const toggleEditMode = () => {
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
            {error && error.length > 0 && <Error errors={error} />}

            <Card>
                <CardContent>
                    {editMode ? (
                        <>
                            <TextField
                                label={formatMessage({id: 'brand'})}
                                value={formData.brand?.name || ''}
                                onChange={(e) => handleInputChange('brand', {...formData.brand, name: e.target.value})}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label={formatMessage({id: 'model'})}
                                value={formData.model || ''}
                                onChange={(e) => handleInputChange('model', e.target.value)}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label={formatMessage({id: 'country'})}
                                value={formData.brand?.country || ''}
                                onChange={(e) => handleInputChange('brand', {...formData.brand, country: e.target.value})}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label={formatMessage({id: 'year'})}
                                value={formData.year || ''}
                                onChange={(e) => handleInputChange('year', e.target.value)}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label={formatMessage({id: 'price'})}
                                value={formData.price || ''}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label={formatMessage({id: 'colors'})}
                                value={formData.color || ''}
                                onChange={(e) => handleInputChange('color', e.target.value)}
                                margin="normal"
                                fullWidth
                            />
                        </>
                    ) : (
                        <>
                            <Typography variant="body2" component="p">
                                {formatMessage({id: 'brand'})}: {formData.brand ? formData.brand.name : 'N/A'} <br/>
                                {formatMessage({id: 'country'})}: {formData.brand ? formData.brand.country : 'N/A'} <br/>
                                {formatMessage({id: 'model'})}: {formData.model}<br />
                                {formatMessage({id: 'year'})}: {formData.year}<br />
                                {formatMessage({id: 'colors'})}: {formData.color}<br />
                                {formatMessage({id: 'price'})}: ${formData.price}<br />
                            </Typography>
                        </>
                    )}

                    <Button onClick={toggleEditMode} color="primary">
                        {editMode ? formatMessage({id: 'cancel'}) : formatMessage({id: 'edit'})}
                    </Button>
                    {editMode && <Button onClick={saveChanges} color="primary">{formatMessage({id: 'save'})}</Button>}
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                </CardContent>
            </Card>
        </div>
    );
};

export default CarDetail;