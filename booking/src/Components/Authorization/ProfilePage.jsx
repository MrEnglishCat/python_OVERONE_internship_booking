import React, {Component, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import NavigateHeader from "../General page/NavigateHeader";
import jwt_decode from "jwt-decode";

const ProfilePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const API_USERDATA = ""
    const [tokens, setTokens] = useState({});
    const [user_id, setUserId] = useState(null);
    const [username, setUsername] = useState("");

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
            setTokens(JSON.parse(sessionStorage.getItem("auth_token")));
            let user = parseJwt(tokens.refresh).username;
            let user_id = parseJwt(tokens.refresh).user_id;
            setUsername(user);
            // setUserId(user_id)
        } else {
            console.log("NO TOKENS", sessionStorage);

        }
        ;
    }, [username]);


    useEffect(
        () => {
            if (!sessionStorage.getItem("auth_token")) {
                navigate("/login")
            }

            async function getUserData() {
                let response = await fetch(
                    API_USERDATA,
                    {
                        method: "POST",
                        body: {
                            refresh_token: "",
                        },
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "*/*",
                            "Authorization": `Bearer ${JSON.stringify(tokens.access)}`  // НУЖЕН ДЛЯ АВТОРИЗАЦИИ ЧТО БЫ ПОЛУЧИТЬ ДАНЫЕ ПРОФАЙЛА
                            // 'Cache-Control': 'no-cache',
                        },
                    }
                );

                if (response.ok) {
                    console.log("REFRESH", response.ok);
                    sessionStorage.setItem("auth_token", JSON.stringify(response));
                } else {
                    console.log("REFRESH", response);
                }
            };
        }, []
    );


    return (
        <div>
            <div>
                <NavigateHeader/>
                PROFILE {id}
            </div>
        </div>
    );
};


export default ProfilePage;