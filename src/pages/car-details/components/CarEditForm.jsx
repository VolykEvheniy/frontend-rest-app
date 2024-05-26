import {useIntl} from "react-intl";
import TextField from "../../../components/TextField";

const CarEditForm = ({ formData, handleInputChange, errors }) => {

    const { formatMessage } = useIntl();

    return (
        <>
            <TextField
                label={formatMessage({id: 'brand'})}
                error={!!errors.brand}
                helperText={errors.brand}
                value={formData.brand?.name || ''}
                onChange={(e) => handleInputChange('brand', {...formData.brand, name: e.target.value})}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'model'})}
                error={!!errors.model}
                helperText={errors.model}
                value={formData.model || ''}
                onChange={(e) => handleInputChange('model', e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'country'})}
                error={!!errors.country}
                helperText={errors.country}
                value={formData.brand?.country || ''}
                onChange={(e) => handleInputChange('brand', {...formData.brand, country: e.target.value})}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'year'})}
                error={!!errors.year}
                helperText={errors.year}
                value={formData.year || ''}
                onChange={(e) => handleInputChange('year', e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'price'})}
                error={!!errors.price}
                helperText={errors.price}
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label={formatMessage({id: 'colors'})}
                error={!!errors.color}
                helperText={errors.color}
                value={formData.color || ''}
                onChange={(e) => handleInputChange('color', e.target.value)}
                margin="normal"
                fullWidth
            />
        </>
    );
}

export default CarEditForm;