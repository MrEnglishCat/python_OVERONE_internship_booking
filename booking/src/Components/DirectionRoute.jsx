import React, {useState} from "react"
import DirectionRouteCard from "./DirectionRouteCard";

const DirectionRoute = () => {
    return (
        <div className="container routeDirection shadow">
            <p class="h1 text-center">Идеи для отпуска</p>

            <div class="justify-content-center">
                <div class="row">
                    <DirectionRouteCard image_path="image/DirectionRoute/sea.jpg" alt_name="Море" title="На выходные"
                                        footer="Недорогие курорты для отдыха на море"/>
                    <DirectionRouteCard image_path="image/DirectionRoute/City_2.jpg" alt_name="Минск" title="Маршруты"
                                        footer="Красивые города Беларуси"/>
                    <DirectionRouteCard image_path="image/DirectionRoute/Georgia.jpg" alt_name="Грузия"
                                        title="Что посмотреть" footer="В Грузию на машине"/>
                </div>
            </div>
            <br/>
        </div>
    )
};

export default DirectionRoute;