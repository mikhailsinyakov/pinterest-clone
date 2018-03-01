"use strict";

import React from 'react';

export default function Picture(props) {
    
    const isAuth = !!props.user;
    const isUsersPicture = props.user && 
                            props.user.displayName == props.pic.user_displayName;
    const wasUserLiked = props.user && 
                        !!props.pic.likes.filter(like => like.user_id == props.user.id).length;
    
    const pointerStyle = {cursor: "pointer"};
    const displayName = <span className="displayName" style={pointerStyle}
                              onClick={() => props.showOnlyUserPics(props.pic.user_id)}>
                            {isUsersPicture ? "You" : props.pic.user_displayName}
                        </span>;
    const image = <img className="card-img-top" src={props.pic.url}/>;
    const title = <h5 className="bg-light text-center">{props.pic.description}</h5>;
    const likeBtnActions = (<i onClick={() => props.likeOrUnlikePicture(props.pic.id)}
                        className={wasUserLiked ? "fas fa-heart" : "far fa-heart"}
                        style={pointerStyle}>
                    </i>);
    const likeBtnView = <i className="far fa-heart"></i>;
    const info = <p className="info">
                    {displayName} 
                    <span className="likes">
                        {isAuth ? likeBtnActions : likeBtnView}
                        {props.pic.likes.length}
                    </span>
                 </p>;
    const deleteBtn = (<i className="fas fa-times"
                            onClick={() => props.deletePicture(props.pic.id)}></i>);
                    
    return (<div className="card grid-item">
                {image}
                <div>
                    {title}
                    {info}
                    {isAuth && isUsersPicture && deleteBtn}
                </div>
           </div>);
}