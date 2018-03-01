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
        const value = e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1);
        this.setState({descriptionInput: value});
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
        const shift = this.props.formShift + "px";
        const style = {
            left: shift
        };
        return (<form className="bg-dark" method="POST" action="/api/pics/addPicture" 
                    onSubmit={this.handleSubmit} style={style}>
                    <input className="form-control form-control-sm" type="text"
                        placeholder="URL" name="url" value={this.state.urlInput}
                        onChange={this.handleUrlInput} />
                    <input className="form-control form-control-sm" type="text" 
                        placeholder="Description" name="description"
                        value={this.state.descriptionInput}
                        onChange={this.handleDescriptionInput}/>
                    <button className="btn btn-sm btn-secondary" type="submit">
                        Add
                    </button>
                </form>);
    }
}