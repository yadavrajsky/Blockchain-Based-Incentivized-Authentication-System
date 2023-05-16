/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authSlice';
import UserForm from './UserForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { status, error ,isAuthenticated  } = useSelector((state) => state.auth);
    const handleLogin = (userData) => {
        dispatch(loginUser(userData));
    }
        if(isAuthenticated)
        navigate("/dashboard")
    return (
        <>
        {status === 'loading' ? 'Loading...' :
            <>
                <form>
                    <h2 className='text-red-700 text-3xl my-5 text-center'>Login</h2>
                    {error && <div className="error">{error}</div>}
                    <UserForm handleSubmit={handleLogin} />
                </form>
            </>
        }
    </>
    );
};

export default LoginForm;

