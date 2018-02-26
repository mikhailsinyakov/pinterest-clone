"use strict";

import React from 'react';
import urlRegex from 'url-regex';

export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlInput: '',
            descriptionInput: ''
        };
        this.handleUrlInput = this.handleUrlInput.bind(this);
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleUrlInput(e) {
        this.setState({urlInput: e.target.value});
    }
    
    handleDescriptionInput(e) {
        this.setState({descriptionInput: e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const url = this.state.urlInput;
        const description = this.state.descriptionInput;
        
        if (!url || !description || !urlRegex().test(url) ) {
            return;
        }
        const data = `url=${url}&description=${description}`;
        
        this.props.addPicture(data);
        this.props.toggleForm();
        this.setState({
            urlInput: '',
            descriptionInput: ''
        });
        
    }
    
    render() {
        if (!this.props.isShownForm) return null;
        return (
            <form method="POST" action="/api/pics/addPicture" 
                onSubmit={this.handleSubmit}>
                <input type="text" placeholder="URL" name="url"
                    onChange={this.handleUrlInput} value={this.state.urlInput}/>
                <input type="text" placeholder="Description" name="description"
                    onChange={this.handleDescriptionInput} 
                    value={this.state.descriptionInput}/>
                <button type="submit">Add</button>
            </form>
        );
    }
}