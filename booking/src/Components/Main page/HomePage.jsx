import React, { Component } from "react";
import Briefly from "./Briefly";
import DirectionRoute from "./DirectionRoute";
import Carousel from "./Carousel";
import Popular from "./Popular";


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