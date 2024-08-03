import React from "react";
import {Link, useNavigate} from "react-router-dom";


function NotFound() {
    const navigate = useNavigate();
    return (
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center row">
                <div class=" col-md-6">
                    {/*<img src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg" alt=""*/}
                    {/*     className="img-fluid"/>*/}
                    <img src="/image/404.jpg" alt=""
                         className="img-fluid w-100"/>
                </div>
                <div class=" col-md-6 mt-5">
                    <p class="fs-3"><span class="text-danger">Opps!</span> Страница не найдена...</p>
                    <p class="lead">
                        Страница которую вы искали не существует!
                    </p>
                    <Link to={navigate(-1)} class="btn btn-primary">На предыдущую страницу..</Link>
                </div>
            </div>
        </div>
    );
};


export default NotFound;