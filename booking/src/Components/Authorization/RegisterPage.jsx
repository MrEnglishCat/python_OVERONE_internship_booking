import React from "react";
import {Route, Link, Routes} from "react-router-dom";

function RegisterPage() {




    return (
        <section class="h-100">
            <div class="container h-100">
                <div class="row justify-content-sm-center h-100">
                    <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div class="text-center my-5">
                            <img src="/image/logo/kvartirnik_logo.png" alt="logo" className="w-100"/>
                        </div>
                        <div class="card shadow-lg">
                            <div class="card-body p-5">
                                <h1 class="fs-4 card-title fw-bold mb-4">Register</h1>
                                <form method="POST" class="needs-validation" novalidate="" autocomplete="off">
                                    <div class="mb-3">
                                        <label class="mb-2 text-muted" for="Login">Login</label>
                                        <input id="name" type="text" class="form-control" name="Login"  required autofocus/>
                                        <div class="invalid-feedback">
                                            Login is required
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label class="mb-2 text-muted" for="email">E-Mail Address</label>
                                        <input id="email" type="email" class="form-control" name="email"  required/>
                                        <div class="invalid-feedback">
                                            Email is invalid
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label class="mb-2 text-muted" for="password">Password</label>
                                        <input id="password" type="password" class="form-control" name="password" required/>
                                        <div class="invalid-feedback">
                                            Password is required
                                        </div>
                                    </div>

                                    <p class="form-text text-muted mb-3">
                                        By registering you agree with our terms and condition.
                                    </p>

                                    <div class="align-items-center d-flex">
                                        <button type="submit" class="btn btn-primary ms-auto">
                                            Register
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