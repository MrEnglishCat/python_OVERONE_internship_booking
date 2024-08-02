import React, {Component, useState} from "react";
import {Route, useParams, Link, Routes} from "react-router-dom";
import DetailCard from "./DetailCard";

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

    return (
        <div key={props.item.id}>
            {/*<Link to={`/search/${props.item.id}/`} state={props}*/}
            {/*      className="link-offset-2 link-underline link-underline-opacity-0">*/}
            <div className="card shadow-lg rounded-lg rounded-5"
                 style={{maxWidth: 1100, height: "auto", margin: 'auto'}}>
                <div class="row">
                    <div className="col-md-3 col-12">
                        <div id={`selector-${props.item.id}`} className="carousel slide carousel-fade"
                             data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="image/user_objects/1/1.webp" className="d-block img-fluid rounded-5"
                                         alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src="image/user_objects/1/2.webp" className="d-block img-fluid rounded-5" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src="image/user_objects/1/3.webp" className="d-block img-fluid rounded-5" alt="..."/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button"
                                    data-bs-target={`#selector-${props.item.id}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button"
                                    data-bs-target={`#selector-${props.item.id}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>


                        {/*<img src="image/user_objects/1/1.webp" className="img-fluid rounded-5"*/}
                        {/*     alt="фото квартиры"*/}
                        {/*     width="100%" height="auto"/>*/}
                    </div>
                    <div className="col-md-9">
                        <Link to={`/search/${props.item.id}/`} state={props} className="link-dark link-offset-2 link-underline link-underline-opacity-0">
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
                                                            <br/><span
                                                            className="badge text-bg-success text-wrap">{Number(props.item.rating).toFixed(1)}</span> "88 отзывов"
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
            {/*</Link>*/}
            <Routes>
                <Route
                    path="/search/:id"
                    render={(props) => <DetailCard props/>}
                />
            </Routes>
        </div>

    )
}


export default BriefItemCard;