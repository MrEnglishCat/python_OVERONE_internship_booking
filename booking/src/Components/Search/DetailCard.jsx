import React, {Component, useState, useEffect, Link} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Footer from "../General page/Footer";
import NavigateHeader from "../General page/NavigateHeader";
import Card from "./Card";
import NotFound from "../General page/NotFound";

const DetailCard = (props) => {

    // получаем параметры
    // const navigate = useNavigate();
    const {id} = useParams();
    const [ObjectRoom, setObjectRoom] = useState({});
    const [reviews, setReviews] = useState({});
    const API_URL_ID = "http://127.0.0.1:8000/api/v1/search/"
    const API_REVIEWS = "http://127.0.0.1:8000/api/v1/object_reviews/"
    const HEADERS = {
        'Accept': '*/*',
        // "Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`
    };
    console.log('DETAIL CARD ___ ', props.images)

    useEffect(
        () => {
            async function getData () {
                const response = await axios.get(API_URL_ID + id + '/', {headers: HEADERS})
                    .then((response) => {
                        setObjectRoom(response.data);
                    }).catch((error) => {
                        console.log(error);
                    })

                const response_reviews = await axios.get(API_REVIEWS + id + '/', {headers: HEADERS})
                    .then((response) => {
                        setReviews(response.data)
                    }).catch((error) => {
                        console.log(error);
                    })
            };
            getData()
        },[]);


    return (
        <div>
            <NavigateHeader/>
             <Card item={ObjectRoom} reviews={reviews} image={props.images}/>
            <Footer/>
        </div>

    )
};

export default DetailCard;