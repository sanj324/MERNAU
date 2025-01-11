import { Link } from 'react-router-dom' 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handlechange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            setLoading(true);
            console.log('Submitting form data:', formData);
            
            const res = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            console.log('Response status:', res.status);
            const data = await res.json();
            console.log('Response data:', data);
            
            if (data.success === false) {
                setError(data.message);
                return;
            }
            
            setLoading(false);
            setError(null);
            navigate('/signin');
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Something went wrong!');
            console.error('Error during signup:', error);
        }
    };
    
    return (
        <div className='p-3 max-w-lg mx-auto'> 
            <h1 className='text-3xl text-center font-semibold my-3'>Signup</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder='username' 
                    id="username" 
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handlechange}
                    required 
                />
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
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
            <div className='flex gap-2 mt-5'>
                <p>Have an account</p>
                <Link to="/signin">
                    <span className='text-blue-600 hover:text-slate-600 hover:underline cursor-pointer'>
                        Signin
                    </span>
                </Link>
            </div>
        </div>
    )
}
