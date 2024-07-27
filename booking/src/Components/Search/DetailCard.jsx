import React, {Component, useState, useEffect, Link} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Footer from "../General page/Footer";
import NavigateHeader from "../General page/NavigateHeader";


const DetailCard = (props) => {

    // получаем параметры
    const {id} = useParams();
    const [ObjectRoom, setObjectRoom] = useState([]);
    const API_URL_ID = "http://127.0.0.1:8000/api/v1/search/"

    const ConvertDatetime = (datetime) => {
        let objectDT = new Date(datetime);
        let day = objectDT.getDay();
        let month = objectDT.getMonth() + 1;
        let year = objectDT.getFullYear();
        let time = `${objectDT.getHours()}:${objectDT.getMinutes()}`;
        return `${day}-${month}-${year} ${time}`;
    }

    useEffect(
        () => {
            const headers = {
                'Accept': '*/*',
            };
            const fetchRoomObjectData = async () => {
                const response = await axios.get(API_URL_ID + id + '/', {headers: headers});
                setObjectRoom(response.data);
            };

            fetchRoomObjectData();
        }, [id]);

    // console.log('searchItem: ', searchItem)
    // const headers = {
    //         'Accept': '*/*',
    //     };
    // var item;
    // async function getItem() {
    //     var responseData = await axios.get(MAIN_API_URL + params.id + '/', {headers});
    //     setSearch(responseData.data);
    //
    // }

    console.log('searchItem', ObjectRoom);
    return (
        <div>
            <NavigateHeader/>
            <div className="item-details-container row-fluid">
                <h3 className="item-details-heading">{ObjectRoom.title}</h3>
                <img src="/image/otherIcons/red_star_rating.png"
                     width="30"
                     height="20"/>{Number(ObjectRoom.rating).toFixed(1)}
                &nbsp;88 отзывов_HC Тут_будет_адрес
                <div className="item-details-image shadow">
                    <img src="/image/user_objects/2/1.webp" alt="" width="400" height="300"/>
                    {/*{ObjectRoom.photos && <img src={ObjectRoom.photos.startsWith('http') ? ObjectRoom.photos : "./img/" + ObjectRoom.photos}*/}
                    {/*                      alt="ObjectRoom"/>}*/}
                    {/*<img src={ObjectRoom.image} width={"100"} height={"100"} alt=""/>*/}
                </div><br/>
                <div className="item-details shadow">
                    <div className="item-details-info">

                        {/*<p><h4>{ObjectRoom.general_info.count_rooms} комнат(-ты;*/}
                        {/*    -та) {ObjectRoom.general_info.room_square} м<sup>2</sup></h4></p>*/}
                        {/*<p>{ObjectRoom.general_info.kitchen} этаж {ObjectRoom.general_info.floor} из {ObjectRoom.general_info.floor_in_the_house}</p>*/}
                        {/*<p><span>Address:</span> {ObjectRoom.address}</p>*/}
                        {/*<p><span>Photo:</span> {ObjectRoom.photos}</p>*/}
                        <p><span>Description:</span> {ObjectRoom.building_description}</p>
                        {/*<p><span>Availability:</span> {ObjectRoom.availability}</p>*/}
                        <p><span>Price:</span> {ObjectRoom.price}$</p>
                        {/*<p>Обновлено: {new Date(ObjectRoom.update_datetime)}</p>*/}
                        <p>Обновлено: {ConvertDatetime(ObjectRoom.update_datetime)}</p>

                        {/*<p><span>Opinion:</span> {ObjectRoom.opinion}</p>*/}
                        {/*<p><span>Notes:</span> {ObjectRoom.notes}</p>*/}
                    </div>

                </div>
                {/*<Link to="/" className="go-back-button">Go Back</Link>*/}

            </div>
            <Footer/>
        </div>

    )
};

export default DetailCard;