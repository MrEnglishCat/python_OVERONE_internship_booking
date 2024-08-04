import React from "react";






const OneReviewStar = (props) => {

    const API_ALL_OBJECTRAITING = ""

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-sm-6 ms-md-auto">
                <p className=""> {props.title} </p>
                </div>
                <div className="col-sm-4 ms-md-auto">
                    <div className="progress" id="prog1" style={{height: 4}}>
                        <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="50"
                             aria-valuemin="0" aria-valuemax="100" style={{width:"50%"}}>
                        </div>
                    </div>
                </div>
                <div className="col-sm-auto ">
                    9.8
                </div>
            </div>

        </div>
    );
};


export default OneReviewStar;