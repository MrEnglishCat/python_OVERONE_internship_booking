import React from 'react';
import {Link} from "react-router-dom";
import {styled} from '@mui/system';
import {Button, Grid, TextField} from '@mui/material'
import {TextareaAutosize} from '@mui/base/TextareaAutosize';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';
import Input from '@mui/material/Input';

const SendReview = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="container">
            <form method="POST" className="needs-validation" autoComplete="off"
                  onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3  align-content-center">
                    <div className="row">
                        <Grid container spacing={0}>
                            <Grid xs={2}  alignItems="center">
                                <TextField
                                    id="cleanliness"
                                    label="Чистота"
                                    type="number"

                                    aria-valuemax="10"
                                    aria-valuemin="0"
                                    InputLabelProps={{
                                        shrink: true,

                                    }}
                                /><br/><br/>
                                <TextField
                                    id="timeliness_of_check_in"
                                    label="Своевременность
                                    заселения"
                                    type="number"
                                    aria-valuemax="10"
                                    aria-valuemin="0"
                                    InputLabelProps={{
                                        shrink: true,

                                    }}
                                /><br/><br/>
                                <TextField
                                    id="location"
                                    label="Расположение"
                                    type="number"
                                    aria-valuemax="10"
                                    aria-valuemin="0"
                                    InputLabelProps={{
                                        shrink: true,

                                    }}
                                />

                                {/*<Item>xs=4</Item>*/}
                            </Grid>
                            <Grid xs={2}>
                                <TextField
                                    id="conformity_to_photos"
                                    label="Соответствие
                                    фото"
                                    type="number"

                                    aria-valuemax="10"
                                    aria-valuemin="0"
                                    InputLabelProps={{
                                        shrink: true,

                                    }}
                                /><br/><br/>
                                <TextField
                                    id="price_quality"
                                    label="Цена - качество"
                                    type="number"

                                    aria-valuemax="10"
                                    aria-valuemin="0"
                                    InputLabelProps={{
                                        shrink: true,

                                    }}
                                /><br/><br/>
                                <TextField
                                    id="quality_of_service"
                                    label="Качество
                                    обслуживания"
                                    type="number"

                                    aria-valuemax="10"
                                    aria-valuemin="0"
                                    InputLabelProps={{
                                        shrink: true,

                                    }}
                                /><br/><br/>
                                {/*<Item>xs=4</Item>*/}
                            </Grid>

                        </Grid>
                        <div className="col-12">
                            <div className="col-6">

                            </div>
                            <div className="col-6">

                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="input-group mb-3">
                            <input id="comment" type="area" className="form-control" row="5"
                                   placeholder="Ваш комментарий..."
                                   aria-label="Имя пользователя получателя" aria-describedby="button-addon2"/>
                            <Button onClick={() => {
                            }} type="submit" variant="outlined" color="success">Опубликовать</Button>
                        </div>
                    </div>

                </div>
            </form>

            <br/>
        </div>

    );
};


export default SendReview;