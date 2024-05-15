import * as authorities from "../constants/authorities";
import PageAccessValidator from "./components/PageAccessValidator";
import PageContainer from "./components/PageContainer";
import CarDetailPage from "../pages/car-details"


const CarDetail = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_CAR_DETAIL_PAGE]}
        >
            <PageContainer>
                <CarDetailPage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
}

export default CarDetail;