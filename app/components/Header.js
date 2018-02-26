"use strict";

import React from 'react';
import AddForm from './AddForm';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShownForm: false
        };
        this.toggleForm = this.toggleForm.bind(this);
    }
    
    toggleForm() {
        if (!this.state.isShownForm) this.setState({isShownForm: true});
        else this.setState({isShownForm: false});
    }
    
    render() {
        if (!this.props.user) {
            return (
                <header>
                    <h5>Welcome, guest!</h5>
                    <nav>
                        <ul>
                            <li><a href="/auth/vkontakte">Login with VK</a></li>
                        </ul>
                    </nav>
                </header>
            );
        }
        return (
            <header>
                <h5>Welcome, {this.props.user.displayName}!</h5>
                <nav>
                    <ul>
                        <li onClick={this.toggleForm}>Add a picture</li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </nav>
                <AddForm isShownForm={this.state.isShownForm} 
                        toggleForm={this.toggleForm} 
                        addPicture={this.props.addPicture}/>
            </header>
        );
    }
    
}