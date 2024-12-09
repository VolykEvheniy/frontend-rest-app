import Typography from 'components/Typography';
import Button from 'components/Button';
import {createUseStyles} from "react-jss";
import {useIntl} from "react-intl";

const useStyles = createUseStyles({
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px'
    }
});


const Pagination = ( {currentPage, totalPages, onPageChange} ) => {
    const { formatMessage } = useIntl();
    const classes = useStyles();
    return (
        <div className={classes.pagination}>
            <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
                {formatMessage({id: 'previous'})}
            </Button>
            <Typography>
                {formatMessage({id: 'page'})} {currentPage} {formatMessage({id: 'of'})} {totalPages}
            </Typography>
            <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                {formatMessage({id: 'next'})}
            </Button>
        </div>
    );
}

export default Pagination;