import React, {useEffect, useState} from "react";
import Booking from "../Booking";
import OneReviewStar from "./OneReviewStar"
import axios from "axios";


const TotalStars = (props) => {

        // const API_ALL_STARTS_RATING = "http://127.0.0.1:8000/api/v1/get_object_rating/"
        // const [stars, setStars] = useState({})
        // const HEADERS = {
        //     'Accept': '*/*',
        //     // "Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`
        // };
        //
        //
        // useEffect(
        //     () => {
        //         async function getStars() {
        //             const response = await axios.get(API_ALL_STARTS_RATING + props.object_id + '/', {headers: HEADERS})
        //                 .then((response) => {
        //                     setStars(response.data);
        //                 }).catch((error) => {
        //                     console.log(error);
        //                 });
        //         };
        //         getStars();
        //     }, []
        // );

        return (
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-sm-6 ">
                        <OneReviewStar stars={props.star.cleanliness__avg} title={"Чистота"}/>
                        <OneReviewStar stars={props.star.timeliness_of_check_in__avg} title={"Своевременность заселения"}/>
                        <OneReviewStar stars={props.star.location__avg} title={"Расположение"}/>
                    </div>
                    <div className="col-sm-6 ">
                        <OneReviewStar stars={props.star.conformity_to_photos__avg} title={"Соответствие фото"}/>
                        <OneReviewStar stars={props.star.price_quality__avg} title={"Цена - качество"}/>
                        <OneReviewStar stars={props.star.quality_of_service__avg} title={"Качество обслуживания"}/>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
;

export default TotalStars;



