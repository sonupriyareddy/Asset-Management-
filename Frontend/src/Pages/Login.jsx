import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


function Login() {
  const { user, login } = useAuth();
  const [loginData,setLoginData]=useState({email:"",password:""})
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
     setTimeout(()=>{
       navigate("/");
     },500)
    }
  }, [user]);
  function handleChange(e){

setLoginData({...loginData,[e.target.name]:e.target.value})
  }
 async function handleSubmit(e) {
  e.preventDefault();

  if (loginData.email && loginData.password) {
    const success = await login(loginData);
    // navigate("/")
    // if (success) {
    //   navigate("/");
    // } else {
    //   alert("Invalid email or password");
    // }
  }
}
  return (
    <>
      <h1 className=" text-green-400 text-5xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit} className="w-[500px] bg-gray-300 rounded-2xl flex justify-center flex-col items-center m-auto mt-20 py-10 gap-12">
        <div className="flex gap-20 w-4/5 justify-start">
            <div>
                <label htmlFor="email" className="text-xl font-bold">Email</label>
            </div>
            <div>
            <input type="email" id="email" name="email" placeholder="Write your email...." required
            className="outline-1 rounded-md text-xl-w-[300px]" value={loginData.email} onChange={handleChange}/>
            </div>
        </div>
        <div className="flex gap-10 w-4/5 justify-start">
            <div>
                <label htmlFor="password"className="text-xl font-bold">Password</label>
            </div>
            <div>
            <input type="password" name="password" id="password" placeholder="Write your password...." required  className="outline-1 rounded-md text-xl-w-[300px] " value={loginData.password} onChange={handleChange}/>
            </div>
        </div>
        <div>
            <button type="submit" className="py-2 px-20 bg-emerald-600 text-white text-2xl rounded-2xl">Submit</button>
        </div>
      </form>
    </>
  );
}
export default Login;
