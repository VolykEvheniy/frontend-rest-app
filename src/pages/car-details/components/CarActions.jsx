import {useIntl} from "react-intl";
import Button from "../../../components/Button";
import React from "react";


const CarActions = ({ editMode, toggleEditMode, saveChanges, isNew}) => {

    const { formatMessage } = useIntl();

    return (
        <>
            <Button onClick={toggleEditMode} color="primary">
                {editMode ? (isNew ? formatMessage({id: 'cancel'}) : formatMessage({id: 'cancel'})) : formatMessage({id: 'edit'})}
            </Button>
            {editMode && (
                <Button onClick={saveChanges} color="primary">
                    {isNew ? formatMessage({id: 'create'}) : formatMessage({id: 'save'})}
                </Button>
            )}
        </>
    );
}

export default CarActions;