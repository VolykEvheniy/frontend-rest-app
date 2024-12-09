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
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import DeleteDialog from "../components/DeleteDialog";
import Button from "../../../components/Button";
import pagesURLs from "constants/pagesURLs";
import * as pages from "../../../constants/pages";
import {useIntl} from "react-intl";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    }
});

const Cars = () => {
    const classes = useStyles();
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cars, loading, error, totalPages } = useSelector(({car: reducerCar}) => reducerCar);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [filters, setFilters] = useState({});
    const [localCars, setLocalCars] = useState([]);


    useEffect(() => {
        const savedFilters = localStorage.getItem('filters');
        const savedPage = localStorage.getItem('currentPage');
        if (savedFilters) {
            setFilters(JSON.parse(savedFilters));
        }
        if (savedPage) {
            setCurrentPage(Number(savedPage));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters))
        localStorage.setItem('currentPage', currentPage.toString())
        dispatch(fetchCars({...filters, page: currentPage - 1, size: 10 }));
    }, [dispatch, currentPage, filters]);

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const applyFilters = (filterValues) => {
        setFilters(filterValues);
        setCurrentPage(1);
    };


    return (
        <div>
            {loading && <Loading variant="loading"/>}
            {error && <ErrorList errors={error}/>}

            <div className={classes.container}>
                <Button onClick={handleAddCar}>{formatMessage({id: 'addCar'})}</Button>
                <Filters onApply={applyFilters} />
            </div>

            {cars.map(car => (
                <CarCard key={car.id} car={car} onDelete={handleDelete}/>
            ))}
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Cars;
