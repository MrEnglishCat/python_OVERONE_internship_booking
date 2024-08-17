import React from 'react';

const Error = (props) => {

    return (
        <div>
            {
                props.error ?
                    <div className="alert alert-danger">{props.error.error}{props.error.detail}</div> : props.success ?
                        <div className="alert alert-success">{props.success.success}</div> : ""
            }
        </div>
    );
};


export default Error;