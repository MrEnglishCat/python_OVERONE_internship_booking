import React, {Component, useState, useEffect, Link} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Review from "./Review";
import BriefItemCard from "../BriefItemCard";

const Reviews = (props) => {
    // console.log(props.reviews);
    return (
        <div className="container">
            {props.reviews.length !== 0 ? props.reviews.map((item) =>
                <div className="container">
                    <Review
                        item={item}/><hr/>
                </div>) : ""}
        </div>
    );

};

export default Reviews;