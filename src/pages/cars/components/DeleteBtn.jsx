import IconButton from './../../../components/IconButton';
import Close from './../../../components/icons/Close';

const DeleteBtn = ({ onDelete, car }) => (
    <IconButton colorVariant="header" onClick={() => onDelete(car.id)} aria-label="delete">
        <Close color="warning" size={24}/>
    </IconButton>
);

export default DeleteBtn;