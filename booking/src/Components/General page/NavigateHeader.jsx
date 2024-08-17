
import React, {Component, useEffect, useState,} from "react";
import {useNavigate, Link, Route, Routes} from "react-router-dom";
import ProfilePage from "../Authorization/ProfilePage";

const NavigateHeader = (token) => {
    const navigate = useNavigate();
    const API_LOGOUT = "http://127.0.0.1:8000/api/v1/auth/token/logout/";
    const API_REFRESH = "http://127.0.0.1:8000/api/v1/auth/token/refresh/";
    const API_VERIFY = "http://127.0.0.1:8000/api/v1/auth/token/verify/";

    const [username, setUsername] = useState("");
    const [user_id, setUserId] = useState(null);

    function parseJwt(token) {
        if (!token) {
            return "Нету токена";
        }
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };


    useEffect(() => {
        if (sessionStorage.getItem("auth_token")) {
            // let tokens = JSON.parse(sessionStorage.getItem("auth_token"));
            let tokens = JSON.parse(sessionStorage.getItem("auth_token"));
            let user = parseJwt(tokens.refresh).username;
            let user_id = parseJwt(tokens.refresh).user_id;
            setUsername(user);
            setUserId(user_id)
        } else {
            console.log("NO TOKENS", sessionStorage);

        };
    }, []);

    async function reset_tokens(refresh_token) {
        console.log("tokens_REFRESH", refresh_token)
        let response = await fetch(
            API_REFRESH,
            {
                method: "POST",
                body: JSON.stringify({
                    refresh: refresh_token,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    // "Authorization": `Bearer ${JSON.stringify(tokens.access)}`
                    // 'Cache-Control': 'no-cache',
                },
            }
        );

        if (response.ok) {
            console.log("REFRESH", response.ok);
            sessionStorage.removeItem("auth_token");
            let tk = await response.json();
            tk["refresh"] = refresh_token;
            sessionStorage.setItem("auth_token", JSON.stringify(tk));
        } else {
            console.log("REFRESH", response);
            sessionStorage.removeItem("auth_token");
            console.log("Нужна повторная авторизация")
            navigate("/login")

        }
    };

    async function verify_token(ta, tr) {
        console.log("tokens_VERIFY", ta)
        let response = await fetch(
            API_VERIFY,
            {
                method: "POST",
                body: JSON.stringify({
                    token: ta,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    // "Authorization": `Bearer ${tokens.access}`
                    // 'Cache-Control': 'no-cache',
                },
            }
        );

        if (response.ok) {
            console.log('TOKENS IS VALID')
            return true
        } else {
            console.log('TOKENS IS NOT VALID')
            await reset_tokens(tr)
            console.log('TOKENS IS UPDATE')
            return false
        }
    }


    async function logout() {
        if  (sessionStorage.getItem("auth_token")) {
            var tk = JSON.parse(sessionStorage.getItem("auth_token"));
            console.log("get_tokens_from_sessionStorage_LOGOUT", tk.refresh)

            let isValid = await verify_token(tk.access, tk.refresh);
            if (!isValid) {
                var tk = JSON.parse(sessionStorage.getItem("auth_token"));
            }

        } else {
            var tk = {
                access:'false',
                refresh:'false'
            }
        }


        let response = await fetch(
            API_LOGOUT,
            {
                method: "POST",
                body: JSON.stringify({
                    refresh_token: tk.refresh,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": `Bearer ${tk.access}`
                    // 'Cache-Control': 'no-cache',
                },
            }
        );

        if (response.ok) {
            console.log('REMOVE TOKENS')
            sessionStorage.removeItem("auth_token");
            navigate(0)
        } else {
            console.log("LOGOUT", response)
            navigate(0)
        }
        // navigate(0)
    }

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
                                <a className="nav-link" href="#">Избранное(сделать как модальное окно)</a>
                            </li>
                            {(sessionStorage.getItem("auth_token")) ?
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {username} <span className="badge text-bg-secondary">4</span>
                                    </a>

                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li>
                                            <Link className="dropdown-item" to={`/profile/${user_id}/`}>Профиль</Link>
                                            <Routes>
                                                <Route
                                                    path="/profile/:id"
                                                    render={(props) => <ProfilePage props/>}
                                                />
                                            </Routes>
                                        </li>
                                        <li>
                                            {/*<button type="button" className="btn btn-primary">*/}
                                            <span className="dropdown-item">Оповещения </span>
                                            {/*</button>*/}
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#" onClick={() => {
                                            logout()
                                        }}>Выйти</a></li>
                                    </ul>

                                </li>
                                : <li className="nav-item"><a className="nav-link" href="/login">Войти</a></li>}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )
};

export default NavigateHeader;