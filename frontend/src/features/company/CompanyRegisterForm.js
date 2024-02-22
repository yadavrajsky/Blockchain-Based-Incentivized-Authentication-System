import React from 'react'
import UserForm from '../auth/UserForm'
import { useDispatch } from 'react-redux';

const CompanyRegisterForm = () => {
  const dispatch = useDispatch();

  const handleRegister = (userData) => {
    // dispatch(registerUser(userData));
}
  return (
    <div>   <form>
    <h2 className='text-red-700 text-3xl my-5 text-center'>Company Registration</h2>
    {/* {error && <div className="error">{ }</div>} */}
    <UserForm handleSubmit={handleRegister} />
</form>
</div>
  )
}

export default CompanyRegisterForm