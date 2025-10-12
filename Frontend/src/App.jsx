import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "./components/Home/Dashboard";
import {Toaster} from "react-hot-toast"



export default function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
           <Route index element={<Dashboard/>}></Route> {/*index is default page for home */}
          <Route path="assets" element={<h1>Assets</h1>}></Route>
          <Route path="assigned-assets" element={<h1>Assigned-assets</h1>}></Route>
          <Route path="employees" element={<h1>Employees</h1>}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>

      </Routes>
      <Toaster position="top-right" ></Toaster>
    </>
  );
}
