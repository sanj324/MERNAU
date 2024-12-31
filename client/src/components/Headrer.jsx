import { Link } from "react-router-dom"

export default function Headrer() {
  return (
    <div className='bg-slate-200'>
          <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to="/">
            <h1 className='font-bold'>Auth App</h1>
            </Link>
          <h1 className='font-bold'>Auth App</h1>
          <ul className='flex gap-4'>
            <Link to="/">
            <li>Home</li>
            </Link>
            <Link to="/about">
            <li>About</li>
            </Link>
            <Link to="/profile">
            <li>Profile</li>
            </Link>
            <Link to="/signin">
            <li>Signin</li>
            </Link>
            <Link to="/signup">
            <li>Signup</li>
            </Link>
          </ul> 
            </div>
    </div>
  )
}
