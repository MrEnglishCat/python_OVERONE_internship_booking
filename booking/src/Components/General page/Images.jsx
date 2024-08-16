import React, {Component, useState, useEffect, Link} from "react";
import axios from "axios";
import Image from "./Image";
import image from "./Image";

const Images = (props) => {

    console.log("IMAGES______FIRST", props.image_list, props.id)

    return (


        <div>
            {(props.image_list && props.image_list.length) ?

                <div id={`selector-${props.id}`} className="carousel slide "

                     data-bs-ride="carousel">
                    {/*{*/}
                    {/*    props.image_list.map((image) => {*/}
                    {/*        <img src={image.image_path}*/}
                    {/*             className="d-grid img-fluid rounded-5"*/}
                    {/*             alt={image.image_path} style={{display: "flex", objectFit: "cover",}}/>*/}
                    {/*    })*/}
                    {/*}*/}
                    <div className="carousel-inner ">
                        {/*<Image image={props.image_list}/>*/}
                        <Image image={props.image_list[0].image_path}/>
                        <Image image={props.image_list[1].image_path}/>
                        <Image image={props.image_list[2].image_path}/>
                    </div>
                    <button className="carousel-control-prev" type="button"
                            data-bs-target={`#selector-${props.id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button"
                            data-bs-target={`#selector-${props.id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


                : <Image image="/image/user_objects/nophoto_object.jpg"/>}
        </div>
    );

};


export default Images;