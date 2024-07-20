import React, { Component } from "react";
import Briefly from "../Briefly";
import DirectionRoute from "../DirectionRoute";
import Carousel from "../Carousel";
import Popular from "./Popular";

// import DirectionRoute from "DirectionRoute";
// import BriefcaseRoute from "Briefly";
// import Briefly from "Briefly";
// import ModalSignIn from "ModalSignIn";
// import Search from "./Search/Search";
// import NavigateHeader from ".NavigateHeader";


const HomePage = (props) => {
    return (
        <div>
            <Carousel/>
            <Briefly/>
            <DirectionRoute/><br/>
            <Popular/>
        </div>
    )
};

export default HomePage;