"use strict";

import React from 'react';

export default function ErrorMessage (props) {
    if (!props.error) return null;
    return (
        <p className="alert alert-dark">{props.error}
            <i className="fas fa-times" onClick={props.clearError}></i>
        </p>
    );
}