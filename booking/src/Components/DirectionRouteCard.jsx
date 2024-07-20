import React, {useState} from "react"


const DirectionRouteCard = ({image_path, alt_name, title, footer}) => {
    return (
        <div className="col">

            <div className="routeDirectionCard">
                <div className="card bg-dark text-white">
                    <img src={image_path} className="card-img " alt={alt_name} width="100" height="300"/>

                    <div className="card-img-overlay">
                        <h4 className="card-title">{title}</h4>
                        <p className="card-text">{footer}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DirectionRouteCard;