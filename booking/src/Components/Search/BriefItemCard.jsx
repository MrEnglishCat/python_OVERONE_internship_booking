import React, {Component, useEffect, useState} from "react";
import {Route, useParams, Link, Routes} from "react-router-dom";
import DetailCard from "./DetailCard";
import axios from "axios";
import Image from "../General page/Image";
import ImagesC from "../Main page/ImageCarousel";

const BriefItemCard = (props) => {
    const [objectRooms, setObjectRooms] = useState([]);
    const ConvertDatetime = (datetime) => {
        let objectDT = new Date(datetime);
        let day = objectDT.getDay();
        let month = objectDT.getMonth() + 1;
        let year = objectDT.getFullYear();
        let time = `${objectDT.getHours()}:${objectDT.getMinutes()}`;
        return `${day}-${month}-${year} ${time}`;
    }

    const API_ALL_STARTS_RATING = "http://127.0.0.1:8000/api/v1/get_object_rating/"
    const API_REVIEWS_COUNT = "http://127.0.0.1:8000/api/v1/get_count_of_views/"
    const API_GET_IMAGES = "http://127.0.0.1:8000/api/v1/get_object_images/"

    const [stars, setStars] = useState({})
    const [countReviews, setCountReviews] = useState({});
    const [images, setImages] = useState([]);
    const HEADERS = {
        'Accept': '*/*',
        // "Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`
    };


    useEffect(
        () => {
            async function getStars() {
                const response = await axios.get(API_ALL_STARTS_RATING + props.item.id + '/', {headers: HEADERS})
                    .then((response) => {
                        setStars(response.data);
                    }).catch((error) => {
                        console.log(error);
                    });
            };

            async function getLenghtReviews() {
                const response = await axios.get(API_REVIEWS_COUNT + props.item.id + '/', {headers: HEADERS})
                    .then((response) => {
                        setCountReviews(response.data);
                    }).catch((error) => {
                        console.log(error);
                    });
            };

            async function getImages() {
                await axios.get(API_GET_IMAGES + `${props.item.id}`).then((response) => {
                    console.log("response.data.images", response.data.images);
                    setImages(response.data.images);
                }).catch((error) => {
                    console.log(error);
                });
            };

            getImages();
            getLenghtReviews();
            getStars();
        }, [props.item.id]
    );


    console.log('aaaa', props.item, images)

    return (
        <div key={props.item.id}>
            {/*<Link to={`/search/${props.item.id}/`} state={props}*/}
            {/*      className="link-offset-2 link-underline link-underline-opacity-0">*/}
            <div className="container ">
                <div className="card shadow-lg rounded-lg rounded-end-5"
                     style={{maxWidth: 1100, height: "auto", margin: 'auto'}}>
                    <div className="row">
                        <div className="col-lg-3 col-12">
                            {/*<Images image_list={images} id={props.item.id} />*/}
                            {
                                images.length ? <ImagesC image_list={images}/> : <Image image="/image/user_objects/nophoto_object.jpg"/>

                            }


                        </div>
                        <div className="col-md-9">
                            <Link to={`/search/${props.item.id}/`} state={props}
                                  className="link-dark link-offset-2 link-underline link-underline-opacity-0">
                                <div className="card-body">
                                    <div className=" card-text">
                                        <div class="container-fluid">
                                            <div className="row ">
                                                <div className="col-lg-9 text-start border-right">
                                                    <div className="row-2">
                                                        <div className="col">
                                                            <p className="fs-6">{props.item.general_info ? `${props.item.general_info.rooms_count}-комнатная квартира` : ""}</p>
                                                            <h5>{props.item.title}</h5>
                                                        </div>
                                                    </div>

                                                    <div className="row ">
                                                        <div className="col-7 text-black-50">
                                                        <span className="fs-6 mx-0">{props.item.general_info ?
                                                            <span>{props.item.general_info.room_square}м<sup>2</sup> </span> : ""}
                                                        </span>
                                                            <span
                                                                className="fs-6 mx-2">{props.item.general_info ? `гостей: ${props.item.general_info.guests_count} ` : ""}</span>

                                                            <span
                                                                className="fs-6 mx-2">{props.item.general_info ? `спальных мест: ${props.item.general_info.count_sleeping_places} ` : ""}</span>
                                                        </div>
                                                        {/*<div className="col">*/}
                                                        {/*    <p className="fs-6">{props.item.general_info ? `гостей: ${props.item.general_info.guests_count}` : ""}</p>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="col-4">*/}
                                                        {/*    <p className="fs-6">{props.item.general_info ? `спальных мест: ${props.item.general_info.count_sleeping_places}` : ""}</p>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="col">*/}
                                                        {/*</div>*/}

                                                    </div>
                                                    <div className="row-sm-4 ">
                                                        <div className="col">
                                                        <span className="fs-6">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                 height="16"
                                                                 fill="currentColor"
                                                                 className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                                                <path
                                                                    d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                            </svg>
                                                            {props.item.address ? `${props.item.city.name}, ${props.item.address.street_type} ${props.item.address.street_name} ${props.item.address.building_number} ${props.item.address.corps ? `к${props.item.address.corps}` : ""}` : ""}
                                                            <br/>
                                                            <span className="badge text-bg-success text-wrap">
                                                            {
                                                                stars ?
                                                                    (
                                                                        (
                                                                            stars.cleanliness__avg +
                                                                            stars.conformity_to_photos__avg +
                                                                            stars.price_quality__avg +
                                                                            stars.location__avg +
                                                                            stars.quality_of_service__avg +
                                                                            stars.timeliness_of_check_in__avg
                                                                        ) / 6
                                                                    ).toFixed(1)
                                                                    : "No stars"
                                                            }
                                                            </span>

                                                            &nbsp;<span className="text-secondary">
                                                                    {countReviews.reviews_count} отзыва
                                                                 </span>
                                                            </span>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-lg-3 text-end">

                                                    <p className="fs-6">{props.item.payment_day} BYN в сутки</p>
                                                    <p></p>
                                                    <p></p>
                                                    <p className="fs-6 ">Для будущих доп сведений связанных
                                                        с оплатой</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/*</Link>*/}
            <Routes>
                <Route
                    path="/search/:id"
                    render={(props, images) => <DetailCard images={images}/>}
                />
            </Routes>
        </div>

    )
}


export default BriefItemCard;