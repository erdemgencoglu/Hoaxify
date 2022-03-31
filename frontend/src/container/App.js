import React from "react";
import Login from '../Pages/Login';
import LanguageSelector from '../Components/LanguageSelector';
import SignUp from '../Pages/SignUp';
import ApiProgress from '../shared/ApiProgress'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from "../Pages/HomePage";
import UserPorfilePage from "../Pages/UserPorfilePage";
import PageNotFound from "../Pages/PageNotFound"
import Navbar from "../Components/Navbar";

function App() {
  return (
    /* BrowserRouter her sayfa değişiminde istek atıyor ve  Bunun yerine HashRouter Kullanırsak bu ortadan kalkıyor */
    <div>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/:username" element={<UserPorfilePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <LanguageSelector />
    </div>
  );
}

export default App;
