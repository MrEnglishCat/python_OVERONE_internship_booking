import React, {useEffect, useState} from "react"
import axios from "axios"
import BriefItemCard from "./BriefItemCard";
import NavigateHeader from "../General page/NavigateHeader";
import Footer from "../General page/Footer";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

const Search = () => {
    const API_URL_SEARCH = "http://127.0.0.1:8000/api/v1/search/?search="
    var responseData = []
    const [isStartSearch, setStartSearch] = useState(false)
    const [searchData, setSearchData] = useState([]);
    const [inputData, setInputData] = useState("");
    const [token, setToken] = useState();


    // за счет params.id можно по get запросу получить данные.
    async function handleSearch() {
        // GET request using axios with set headers
        let tk = sessionStorage.auth_token;
        console.log("SEARCH tk: ", tk);
        setToken(token)
        console.log('SEARCH Token: ', token);
        var data_input_location = document.getElementById("input_search_location");
        var data_input_datetime_check_in = document.getElementById("input_search_datetime_check-in");
        var data_input_datetime_departure = document.getElementById("input_search_datetime_departure");

        setInputData(data_input_location.value);
        const headers = {
            'Accept': '*/*',
        };
        responseData = await axios.get(API_URL_SEARCH + data_input_location.value + "&arrive=" + data_input_datetime_check_in.value + "&departure=" + data_input_datetime_departure.value, {headers});
        // ниже В responseData появился атрибут results т к в DRF добавил пагинацию
        setSearchData(await responseData.data.results);
        setStartSearch(true)

    }

    return (
        <div className="container ">
            <NavigateHeader token={token}/>
            <div className="container  flex-auto ">
                <div className="card bg-light text-white   rounded-5">
                    <img src="/image/background/search_background.jpg" className="card-img img-fluid   rounded-5"
                         alt="..." style={{maxWidth: 1250}}/>
                    <div className="card-img-overlay">
                        <div id="Search_bar" className="flex-auto"><br/>
                            <p className="display-2 fs-0 fw-bold text-center">Найдём, где остановиться!</p>
                            <br/>
                            <br/>
                            <p className="lead text-center fs-3">Квартиры, отели, гостевые дома — 280 тысяч вариантов
                                для
                                поездок по
                                России и
                                зарубежью</p><br/>
                            <div className="input-group mb-5 flex-auto" style={{width: 950, margin: 'auto'}}>

                                <input type="text" className="form-control form-control-lg input-font-size-lg"
                                       placeholder="Курорт, город или адрес"
                                       aria-label="Курорт, город или адрес" aria-describedby="button-addon2"
                                       id="input_search_location"/>
                                <input type="date" className="form-control form-control-lg input-font-size-lg"
                                       aria-label="Дата заселения" aria-describedby="button-addon2"
                                       id="input_search_datetime_check-in"/>
                                <input type="date" className="form-control form-control-lg input-font-size-lg"
                                       aria-label="Дата отъезда" aria-describedby="button-addon2"
                                       id="input_search_datetime_departure"
                                />
                                <button className="btn btn-danger" type="button" id="button-addon2"
                                        onClick={handleSearch}>Найти...
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
            <div className=" text-center">
                <span className="h4">
                    {searchData.length !== 0 && searchData.length !== null ? (`Найдено совпадений: ${searchData.length}`) : ""}<br/>
                    {searchData.length !== 0 && searchData.length !== null ? (`По запросу: "${inputData}"`) : ""}<br/>

                    {searchData.length !== 0 && searchData.length !== null ? searchData.map((item) =>
                        <p><BriefItemCard
                            item={item}/>
                        </p>) : isStartSearch ? `По указанным параметрам поиска: "${inputData}" - данных не найдено!` : ""}
                </span>
            </div>

            <Footer/>
        </div>
    )
};


export default Search;