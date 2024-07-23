import ModalSignIn from '../ModalSignIn'

import React, {Component} from "react";
import Popular from "../Main page/Popular";


const NavigateHeader = () => {
    return (
        <div className="container justify-content-sm-center">
            <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid ">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                            aria-expanded="false" aria-label="Переключатель навигации">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="/"><img alt="logo" src="../../image/logo/kvartirnik_logo.png"
                                                                  width="150" height="70"/></a>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Главная</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Зарабатывайте на сдаче жилья</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/search">Бронирование</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Избранное</a>
                            </li>
                            <li className="nav-item">
                                <div id="myModal">
                                    <a className="nav-link" href="/login">Войти</a>
                                </div>
                                <div className="modal-dialog modal-dialog-centered" id="myModal">
                                    {/*<ModalSignIn show={modalShow} onHide={() => setModalShow(false)}/>*/}
                                    {/*<button onClick={ModalSignIn}>ModalSign</button>*/}
                                    {/*<ModalSignIn/>*/}
                                </div>
                            </li>
                            <li>
                                <button type="button" className="btn btn-primary">
                                    Оповещения <span className="badge text-bg-secondary">4</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </div>

    )
};

export default NavigateHeader;