import React from 'react';
import {Link} from "react-router-dom";




const SendReview = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="container rounded-5">
            <form method="POST" className="needs-validation"  autoComplete="off"
                  onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <div className="input-group mb-3">
                        <label className="mb-2 text-muted" htmlFor="#comment"> &nbsp;</label>
                        <input id="comment" type="text" className="form-control" placeholder="Ваш комментарий..."
                               aria-label="Имя пользователя получателя" aria-describedby="button-addon2"/>
                        <button className="btn btn-success ms-auto" type="button" id="button-addon2">Опубликовать</button>
                    </div>
                </div>


                {/*<button type="submit" name="submit" className="btn btn-primary ms-auto">*/}
                {/*    Опубликовать*/}
                {/*</button>*/}
                {/*<input onSubmit={handleSubmit} type="submit" name="upload" value="Войти" className="btn btn-primary ms-auto"/>*/}

            </form>
            <br/>
        </div>

    );
};


export default SendReview;