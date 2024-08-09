import React, {useEffect, useState} from "react";






const OneReviewStar = (props) => {

    const API_ALL_OBJECTRAITING = ""
    const [result_stars, setResultStars] = useState(0)
    useEffect(() => {
        setResultStars((props.stars * 10).toFixed(1))

    }, [props.stars]);


    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-sm-6 ms-md-auto">
                <p className=""> {props.title} </p>
                </div>
                <div className="col-sm-4 ms-md-auto">
                    <div className="progress" id="prog1" style={{height: 4}}>
                        <div className="progress-bar bg-danger" role="progressbar" aria-valuenow={{result_stars}}
                             aria-valuemin="0" aria-valuemax="100" style={{width: `${result_stars}%`}}>
                        </div>
                    </div>
                </div>
                <div className="col-sm-auto ">
                    {props.stars ? props.stars.toFixed(1) : ""}
                </div>
            </div>

        </div>
    );
};


export default OneReviewStar;