import React, {useEffect} from 'react';
import Alert from '@mui/material/Alert';
import { ReactNotifications, Store } from 'react-notifications-component'
const Error = (props) => {

    return (
        <div>
            {
                props.error ?
                    <Alert severity="error">{props.error.error}{props.error.detail}</Alert> : props.success ?
                        <Alert severity="success">{props.success.success}{props.success.error}</Alert> : ""
            }
        </div>
    );
};


export default Error;