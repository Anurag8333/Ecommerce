import React from 'react';
import Login from '../components/Login';

const Userinfo = ({user}) => {
    // Dummy user data
    // const user = {
    //     name: 'John Doe',
    //     email: 'john.doe@example.com',
    //     username: 'johndoe',
    //     joined: 'January 1, 2021'
    // };
    console.log(user);

    return (
        <>
        {user ? (
            <div className="max-w-md mx-auto bg-blue-400 shadow-lg rounded-lg overflow-hidden mt-10">
            <div className="p-6">
                <h1 className="text-3xl font-semibold mb-6 text-gray-900"> User Information</h1>
                <div className="mb-4">
                    <strong className="text-orange-300 text-[1.5rem]">Name: </strong> <span className="text-grey-900 text-[1.5rem]">{user.username}</span>
                </div>
                <div className="mb-4">
                    <strong className="text-yellow-400 text-[1.5rem]">Email: </strong> <span className="text-gray-900 text-[1.5rem]">{user.email}</span>
                </div>
                <div className="mb-4">
                    <strong className="text-green-600 text-[1.5rem]">Joined Date: </strong> <span className="text-gray-900 text-[1.5rem]">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mb-4">
                    <strong className="text-violet-600 text-[1.5rem]">Joined Time: </strong> <span className="text-gray-900 text-[1.5rem]">{new Date(user.createdAt).toLocaleTimeString()}</span>
                </div>
            </div>
            </div>
        ) : (
            <Login/>
        )}
        </>
    );
};

export default Userinfo;