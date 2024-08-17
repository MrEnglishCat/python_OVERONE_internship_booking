import React, {Component, useState, useEffect, Link} from "react";
import axios from "axios";


const Image = (props) => {
    // console.log("___________________", props.image)
    return (


            <img src={props.image}
                 className="d-block rounded-end"
                 alt="..."
                 height="200" style={{display: "flex", objectFit: "cover"}}/>

    );

};


export default Image;