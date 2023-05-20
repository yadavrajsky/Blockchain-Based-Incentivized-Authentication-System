/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorsAndMessages, loginUser } from './authSlice';
import UserForm from './UserForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../Components/utils/showToast';
import { Oval } from 'react-loader-spinner';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message, status, error, isAuthenticated } = useSelector((state) => state.auth);
    const handleLogin = (userData) => {
        dispatch(loginUser(userData));
    }

    useEffect(() => {
        if (message)
            showToast(false, message, "Auth")
        else if (error)
            showToast(error, false, "Auth")
        dispatch(clearErrorsAndMessages());
    }, [error, message])
    useEffect(() => {
        if (isAuthenticated)
            navigate("/dashboard")
    }, [])
    return (
        <>
            {status === 'loading' ? <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 h-screen overflow:hidden'>
                <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div> :
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

