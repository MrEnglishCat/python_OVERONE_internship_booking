import React from 'react';
import {Link} from "react-router-dom";
import {styled} from '@mui/system';
import {Button} from '@mui/material'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';


const SendReview = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="container rounded-5">
            <form method="POST" className="needs-validation" autoComplete="off"
                  onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <div className="input-group mb-3">
                        <div className="row"></div>
                        <div className="row">
                            <TextareaAutosize></TextareaAutosize>
                            <input id="comment" type="area" className="form-control" placeholder="Ваш комментарий..."
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