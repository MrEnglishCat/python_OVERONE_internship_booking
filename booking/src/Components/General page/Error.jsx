import React from 'react';
import Alert from '@mui/material/Alert';

const Error = (props) => {

    return (
        <div>
            {
                props.error ?
                    <Alert severity="error">{props.error.error}{props.error.detail}</Alert> : props.success ?
                        <Alert severity="success">{props.success.success}</Alert> : ""
            }
        </div>
    );
};


export default Error;