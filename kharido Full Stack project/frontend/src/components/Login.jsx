import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login({setLogin}) {
    let navigate = useNavigate();

const handleNewUser = () => {
    navigate('/signup');
}
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            })
        }).then((response) => response.json()).then((data) => {
            console.log(data.message);
           if(data.message === 'User Logged In Successfully.'){
            //    setUser(data);
               setLogin(true);
               navigate('/');
               localStorage.setItem('user',JSON.stringify(data));
               alert('User Logged In Successfully.');
           }
           else{
               setLogin(false);
               alert('Invalid Email or Password');}
        }).catch((error) => {
            console.error('Error:', error);
            setLogin(false);
            alert('Invalid Email or Password');
        });
    } catch (error) {
        console.error('Error:', error);
        setLogin(false);
        alert('Invalid Email or Password');
    }


}
return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 mt-4">Login Page</h2>
        <button onClick={handleNewUser} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 float-right">New User</button>
        <form className="bg-white p-6 rounded shadow-md w-full max-w-sm mb-6" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Email:</label>
                <input type="email" id="username" name="email" required className="mt-1 p-2 w-full border rounded" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input type="password" id="password" name="password" required className="mt-1 p-2 w-full border rounded"  autoComplete=''/>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Login</button>
        </form>
    </div>
)
}

export default Login