"use strict";

import React from 'react';

export default function ErrorMessage (props) {
    if (!props.error) return null;
    return (
        <p>{props.error}
            <button type="button" onClick={props.clearError}>OK</button>
        </p>
    );
}