"use strict";

import React from 'react';

export default function Picture(props) {
    const isAuth = !!props.user;
    const isUsersPicture = props.user && 
                            props.user.displayName == props.pic.user_displayName;
    const wasUserLiked = props.user && 
                        !!props.pic.likes.filter(like => like.user_id == props.user.id).length;
     
    const displayName = <span onClick={() => props.showOnlyUserPics(props.pic.user_id)}>
            {isUsersPicture ? "You" : props.pic.user_displayName}</span>;
    const image = <img src={props.pic.url} width="20%" />;
    const info = <p>{displayName} {props.pic.likes.length} {props.pic.description}</p>;
    const likeBtn = (<p onClick={() => props.likeOrUnlikePicture(props.id)}>
                        {wasUserLiked ? "Unlike" : "Like"}
                    </p>);
    const deleteBtn = (<button type="button" onClick={() => props.deletePicture(props.id)}>
                        Delete
                    </button>);
            
    if (!isAuth) {
        return (
            <div>
                {image}
                {info}
            </div>
        );
    }
    
    if (!isUsersPicture) {
        return (
            <div>
                {image}
                {info}
                {likeBtn}
            </div>
        );
    }
    
    return (
        <div>
            {image}
            {info}
            {likeBtn}
            {deleteBtn}>
        </div>
    );
}