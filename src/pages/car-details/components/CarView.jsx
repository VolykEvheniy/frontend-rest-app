import {useIntl} from "react-intl";
import Typography from '../../../components/Typography'


const CarView = ({ carData }) => {
    const { formatMessage } = useIntl();

    return (
        <>
            <Typography variant="body2" component="p">
                {formatMessage({id: 'brand'})}: {carData.brand ? carData.brand.name : 'N/A'} <br/>
                {formatMessage({id: 'country'})}: {carData.brand ? carData.brand.country : 'N/A'} <br/>
                {formatMessage({id: 'model'})}: {carData.model}<br />
                {formatMessage({id: 'year'})}: {carData.year}<br />
                {formatMessage({id: 'colors'})}: {carData.color}<br />
                {formatMessage({id: 'price'})}: ${carData.price}<br />
            </Typography>
        </>
    );
};

export default CarView;