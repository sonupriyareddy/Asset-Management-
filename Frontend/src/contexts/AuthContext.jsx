import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {toast} from "react-hot-toast"
//creating

const authContext = createContext();
//wrapper component for providing
export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //auth status api call
    setLoading(true);
    axios
      .get("http://localhost:8080/api/v1/auth/status", {
        withCredentials: true, //it will send cookie if it is tr in browser or it will receive cookie from backend and store in browser
      })
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  const login = async (credentials) => {
  try {
    //loading
    toast.loading("logging in..",{id:"login",duration:1000})
     await axios.post(
      "http://localhost:8080/api/v1/auth/login",
      credentials,
      { withCredentials: true }
    );
let response=await axios.get(
      "http://localhost:8080/api/v1/auth/status",
      
      { withCredentials: true }
    );
    console.log(response)
    setUser(response?.data)
    // setUser(res.data.user); // ✅ Save the logged-in user
    // return true; // ✅ indicate success

    toast.success("Welcome back "+ response?.data?.name,{id:"login",duration:1000})
  } catch (error) {
    toast.error(error?.response?.data?.message, {id:"login"})
    console.log("Login failed:", error.response?.data?.message || error.message);
    
    // return false; // ❌ indicate failure
  }
};
 const logout=async()=>{
  try {
    toast.loading("Logging Out............",{id:"logout"})
    axios.get("http://localhost:8080/api/v1/auth/logout",{withCredentials:true})
    setUser(null)//remove user details
    toast.success("Logged Out Sucessfully",{id:"logout"})
  } catch (error) {
    toast.error(error?.response?.data?.error||"Something went wrong",{id:"logout"})
    console.log(error)
  }
 }
  return (
    <>
      <authContext.Provider value={{ user, loading, login,logout }}>
        {props.children}
      </authContext.Provider>
    </>
  );
}

//reusable function

export function useAuth() {
  return useContext(authContext);
}
