import Typography from 'components/Typography';

const ErrorList = ({ errors }) => {
    return (
        <ul>
            {errors.map((err, index) => (
                <li key={index}><Typography>{err}</Typography></li>
            ))}
        </ul>
    );
}

export default ErrorList;