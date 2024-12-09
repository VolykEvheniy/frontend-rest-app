import PageAccessValidator from "./components/PageAccessValidator";
import * as authorities from "../constants/authorities";
import PageContainer from "./components/PageContainer";
import CarsPage from "../pages/cars";
import React from "react";


const Cars = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_CARS_PAGE]}
        >
            <PageContainer>
                <CarsPage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
};

export default Cars;