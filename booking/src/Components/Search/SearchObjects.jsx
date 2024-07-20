import React, {useEffect, useState} from "react"
import axios from "axios"
import BriefItemCard from "./BriefItemCard";

const Search = () => {
    const API_URL_SEARCH = "http://127.0.0.1:8000/api/v1/search/?search="
    var responseData = []
    const [isStartSearch, setStartSearch] = useState(false)
    const [searchData, setSearch] = useState([]);
    const [inputData, setInputData] = useState("");

    // за счет params.id можно по get запросу получить данные.
    async function RunSearch() {
        // GET request using axios with set headers

        var data_input_location = document.getElementById("input_search_location");
        var data_input_datetime_check_in = document.getElementById("input_search_datetime_check-in");
        var data_input_datetime_departure = document.getElementById("input_search_datetime_departure");

        setInputData(data_input_location.value);
        console.log(inputData)
        const headers = {
            'Accept': '*/*',
        };
        responseData = await axios.get(API_URL_SEARCH + data_input_location.value, {headers});
        setSearch(responseData.data);

        // console.log(data_input_datetime_check_in.value);
        // console.log(data_input_datetime_departure.value);
        // console.log(data_input_datetime_departure.value > data_input_datetime_check_in.value);
        setStartSearch(true)
    }


    return (
        <div id="Search_bar"><br/>
            <h1 className="display-1 text-center"><b>Найдём, где остановиться!</b></h1>
            <p className="lead text-center">Квартиры, отели, гостевые дома — 280 тысяч вариантов для поездок по России и
                зарубежью</p><br/>
            <div className="input-group mb-5" style={{width: 750, margin: 'auto'}}>
                <input type="text" className="form-control form-control-lg input-font-size-lg"
                       placeholder="Курорт, город или адрес"
                       aria-label="Курорт, город или адрес" aria-describedby="button-addon2"
                       id="input_search_location"/>
                <input type="date" className="form-control form-control-lg input-font-size-lg"
                       aria-label="Дата заселения" aria-describedby="button-addon2"
                       id="input_search_datetime_check-in"/>
                <input type="date" className="form-control form-control-lg input-font-size-lg"
                       aria-label="Дата отъезда" aria-describedby="button-addon2" id="input_search_datetime_departure"
                       placeholder={"HERE"}/>
                <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                        onClick={RunSearch}>Найти...
                </button>
            </div>
            <div className=" text-center">

                <span className="h4">
                    {searchData.length !== 0 ? (`Найдено совпадений: ${searchData.length}`) : ""}<br/>
                    {searchData.length !== 0 ? (`По запросу: "${inputData}"`) : ""}<br/>

                    {searchData.length !== 0 ? searchData.map((item) => <BriefItemCard
                        item={item}/>) : isStartSearch ? `По указанным параметрам поиска: "${inputData}" - данных не найдено!` : ""}
                </span>
            </div>
        </div>
    )
};


export default Search;