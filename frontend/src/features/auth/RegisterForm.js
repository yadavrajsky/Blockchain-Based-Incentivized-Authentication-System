/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorsAndMessages, registerUser } from './authSlice';
import UserForm from './UserForm';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { status, error, message } = useSelector((state) => state.auth);

    const handleRegister = (userData) => {
        dispatch(registerUser(userData));

    }
    useEffect(() => {
        if (message)
            toast.success(message)
        else if (error)
            toast.error(error)
        dispatch(clearErrorsAndMessages());
    }, [error, message])
    useEffect(() => {
        if (isAuthenticated)
            navigate("/dashboard")
    }, [])
    return (
        <>
            {status === 'loading' ? 'Loading...' :
                <>
                    <form>
                        <h2 className='text-red-700 text-3xl my-5 text-center'>Register</h2>
                        {error && <div className="error">{ }</div>}
                        <UserForm handleSubmit={handleRegister} />
                    </form>
                </>
            }
        </>
    );
};
export default RegisterForm;
