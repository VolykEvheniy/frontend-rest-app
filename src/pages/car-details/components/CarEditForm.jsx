import {useIntl} from "react-intl";
import TextField from "../../../components/TextField";

const CarEditForm = ({ formData, handleInputChange }) => {

    const { formatMessage } = useIntl();

    return (
        <>
            <TextField
                label={formatMessage({id: 'brand'})}
                value={formData.brand?.name || ''}
                onChange={(e) => handleInputChange('brand', {...formData.brand, name: e.target.value})}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'model'})}
                value={formData.model || ''}
                onChange={(e) => handleInputChange('model', e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'country'})}
                value={formData.brand?.country || ''}
                onChange={(e) => handleInputChange('brand', {...formData.brand, country: e.target.value})}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'year'})}
                value={formData.year || ''}
                onChange={(e) => handleInputChange('year', e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'price'})}
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'colors'})}
                value={formData.color || ''}
                onChange={(e) => handleInputChange('color', e.target.value)}
                margin="normal"
                fullWidth
            />
        </>
    );
}

export default CarEditForm;