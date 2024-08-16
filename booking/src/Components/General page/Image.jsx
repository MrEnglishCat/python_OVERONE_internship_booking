import React, {Component, useState, useEffect, Link} from "react";
import axios from "axios";


const Image = (props) => {
    // console.log("___________________", props.image)
    return (

        <div className="carousel-item active">
            <img src={props.image}
                 className="d-grid img-fluid rounded-5"
                 alt={props.image} style={{display: "flex", objectFit: "cover",}}/>
        </div>
    );

};


export default Image;