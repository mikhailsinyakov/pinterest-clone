"use strict";

import React from 'react';

export default function Header (props) {
    const user = props.user;
    const isShownAllPics = !props.isShownOnlyUserPics;
    const isShownUserPics = props.isShownOnlyUserPics == (user && user.id);
        
    const head = <h5 className="text-light">Welcome, {user ? user.displayName : "guest"}!</h5>;
    const loggingRedirect = user ? "/logout" : "/auth/vkontakte";
    const logging = (<li className="nav-item">
                        <a className="nav-link" href={loggingRedirect}>
                            {user ? "Logout"
                                  : "Login via "}
                            {!user && <i className='fab fa-vk'></i>}
                        </a>
                    </li>);
    const loginList = (<ul id="loginList" className="nav">
                        {logging}
                      </ul>);
                         
    const linkList = (<ul id="linkList" className="nav nav-pills">
                        <li className="nav-item"
                            onClick={props.showAllPics}>
                            <a className={isShownAllPics ? "nav-link active" : "nav-link"}
                                href="#">All</a>
                        </li>
                        <li className="nav-item" 
                            onClick={() => props.showOnlyUserPics(user && user.id)}>
                            <a className={isShownUserPics ? "nav-link active" : "nav-link"} 
                                href="#">My pics</a>
                        </li>
                        <li className="nav-item" onClick={e => props.toggleForm(e.screenX - 75)}>
                            <a className="nav-link" href="#">Add a picture</a>
                        </li>
                    </ul>);
        
        
    return (<header className="text-center bg-dark">
                {head}
                <nav className="clearfix">
                    {user && linkList}
                    {loginList}
                </nav>
            </header>);
    
}