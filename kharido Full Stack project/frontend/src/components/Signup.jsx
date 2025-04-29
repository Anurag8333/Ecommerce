import React from 'react'
import { useNavigate } from 'react-router-dom'
function Signup() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
                email: e.target.email.value
            })
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            navigate('/login');
        });
    // console.log(e.target.username.value); 
    // console.log(e.target.password.value); 
    // console.log(e.target.email.value); 
    }
  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-gray-100'>
        <h2 className="text-2xl font-bold mb-4 mt-4 ">Sign Up Page</h2>
        <button type='button' onClick={handleLogin} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 float-right">Login</button>
    <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="newUsername" className="block text-gray-700">Username:</label>
            <input type="text" id="newUsername" name="username" required className="mt-1 p-2 w-full border rounded"  />
        </div>
        <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700">Password:</label>
            <input type="password" id="newPassword" name="password" required className="mt-1 p-2 w-full border rounded"  autoComplete=''/>
        </div>
        <div className="mb-4">
            <label htmlFor="useremail" className="block text-gray-700">Email:</label>
            <input type="email" id="useremail" name="email" required className="mt-1 p-2 w-full border rounded"  />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Sign Up</button>
    </form>
    </div>
  )
}

export default Signup