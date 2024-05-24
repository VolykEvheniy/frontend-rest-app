import {useIntl} from "react-intl";
import Button from "../../../components/Button";
import React from "react";


const CarActions = ({ editMode, toggleEditMode, saveChanges }) => {

    const { formatMessage } = useIntl();

    return (
        <>
            <Button onClick={toggleEditMode} color="primary">
                {editMode ? formatMessage({id: 'cancel'}) : formatMessage({id: 'edit'})}
            </Button>
            {editMode && <Button onClick={saveChanges} color="primary">{formatMessage({id: 'save'})}</Button>}
        </>
    );
}

export default CarActions;