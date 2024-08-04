import React from "react";
import Booking from "../Booking";
import OneReviewStar from "./OneReviewStar"


const TotalStars = (props) => {
    console.log(props.item);
    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="col-sm-6 ">
                    <OneReviewStar stars={props.item} title={"Чистота"}/>
                    <OneReviewStar stars={props.item} title={"Своевременность заселения"}/>
                    <OneReviewStar stars={props.item} title={"Расположение"}/>
                </div>
                <div className="col-sm-6 ">
                    <OneReviewStar stars={props.item} title={"Соответствие фото"}/>
                    <OneReviewStar stars={props.item} title={"Цена - качество"}/>
                    <OneReviewStar stars={props.item} title={"Качество обслуживания"}/>
                </div>
            </div>
            <br/>
        </div>
    );
};

export default TotalStars;



