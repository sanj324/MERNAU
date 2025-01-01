import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'> 
        <h1 className='text-3xl text-center font-semibold my-3'>Signup</h1>
        <form className='flex flex-col gap-4'>
            <input type="text" name="username" placeholder='username' id="username" className='bg-slate-100 p-3 rounded-lg ' />
            <input type="email" name="email" placeholder='email' id="email" className='bg-slate-100 p-3 rounded-lg ' />
            <input type="password" name="password" placeholder='password' id="password" className='bg-slate-100 p-3 rounded-lg ' />
            <button type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Signup</button>
        </form>
        <div className='flex gap-2 mt-5'>

        <p>Have an account</p>
        <Link to="/signin" ><span className='text-blue-600 hover:text-slate-600 hover:underline cursor-pointer'>Signin</span></Link>
            
        </div>
    
       
    </div>
  )
}
