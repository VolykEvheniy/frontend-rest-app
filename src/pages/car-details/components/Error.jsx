import Typography from 'components/Typography';

const Error = ({ errors }) => {
    if (!errors.length) return null
    return (
        <ul>
            {errors.map((err, index) => (
                <li key={index}><Typography>{err}</Typography></li>
            ))}
        </ul>
    );
}

export default Error;