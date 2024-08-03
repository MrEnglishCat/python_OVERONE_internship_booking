import React, {Component, useState, useEffect, Link} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Review from "./Review";

const Reviews = (props) => {
    console.log(props.reviews);
    return (
        <div className="container">
            <Review/>
        </div>
    );

};

export default Reviews;