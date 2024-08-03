import React, {useState} from "react";
import {Route, Link, Routes, useNavigate} from "react-router-dom";

function RegisterPage() {
    const API_REGISTER = "http://127.0.0.1:8000/api/v1/auth/token/register/"
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [token, setToken] = useState({});
    const [error, setError] = useState();


    async function register(event) {
        const Username = await document.getElementById("name").value;
        const Email = await document.getElementById("email").value;
        const UserPassword = await document.getElementById("password").value;

        let response = await fetch(
            API_REGISTER,
            {
                method: "POST",
                body: JSON.stringify({
                    username: Username,
                    password: UserPassword,
                    email: Email,
                })
                ,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    // 'Cache-Control': 'no-cache',
                },
            }
        ).catch(
            (e)=>{setError(e)}
        );
        if (response.ok) {
            const token = await response.json();
            sessionStorage.setItem("auth_token", JSON.stringify(token));
            console.log("REGUSTRATION", token);
            navigate("/")


        } else {
            let errors = await response.json()
            console.log("REGISTRATION", errors.username[0]);
            setError(errors.username[0])
            // navigate(0)
        }


    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);
        register(event);

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
        <section class="h-100">
            <div class="container h-100">
                <div class="row justify-content-sm-center h-100">
                    <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div class="text-center my-5">
                            <img src="/image/logo/kvartirnik_logo.png" alt="logo" className="w-100"/>
                        </div>
                        {error ? <div className="alert alert-danger">{error}</div>: ""}
                        <div></div>
                        <div class="card shadow-lg   rounded-5">
                            <div class="card-body p-5">
                                <h1 class="fs-4 card-title fw-bold mb-4">Register</h1>
                                <form method="POST" class="needs-validation" validate="" autocomplete="off" onSubmit={(event) => {handleSubmit(event)}}>
                                    <div class="mb-3">
                                        <label class="mb-2 text-muted" for="Login">Login</label>
                                        <input id="name" type="text" class="form-control" name="Login" required
                                               autofocus/>
                                        <div class="invalid-feedback">
                                            Login is required
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label class="mb-2 text-muted" for="email">E-Mail Address</label>
                                        <input id="email" type="email" class="form-control" name="email" required/>
                                        <div class="invalid-feedback">
                                            Email is invalid
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label class="mb-2 text-muted" for="password">Password</label>
                                        <input id="password" type="password" class="form-control" name="password"
                                               required/>
                                        <div class="invalid-feedback">
                                            Password is required
                                        </div>
                                    </div>

                                    <p class="form-text text-muted mb-3">
                                        By registering you agree with our terms and condition.
                                    </p>

                                    <div class="align-items-center d-flex">
                                        <button type="submit" class="btn btn-primary ms-auto">
                                            Регистрация
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer py-3 border-0">
                                <div class="text-center">
                                    Already have an account? <Link to="/login" class="text-dark">Login</Link>
                                </div>
                            </div>
                        </div>
                        {/*<div class="text-center mt-5 text-muted">*/}
                        {/*    Copyright &copy; 2017-2021 &mdash; Your Company*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            <script src="js/login.js"></script>
        </section>
    );

};

export default RegisterPage;