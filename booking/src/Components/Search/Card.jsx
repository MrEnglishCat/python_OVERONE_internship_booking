import React, {Component, useState, useEffect, Link} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Footer from "../General page/Footer";
import NavigateHeader from "../General page/NavigateHeader";
import Booking from "./Booking"

const Card = (props) => {

    // получаем параметры
    console.log('PROPS', props.item);


    const ConvertDatetime = (datetime) => {
        let objectDT = new Date(datetime);
        let day = objectDT.getDay();
        let month = objectDT.getMonth() + 1;
        let year = objectDT.getFullYear();
        let time = `${objectDT.getHours()}:${objectDT.getMinutes()}`;
        return `${day}-${month}-${year} ${time}`;
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-8 flex-container-scroll">
                    <div className="item-details-container row-fluid">
                        <h2 className="item-details-heading">{props.item.title}</h2>

                        <p><img src="/image/otherIcons/red_star_rating.png"
                                width="30"
                                height="20"/><span className="fw-bold">{Number(props.item.rating).toFixed(1)}</span>
                            &nbsp;( 88
                            отзывов_HC
                            ) {props.item.address ? `${props.item.city.name}, ${props.item.address.street_type} ${props.item.address.street_name} ${props.item.address.building_number} ${props.item.address.corps}` : ""}
                        </p>

                        <div className="item-details-image shadow">
                            <img src="/image/user_objects/2/1.webp" alt="" width="400" height="300"/>

                        </div>
                        <br/>
                        <div className="item-details shadow">
                            <div className="item-details-info">
                                {props.item.building_info && props.item.general_info ?
                                    <h4>{props.item.building_info.building_type_name} {props.item.general_info.room_square}м<sup>2</sup>
                                    </h4> : ""}
                                <div className="justify-center">{props.item.general_info ?
                                    <h6>Гостей: {props.item.general_info.guests_count} Комнат: {props.item.general_info.rooms_count} {props.item.general_info.kitchen} этаж {props.item.general_info.floor} из {props.item.general_info.floor_in_the_house}{props.item.address ? `${props.item.address.has_elevator ? ", есть лифт" : "."}` : "."}
                                    </h6> : ""}</div>
                                {/**/}

                                <p>{props.item.building_description}</p>
                                <p><span>Price:</span> {props.item.price}$</p>
                                <h6>Спальные
                                    места: {props.item.general_info ? props.item.general_info.count_sleeping_places : ""}</h6>
                            </div>

                        </div>
                        <br/>
                        <div className="item-details shadow">
                            <h4>Правила размещения</h4>
                            <div className="container">
                                <div className="row row-cols-3">
                                    <div className="col fw-bold">Заезд</div>
                                    <div className="col fw-bold">Отъезд</div>
                                    <div className="col fw-bold">Минимальный период проживания</div>
                                    <div className="col">после {props.item.arrival_time}</div>
                                    <div className="col">до {props.item.departure_time}</div>
                                    <div className="col">от {props.item.minimum_length_of_stay} суток</div>
                                </div>

                            </div>


                        </div>
                        {/*<Link to="/" className="go-back-button">Go Back</Link>*/}
                    </div>
                </div>
                <div className="col-4">
                    <Booking/>
                </div>
            </div>
        </div>

    )
};

export default Card;