import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCars, deleteCar } from '../actions/carActions';
import Loading from "../../../components/Loading";
import ErrorList from "../components/ErrorList";
import CarCard from "../components/CarCard";
import DeleteDialog from "../components/DeleteDialog";
import Button from "../../../components/Button";
import pagesURLs from "constants/pagesURLs";
import * as pages from "../../../constants/pages";

const Cars = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cars, loading, error, totalPages } = useSelector(({car: reducerCar}) => reducerCar);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [localCars, setLocalCars] = useState([]);

    useEffect(() => {
        dispatch(fetchCars({ page: 0, size: 10 }));
    }, [dispatch]);

    useEffect(() => {
        setLocalCars(cars);
    }, [cars]);

    const handleDelete = (id) => {
        setSelectedCarId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteCar(selectedCarId));
        setDeleteDialogOpen(false);
        toast.success('Car deleted successfully');
    };

    const handleAddCar = () => {
        navigate(`${pagesURLs[pages.carDetailPage]}/new`)
    }


    return (
        <div>
            {loading && <Loading variant="loading"/>}
            {error && <ErrorList errors={error}/>}

            <Button onClick={handleAddCar}>Add Car</Button>

            {cars.map(car => (
                <CarCard key={car.id} car={car} onDelete={handleDelete}/>
            ))}
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            {/* add pagination component here */}
        </div>
    );
};

export default Cars;
