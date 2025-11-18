import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "./components/Home/Dashboard";
import {Toaster} from "react-hot-toast"
import Admins from "./components/Home/Admins";
import Employees from "./components/Home/Employees";

import { Assets } from "./components/Home/Assets";
import AllAssetItems from "./components/Home/AllAssetItems";



export default function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
           <Route index element={<Dashboard/>}></Route> {/*index is default page for home */}
          <Route path="assets" element={<Assets/>}></Route>
          <Route path="asset-model/:id" element={<AllAssetItems/>}></Route>
          <Route path="assigned-assets" element={<h1>Assigned-assets</h1>}></Route>
          <Route path="myAssets" element={<h1>MyAssets</h1>}></Route>
          <Route path="requests" element={<h1>My Requests</h1>}></Route>
          <Route path="employees" element={<Employees/>}></Route>
          <Route path="admin" element={<Admins/>}></Route>
          <Route path="profile" element={<h1>Profile</h1>}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>

      </Routes>
      <Toaster position="top-right" ></Toaster>
    </>
  );
}
