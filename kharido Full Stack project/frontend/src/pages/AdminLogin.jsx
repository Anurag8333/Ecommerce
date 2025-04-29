import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminLogin = ({setAdminLogin}) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
     await fetch("http://localhost:8080/api/users/adminlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      if(data.message === 'Admin LoggedIn Successfully.'){
        localStorage.setItem("admin",JSON.stringify(data));
        navigate('/admin');
        setAdminLogin(true);
      }
      alert(data.message);
    }).catch((err)=>{
      console.log(err);
      setAdminLogin(false);
    });
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
