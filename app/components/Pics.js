"use strict";

import React from 'react';
import Picture from './Picture';

export default function Pics (props) {
    let pics = props.pics;
    if (!props.isShownOnlyUserPics) {
        const user_id = props.isShownOnlyUserPics;
        pics = pics.filter(picture => picture.user_id == user_id);
    }
    pics = props.pics.map(pic => {
        return (<Picture pic={pic} key={pic.id}
            user={props.user} deletePicture={props.deletePicture}
            likeOrUnlikePicture={props.likeOrUnlikePicture}
            showOnlyUserPics={props.showOnlyUserPics}/>);
    });
    return <div>{pics}</div>;
}