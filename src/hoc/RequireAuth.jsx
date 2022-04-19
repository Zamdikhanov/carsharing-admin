import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
    const location = useLocation();
    const { isAuth } = useSelector((state) => state.auth);

    if (!isAuth) {
        return <Navigate to="/" state={{ from: location.pathname }} />;
    }

    return children;
}

export default RequireAuth;
