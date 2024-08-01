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
            <div className="card  lg-4 shadow-lg rounded-lg"
                 style={{width: 1000, height: 275, margin: 'auto'}}>
                <div class="row g-5">
                    <div className="col-md-4">
                        <img src="image/user_objects/1/1.webp" className="img-fluid rounded-start" alt="..."
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className=" card-text text-lg-start">
                                <div className="container">
                                    <div className="row-2">
                                        <div className="col">
                                            <h6>{props.item.general_info ? `${props.item.general_info.rooms_count}-комнатная квартира` : ""}</h6>
                                            <h5>{props.item.title}</h5>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <h5>{props.item.general_info ?
                                                <span>{props.item.general_info.room_square}м<sup>2</sup></span> : ""}</h5>
                                        </div>
                                        <div className="col">
                                            <h5>{props.item.general_info ? `гостей: ${props.item.general_info.guests_count}` : ""}</h5>
                                        </div>
                                        <div className="col-4">
                                            <h5>{props.item.general_info ? `спальных мест: ${props.item.general_info.count_sleeping_places}` : ""}</h5>
                                        </div>
                                        <div className="col">
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor"
                                                     className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                    <path
                                                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                                    <path
                                                        d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                </svg>
                                                {props.item.address ? `${props.item.city.name}, ${props.item.address.street_type} ${props.item.address.street_name} ${props.item.address.building_number} ${props.item.address.corps ? props.item.address.corps : ""}` : ""}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Link to={`/search/${props.item.id}/`} state={props}>
                    <div className="text-center card-footer иет">Подробнее...
                    </div>
                </Link>
                <Routes>
                    <Route
                        path="/search/:id"
                        render={(props) => <DetailCard props/>}
                    />
                </Routes>
            </div>

        </div>

    )
}


export default BriefItemCard;