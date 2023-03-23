import {Outlet, Navigate} from 'react-router-dom'
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
const PrivateRoute = ({children,  ...rest}) => {

    const token = localStorage.getItem('token');
    

    useEffect(() => {

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
              localStorage.removeItem('token');
              return <Navigate to="/login" />;
            }

        }   
       
      }, [token]);

    return (
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;