import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {styled} from '@mui/system';
import {Box, Button, Grid, TextField, Unstable_Grid2} from '@mui/material'
import {TextareaAutosize} from '@mui/base/TextareaAutosize';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';
import {Grid3x3, Grid3x3Sharp} from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Container} from "@mui/joy";

const SendReview = (props) => {
    const navigate = useNavigate();

    const [cleanliness, setCleanliness] = useState()
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const API_COMMENT = "http://127.0.0.1:8000/api/v1/send_comment"
    const API_REFRESH = "http://127.0.0.1:8000/api/v1/auth/token/refresh/";
    const API_VERIFY = "http://127.0.0.1:8000/api/v1/auth/token/verify/";


    // const [username, setUsername] = useState("");
    // const [user_id, setUserId] = useState(null);

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


    // useEffect(() => {
    //     if (sessionStorage.getItem("auth_token")) {
    //         // let tokens = JSON.parse(sessionStorage.getItem("auth_token"));
    //         let tokens = JSON.parse(sessionStorage.getItem("auth_token"));
    //         let user = parseJwt(tokens.refresh).username;
    //         let user_id = parseJwt(tokens.refresh).user_id;
    //         setUsername(user);
    //         setUserId(user_id)
    //     } else {
    //         console.log("NO TOKENS", sessionStorage);
    //
    //     };
    // }, [sessionStorage.getItem("auth_token")]);

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






    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanliness = document.getElementById("cleanliness")
        const timeliness_of_check_in = document.getElementById("timeliness_of_check_in")
        const location = document.getElementById("location")
        const conformity_to_photos = document.getElementById("conformity_to_photos")
        const price_quality = document.getElementById("price_quality")
        const quality_of_service = document.getElementById("quality_of_service")
        const comment = document.getElementById("comment")
        // const user_id = parseJwt(sessionStorage.getItem('auth_token').refresh).user_id


        if  (sessionStorage.getItem("auth_token")){
            var tk = JSON.parse(sessionStorage.getItem("auth_token"));
            console.log("get_tokens_from_sessionStorage_LOGOUT", tk.refresh)

            let isValid = await verify_token(tk.access, tk.refresh);

            if (!isValid) {
                var tk = JSON.parse(sessionStorage.getItem("auth_token"));
            }

        }else{
            var tk = {
                access:'false',
                refresh:'false'
            }
        }


        let user = parseJwt(tk.refresh).username;
        let user_id = parseJwt(tk.refresh).user_id;
        // setUsername(user);
        // setUserId(user_id)

        let response = await fetch(
            API_COMMENT,
            {
                method: "POST",
                body: JSON.stringify({
                    room_object: props.room_object.id,
                    tenant: user_id,
                    cleanliness: cleanliness.value,
                    timeliness_of_check_in: timeliness_of_check_in.value,
                    location: location.value,
                    conformity_to_photos: conformity_to_photos.value,
                    price_quality: price_quality.value,
                    quality_of_service: quality_of_service.value,
                    review_text: comment.value,
                })
                ,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": `Bearer ${tk.access}`

                    // 'Cache-Control': 'no-cache',
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log("data_success_Success", data)
            setSuccess(data)
        } else {
            let error = await response.json();
            console.log("data_success_Error", error.error);
            setError(error)
        }
    }
    console.log(cleanliness)
    return (

        <form method="POST" className="needs-validation align-right" autoComplete="off"
              onSubmit={(e) => handleSubmit(e)}>
            <Container maxWidth="lg">

                <Grid container spacing={10} alignContent={"center"}>
                    <Grid item xs={12} sm={6} zeroMinWidth={true}>
                        <TextField
                            // sx={{
                            //     '& .MuiTextField-root': {m: 0, width: '67ch'},
                            // }}
                            id="cleanliness"
                            label="Чистота"
                            placeholder="Оценка от 0 до 10"
                            type="number"
                            InputProps={{inputProps: {min: 0, max: 10}}}
                            fullWidth={true}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required={true}

                        /><br/><br/>
                        <TextField
                            id="timeliness_of_check_in"
                            label="Своевременность
                                    заселения"
                            placeholder="Оценка от 0 до 10"
                            type="number"
                            fullWidth={true}
                            size="small"
                            InputProps={{inputProps: {min: 0, max: 10}}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required={true}
                        /><br/><br/>
                        <TextField
                            id="location"
                            label="Расположение"
                            placeholder="Оценка от 0 до 10"
                            type="number"
                            fullWidth={true}
                            size="small"
                            InputProps={{inputProps: {min: 0, max: 10}}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required={true}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="conformity_to_photos"
                            label="Соответствие
                                    фото"
                            placeholder="Оценка от 0 до 10"
                            type="number"
                            fullWidth={true}
                            size="small"
                            InputProps={{inputProps: {min: 0, max: 10}}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required={true}
                        /><br/><br/>
                        <TextField
                            id="price_quality"
                            label="Цена - качество"
                            placeholder="Оценка от 0 до 10"
                            type="number"
                            fullWidth={true}
                            size="small"
                            InputProps={{inputProps: {min: 0, max: 10}}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required={true}
                        /><br/><br/>
                        <TextField
                            id="quality_of_service"
                            label="Качество
                                    обслуживания"
                            placeholder="Оценка от 0 до 10"
                            type="number"
                            fullWidth={true}
                            size="small"
                            InputProps={{inputProps: {min: 0, max: 10}}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required={true}
                        /><br/><br/>
                    </Grid>
                </Grid>
                {/*<Box*/}
                {/*    component="form"*/}
                {/*    // sx={{*/}
                {/*    //     '& .MuiTextField-root': {m: 0, width: '67ch'},*/}
                {/*    // }}*/}
                {/*    noValidate*/}
                {/*    fullWidth={true}*/}
                {/*    autoComplete="off"*/}
                {/*    style={{textAlign: "left"}}*/}
                {/*>*/}

                <TextField
                    id="comment"
                    label="Комментарий"
                    fullWidth={true}
                    multiline
                    maxRows={5}
                    // required={true}
                />


                <br/><br/>
                <Button onClick={() => {
                }} type="submit" variant="outlined" color="success">Опубликовать</Button>
                {/*<TextField*/}
                {/*    id="date_range"*/}
                {/*    select*/}
                {/*    label="Select"*/}
                {/*    defaultValue="---"*/}
                {/*    helperText="Выберите период заезда, на которых хотите оставить отзыв"*/}
                {/*    size="small"*/}
                {/*>*/}

                {/*</TextField>*/}
                {/*</Box>*/}
            </Container>
        </form>


    )
        ;
};


export default SendReview;