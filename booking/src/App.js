import './App.css';
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavigateHeader from "./Components/General page/NavigateHeader";
import Footer from "./Components/General page/Footer";
import HomePage from "./Components/Main page/HomePage";
import Search from "./Components/Search/SearchObjects";
import Carousel from "./Components/Main page/Carousel";
import DetailCard from "./Components/Search/DetailCard";
import NotFound from "./Components/General page/NotFound";
import LoginPage from "./Components/Authorization/LoginPage";
import RegisterPage from "./Components/Authorization/RegisterPage";
import ForgotPage from "./Components/Authorization/ForgotPage";

function App() {



    return (
        <Router>
            <div className="wrapper">
                <NavigateHeader/>

                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/searchresult/:id" element={<DetailCard/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forgot" element={<ForgotPage/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );

}

export default App;
