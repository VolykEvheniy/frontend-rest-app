import Typography from 'components/Typography';
import Button from 'components/Button';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px'
    }
});


const Pagination = ( {currentPage, totalPages, onPageChange} ) => {
    const classes = useStyles();
    return (
        <div className={classes.pagination}>
            <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </Button>
            <Typography>
                Page {currentPage} of {totalPages}
            </Typography>
            <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </Button>
        </div>
    );
}

export default Pagination;