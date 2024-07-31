import React, {Component, useState, useEffect, Link} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Footer from "../General page/Footer";
import NavigateHeader from "../General page/NavigateHeader";
import Card from "./Card";

const DetailCard = (props) => {

    console.log('DetailCard',props)
    // получаем параметры
    const {id} = useParams();
    const [ObjectRoom, setObjectRoom] = useState({});
    const API_URL_ID = "http://127.0.0.1:8000/api/v1/search/"
    const HEADERS = {
        'Accept': '*/*',
        // "Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`
    };
    useEffect(
        () => {
            async function getData () {
                const response = await axios.get(API_URL_ID + id + '/', {headers: HEADERS})
                    .then((response) => {
                        setObjectRoom(response.data);
                    }).catch((error) => {
                        console.log(error);
                    })

            };

            getData();
        },[]);
    // console.log(ObjectRoom)
    return (
        <div>
            <NavigateHeader/>

            <Card item={ObjectRoom}/>
            <Footer/>
        </div>

    )
};

export default DetailCard;