import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as pages from 'constants/pages';
import actionsUser from '../actions/user';
import pageURLs from 'constants/pagesURLs';

const AuthHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);


    useEffect(() => {
        const storedUser = localStorage.getItem('USER');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            dispatch(actionsUser.successSignIn(user));
        } else {
            dispatch(actionsUser.fetchProfile()).catch(() => {
                navigate(pageURLs.login);
            });
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        if (userState.isAuthorized) {
            navigate(pageURLs[pages.carsPage]);
        }
    }, [userState, navigate]);

    return null;
};

export default AuthHandler;