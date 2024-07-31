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
            <div className="card mb-3 shadow" style={{width: 540, margin: 'auto'}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="image/user_objects/1/1.webp" className="img-fluid rounded-start" alt="..." width={"100%"} height={"100%"} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <table>
                                <tr>
                                    <td>
                                        <h5>{props.item.title}</h5>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="card-text">Тип
                                            объекта: {props.item.building_info.building_type_group}</p>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="card-text">{props.item.building_info.building_type_name}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <p className="card-text">
                                            <img src="/image/otherIcons/red_star_rating.png"
                                                                      width="30"
                                                                      height="20"/>{Number(props.item.rating).toFixed(1)}
                                        </p>
                                    </td>

                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                    <p className="card-text"><small className="text-muted">Обновлено:<br/>
                                        {ConvertDatetime(props.item.update_datetime)}</small></p>

                                    </td>
                                </tr>
                            </table>


                            {/*<p className="card-text">{props.item.building_description}</p>*/}

                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <Link to={`/search/${props.item.id}/`} state={props}>Подробнее...</Link>
                    <Routes>
                        <Route
                            path="/search/:id"
                            render={(props) => <DetailCard props/>}
                        />
                    </Routes>
                </div>
            </div>


        </div>

    )
}


export default BriefItemCard;