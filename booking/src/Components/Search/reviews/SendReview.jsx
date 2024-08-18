import React, {useState} from 'react';
import {Link} from "react-router-dom";
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
    const [cleanliness, setCleanliness] = useState()
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const API_COMMENT = "http://127.0.0.1:8000/api/v1/send_comment"
    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanliness = document.getElementById("cleanliness")
        const timeliness_of_check_in = document.getElementById("timeliness_of_check_in")
        const location = document.getElementById("location")
        const conformity_to_photos = document.getElementById("conformity_to_photos")
        const price_quality = document.getElementById("price_quality")
        const quality_of_service = document.getElementById("quality_of_service")
        const comment = document.getElementById("comment")


        let response = await fetch(
            API_COMMENT,
            {
                method: "POST",
                body: JSON.stringify({
                    room_object: props.room_object.id,
                    tenant: 'user_id',
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
                    // "Authorization": `Bearer ${tk.access}`

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
                <Container maxWidth="sm">

                    <Grid container spacing={3} style={{textAlign: "center"}}>
                        <Grid xs >
                            <TextField
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
                            />

                        </Grid>
                        <Grid xs>
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
                            /><br/><br/>
                        </Grid>
                    </Grid>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 0, width: '67ch'},
                        }}
                        noValidate
                        autoComplete="off"
                        style={{textAlign: "center"}}
                    >

                        <TextField
                            id="comment"
                            label="Комментарий"

                            multiline
                            maxRows={5}
                        />
                    </Box>


                    <br/>
                    <Button onClick={() => {
                    }} type="submit" variant="outlined" color="success">Опубликовать</Button>
                </Container>
            </form>



    )
        ;
};


export default SendReview;