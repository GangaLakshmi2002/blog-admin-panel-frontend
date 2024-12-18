import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import {useDispatch, useSelector} from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
       setFormData({
        ...formData, [e.target.id]:e.target.value.trim()});
        console.log(formData)
  }
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    if( !formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all fields'));
    }
    console.log(formData);
    try {
      dispatch(signInStart);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json();
      if(data.success === false){
        return dispatch(signInFailure((data.message)));
      }
      
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/')
      }
      
    } catch (error) {
      console.log(error)
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
         {/* left */}
         <div className='flex-1'>
          <Link to='/' className='font-bold 
           dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            rounded-lg text-white'>
              Ganga's</span>
              Blog
           </Link>
           <p className='text-sm mt-5'>
            This is demo project. you can sign up with your email and explore the things
           </p>
         </div>
         {/* right */}
         <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label value='Your email' className="mb-2 block text-left w-full" />
                <TextInput 
                  type='email'
                  placeholder='Email'
                  id='email' 
                   onChange={handleChange}
                  />
              </div>
              <div>
                <Label value='Your password' className="mb-2 block text-left w-full" />
                <TextInput 
                  type='password'
                  placeholder='****'
                  id='password' onChange={handleChange} />
              </div>
              <Button  gradientDuoTone='purpleToPink' type='submit'  disabled={loading} >
                {
                  loading ? (
                    <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                    </>
                  ): (
                     'Sign In'
                  )
                }
              </Button>
              <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already Have an account? </span>
            <Link to='/sign-up' className='text-blue-500'>
             Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
         </div>
      </div>
    </div>
  );
}

export default SignIn;