import React, {Component, useState, useEffect, Link} from "react";
import axios from "axios";
import Image from "./Image";
import image from "./Image";

const Images = (props) => {

    console.log("IMAGES______FIRST", props.image_list, props.id)

    return (


        <div>
            {(props.image_list && props.image_list.length) ?

                <div id={`selector-${props.id}`} className=" shadow-lg   rounded-5 carousel slide"
                     data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target={`#selector-${props.id}`}
                                data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target={`#selector-${props.id}`}
                                data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target={`#selector-${props.id}`}
                                data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner   rounded-5">
                        {
                            props.image_list.map((image) => {
                                    <div className="carousel-item active">
                                        <Image image={image}/>
                                    </div>
                                }
                            )
                        }
                        <Image image={props.image_list[0].image_path}/>
                        {/*<div className={"carousel-item"}>*/}
                        {/*    <img src="/image/user_objects/1/6.webp"*/}
                        {/*         className="d-block   rounded-5"*/}
                        {/*         alt="..."*/}
                        {/*         height="200" style={{display: "flex", objectFit: "cover"}}/>*/}
                        {/*</div>*/}
                        {/*<div className="carousel-item">*/}
                        {/*    <img src="/image/user_objects/1/5.webp" className="d-block w-100  rounded-5"*/}
                        {/*         alt="..."*/}
                        {/*         height="200" style={{display: "flex", objectFit: "cover"}}/>*/}
                        {/*</div>*/}
                        {/*<div className="carousel-item">*/}
                        {/*    <img src="/image/user_objects/1/4.webp"*/}
                        {/*         className="d-block w-100   rounded-5"*/}
                        {/*         alt="..."*/}
                        {/*         height="200" style={{display: "flex", objectFit: "cover"}}/>*/}
                        {/*</div>*/}
                    </div>
                    <button className="carousel-control-prev" type="button"
                            data-bs-target={`#selector-${props.id}`}
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button"
                            data-bs-target={`#selector-${props.id}`}
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


                : <Image image="/image/user_objects/nophoto_object.jpg"/>}
        </div>
    );

};


export default Images;