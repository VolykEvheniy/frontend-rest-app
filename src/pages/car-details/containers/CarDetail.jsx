import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCar, setEditMode, updateCar} from "../actions/carDetailAction";
import Loading from "../../../components/Loading";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import Error from '../components/Error';
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Typography from '../../../components/Typography'


const CarDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { car, loading, error, editMode } = useSelector(state => state.detail);

    const [formData, setFormData] = useState({});

    useEffect(() => {
        dispatch(fetchCar(id));
    }, [dispatch, id]);

    useEffect(() => {
        setFormData(car);
    }, [car]);

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
        dispatch(updateCar(formData));
    };

    return (
        <div style={{ padding: '20px' }}>
            {loading && <Loading />}
            {error.length > 0 && <Error errors={error} />}

            <Card>
                <CardContent>
                    {editMode ? (
                        <>
                            <TextField
                                label="Brand"
                                value={formData.brand?.name || ''}
                                onChange={(e) => handleInputChange('brand', {...formData.brand, name: e.target.value})}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Model"
                                value={formData.model || ''}
                                onChange={(e) => handleInputChange('model', e.target.value)}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Country"
                                value={formData.brand?.country || ''}
                                onChange={(e) => handleInputChange('country', {...formData.brand, country: e.target.value})}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Year"
                                value={formData.year || ''}
                                onChange={(e) => handleInputChange('year', e.target.value)}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Price"
                                value={formData.price || ''}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Colors"
                                value={formData.color || ''}
                                onChange={(e) => handleInputChange('color', e.target.value)}
                                margin="normal"
                                fullWidth
                            />
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" component="h2">{formData.name}</Typography>
                            <Typography color="textSecondary">
                                Brand: {formData.brand ? formData.brand.name : 'N/A'}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Model: {formData.model}<br />
                                Year: {formData.year}<br />
                                Color: {formData.color}<br />
                                Price: ${formData.price}<br />
                            </Typography>
                        </>
                    )}

                    <Button onClick={toggleEditMode} color="primary">
                        {editMode ? 'Cancel' : 'Edit'}
                    </Button>
                    {editMode && <Button onClick={saveChanges} color="primary">Save</Button>}
                </CardContent>
            </Card>
        </div>
    );
};

export default CarDetail;