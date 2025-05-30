import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { UserType } from '@/types';
// import { useReadData } from '@/hooks/useReadData';
// import { setUser } from '@/redux/userSlice';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    // const dispatch = useDispatch();
    const location = useLocation();

    // const { data, isLoading } = useReadData<UserType>('users', '/users/user/me');
    const token = localStorage.getItem('token');
    // useEffect(() => {
    //     if (!isLoading && data) {
    //         const token = localStorage.getItem('token');
    //         if (token) {
    //             dispatch(setUser(data));
    //             console.log('User authenticated, accessing protected route');
    //         }
    //     } else if (!isLoading && !data) {
    //         console.log('User not authenticated, redirecting to login');
    //     }
    // }, [data, dispatch, isLoading]);

    // if (!token) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <p className="text-lg font-semibold">Loading...</p>
    //         </div>
    //     );
    // }

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
