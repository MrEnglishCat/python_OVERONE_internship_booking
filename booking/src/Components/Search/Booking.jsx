import React, {Component, useState, useEffect, Link} from "react";
import DatePicker from "react-datepicker";
import CustomDatepicker from "./CustomDatepicker";
import axios from "axios";

const Booking = (props) => {

    const [startD, setStartD] = useState();
    const [endD, setEndD] = useState();
    const [exchangeUSD, setExchangeUSD] = useState(0);
    // const API_NBRB_ALL_CURRENCY = "https://api.nbrb.by/exrates/rates?periodicity=0"
    const API_NBRB_USD_CURRENCY = "https://api.nbrb.by/exrates/rates/431"
    const HEADERS = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7\n',
    };
    const startDate = document.getElementById('startDate')
    const endDate = document.getElementById('endDate')

    if (startDate && endDate) {
        startDate.addEventListener('change', function (event) {
            console.log('Произошло событие', event.type)
            var today = new Date().toISOString().split('T')[0];
            startDate.setAttribute('value', today)
            setStartD(startDate.value)
        })
        endDate.addEventListener('change', function (event) {
                console.log('Произошло событие', event.type)
                setEndD(endDate.value)
            }
        );


    }

    useEffect(() => {
            const ExchangeUsd = async () => {
                let response = await fetch(API_NBRB_USD_CURRENCY, {method: "GET", headers: HEADERS});
                if (response.ok) { // если HTTP-статус в диапазоне 200-299
                    // получаем тело ответа (см. про этот метод ниже)
                    let json = await response.json();

                    setExchangeUSD(json.Cur_OfficialRate);
                } else {
                    console.log("Ошибка HTTP: " + response.status);
                }
            };

            let result = ExchangeUsd()
        },
        []
    )

    const getDate = () => {

        let objectDT = new Date();
        let day = objectDT.getDate();
        let month = objectDT.getMonth() + 1;
        let year = objectDT.getFullYear();
        // return`${month}/${day}/${year}`;
        return `${year}-${month}-${day}`;

    };


    return (
        <div className="position-fixed">
            <div className="container-fluid">
                <div class="container">
                    <div className="row">
                        <div className="col">
                            <a href="#" className="btn btn-outline-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-suit-heart" viewBox="0 0 16 16">
                                    <path
                                        d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                                </svg>
                                &nbsp;В избранное
                            </a>
                        </div>
                        <div className="col">
                            <a href="#" className="btn btn-outline-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-share" viewBox="0 0 16 16">
                                    <path
                                        d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                                </svg>
                                &nbsp;Поделиться
                            </a>
                        </div>
                    </div>
                </div>
                <br/>
                <form>
                    <div className="container shadow-lg">
                        <br/>
                        {/*<DatePicker/>*/}

                        <div className="row">
                            <div className="col">
                                {/*<CustomDatepicker/>*/}
                                <input id="startDate" className="pa__middle-input text form-control" type="date"
                                       placeholder="Заезд"/>
                            </div>
                            <div className="col">
                                {/*<CustomDatepicker/>*/}
                                <input id="endDate" className="form-control" type="date" placeholder="Отъезд"/>
                            </div>
                        </div>
                        <p>Предоплата: {props.prepayment} BYN</p>
                        <p><span>Оплата за сутки:</span> {props.payment_day} BYN</p>

                        <p>Оплата при заселении: {props.payment_day - props.prepayment} BYN</p>
                        <p>Курс НБ РБ на {getDate()}: 1 USD - {exchangeUSD} BYN</p>
                        <br/>
                        {/*<div className="position-fixed">...</div>*/}
                        <div className="row ">
                            <button type="submit" className="btn btn-success ">Хочу забронировать</button>
                        </div>
                        <br/>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default Booking;