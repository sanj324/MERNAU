import { Link } from 'react-router-dom' 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'  
import { signinStart,signinSuccess,signinFailure } from '../redux/user/userslice';
import { useDispatch, useSelector } from 'react-redux'

export default function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const {loading, error} = useSelector((state) => state.user);
    const handlechange = (e) => {               
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signinStart());
            console.log('Submitting form data:', formData);
            
            const res = await fetch('http://localhost:3000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            console.log('Response status:', res.status);
            const data = await res.json();
            dispatch(signinSuccess(data));
            console.log('Response data:', data);
            
            if (data.success === false) {
                dispatch(signinFailure(data.message));
                return;
            }
            
            navigate('/');
        } catch (error) {
            dispatch(signinFailure(error.message || 'Something went wrong!'));
            console.error('Error during signin:', error);
        }
    };
    
    return (
        <div className='p-3 max-w-lg mx-auto'> 
            <h1 className='text-3xl text-center font-semibold my-3'>Signin</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder='email' 
                    id="email" 
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handlechange}
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder='password' 
                    id="password" 
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handlechange}
                    required 
                />
                <button 
                    type="submit" 
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
            <div className='flex gap-2 mt-5'>
                <p>Dont Have an account</p>
                <Link to="/signup">
                    <span className='text-blue-600 hover:text-slate-600 hover:underline cursor-pointer'>
                        Signup
                    </span>
                </Link>
            </div>
        </div>
    )
}
