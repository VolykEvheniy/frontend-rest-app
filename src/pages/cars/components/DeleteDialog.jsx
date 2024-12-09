import Dialog from './../../../components/Dialog';
import Button from './../../../components/Button';
import Typography from 'components/Typography';
import {useIntl} from "react-intl";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles ({
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        gap: '16px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        margin: '0 5px',
    }
});


const DeleteDialog = ({ open, onClose, onConfirm }) => {

    const classes = useStyles();
    const { formatMessage } = useIntl();

    return (
        <Dialog open={open} onClose={onClose} maxWidth='xs'>
            <div className={classes.dialogContent}>
                <Typography>{formatMessage({id: 'deleteMessage'})}</Typography>
                <div className={classes.buttonContainer}>
                    <Button className={classes.button}
                            onClick={onConfirm}>{formatMessage({id: 'confirm'})}
                    </Button>
                    <Button className={classes.button}
                            onClick={onClose}>{formatMessage({id: 'cancel'})}</Button>
                </div>
            </div>
        </Dialog>
    )
}




export default DeleteDialog