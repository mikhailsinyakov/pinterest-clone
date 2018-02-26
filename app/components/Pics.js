"use strict";

import React from 'react';
import Picture from './Picture';

export default function Pics (props) {
    const pics = props.pics.map(pic => {
        return (<Picture pic={pic} key={pic.id}
            user={props.user} deletePicture={props.deletePicture}
            likeOrUnlikePicture={props.likeOrUnlikePicture}/>);
    });
    return <div>{pics}</div>;
}