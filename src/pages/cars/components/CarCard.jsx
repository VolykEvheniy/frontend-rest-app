import Link from "../../../components/Link";
import Card from "../../../components/Card";
import CardContent from "../../../components/CardContent";
import {useIntl} from "react-intl";
import DeleteBtn from "./DeleteBtn";
import Typography from 'components/Typography';
import { createUseStyles } from 'react-jss';
import pagesURLs from "constants/pagesURLs";
import * as pages from "../../../constants/pages";

const useStyles = createUseStyles({
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }
});

const CarCard = ({car, onDelete}) => {

    const classes = useStyles();
    const { formatMessage } = useIntl();
    const carDetailLink = `${pagesURLs[pages.carDetailPage]}/${car.id}`;

    return (

            <Card variant="info">
                <CardContent className={classes.cardContent}>
                    <Link to={{pathname: carDetailLink}}>
                        <Typography variant="title">{car.brand.name} {car.model}</Typography>
                    </Link>
                    <Typography variant="subTitle">{formatMessage({id: 'year'})} : {car.year}</Typography>
                    <div>
                        <DeleteBtn onDelete={onDelete} car={car}/>
                    </div>
                </CardContent>
            </Card>

    )
}

export default CarCard