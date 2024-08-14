import React, {useEffect, useState} from "react";
import {Route, Link, Routes, useNavigate, Navigate, useLocation,} from "react-router-dom";
import axios from "axios";
import * as loginForm from "react-dom/test-utils";


function LoginPage() {
    const API_LOGOUT = "http://127.0.0.1:8000/api/v1/auth/token/login/"
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [token, setToken] = useState({});
    const [error, setError] = useState();


    useEffect(()=>{
        if (sessionStorage.getItem("auth_token")) {
            navigate(-1)
        }
    }, [])

    async function auth({event, username, password}) {
        const Username = await document.getElementById("login").value;
        const UserPassword = await document.getElementById("password").value;



        let response = await fetch(
            API_LOGOUT,
            {
                method: "POST",
                body: JSON.stringify({
                    username: Username,
                    password: UserPassword,
                })
                ,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    // 'Cache-Control': 'no-cache',
                },
            }
        );
        if (response.ok) {
            const token = await response.json();
            sessionStorage.setItem("auth_token", JSON.stringify(token));
            navigate(-1)

        } else {
            let error = await response.json();
            console.log("LOGIN", error.error);
            setError(error.error)
            // navigate(0)
        }


    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);
        auth(event);

    };

    function isValidate() {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()

                    }
                    form.classList.add('was-validated')

                }, false)
            })

    };


    return (
        <section className="h-100 ">
            <div className="container h-100 ">
                <div className="row justify-content-sm-center h-100 ">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 ">
                        <div className="text-center my-5">
                            <img src="/image/logo/kvartirnik_logo.png" alt="logo" className="w-100 "/>
                        </div>
                        {error ? <div className="alert alert-danger">{error}</div>: ""}
                        <div className="card shadow-lg   rounded-5">
                            <div className="card-body p-5 ">
                                <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                                <form method="POST" className="needs-validation" validate={validated} autoComplete="off"
                                      onSubmit={(e) => handleSubmit(e)}>
                                    <div className="mb-3">

                                        {/*<label className="mb-2 text-muted" for="email">E-Mail Address</label>*/}
                                        {/*<input id="email" type="email" className="form-control" name="email"*/}
                                        {/*       required*/}
                                        {/*       autofocus/>*/}

                                        <label className="mb-2 text-muted" htmlFor="Login">Login</label>
                                        <input id="login" type="text" className="form-control" name="login"
                                               required
                                               autoFocus="on"/>
                                        <div className="invalid-feedback">
                                            Login is invalid
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" for="password">Password</label>
                                            <Link to="/forgot" className="float-end">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <input id="password" type="password" className="form-control" name="password"
                                               required/>
                                        <div className="invalid-feedback">
                                            Password is required
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input type="checkbox" name="remember" id="remember"
                                                   className="form-check-input"/>
                                            <label for="remember" className="form-check-label">Remember Me</label>
                                        </div>
                                        <button type="submit" name="submit" className="btn btn-primary ms-auto">
                                            Login
                                        </button>
                                        {/*<input onSubmit={handleSubmit} type="submit" name="upload" value="Войти" className="btn btn-primary ms-auto"/>*/}

                                    </div>
                                </form>
                            </div>
                            <div className="card-footer py-3 border-0">
                                <div className="text-center">
                                    Don't have an account? <Link to="/register" className="text-dark">Create One</Link>
                                </div>
                            </div>
                        </div>
                        {/*<div className="text-center mt-5 text-muted">*/}
                        {/*    Copyright &copy; 2017-2021 &mdash; Your Company*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            {/*<script src="login.js"></script>*/}
        </section>
    );

};


export default LoginPage;