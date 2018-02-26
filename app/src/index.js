"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';
import Pics from '../components/Pics';

import userController from '../controllers/userController.client';
import PicsController from '../controllers/picsController.client';

const picsController = new PicsController();
const app = document.querySelector("#app");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            pics: [],
            error: null
        };
        
        this.getUserInfo = this.getUserInfo.bind(this);
        this.updatePics = this.updatePics.bind(this);
        this.addPicture = this.addPicture.bind(this);
        this.likeOrUnlikePicture = this.likeOrUnlikePicture.bind(this);
        this.deletePicture = this.deletePicture.bind(this);
        this.handleError = this.handleError.bind(this);
        this.clearError = this.clearError.bind(this);
    }
    
    getUserInfo() {
        userController()
            .then(user => user.id && this.setState({user}))
            .catch(err => this.handleError(err));
    }
    
    updatePics() {
        picsController.getAllPics()
            .then(pics => this.setState({pics}))
            .catch(err => this.handleError(err));
    }
    
    addPicture(data) {
        picsController.addPicture(data)
            .then(this.updatePics)
            .catch(err => this.handleError(err));
    }
    
    likeOrUnlikePicture(id) {
        picsController.likeOrUnlikePicture(id)
            .then(this.updatePics)
            .catch(err => this.handleError(err));
    }
    
    deletePicture(id) {
        picsController.deletePicture(id)
            .then(this.updatePics)
            .catch(err => this.handleError(err));
    }
    
    handleError(error) {
        this.setState({error});
    }
    
    clearError() {
        this.setState({error: null});
    }
    
    componentDidMount() {
        this.getUserInfo();
        this.updatePics();
    }
    
    componentDidUpdate() {
        
    }
    
    render() {
        return (
            <div>
                <Header user={this.state.user} addPicture={this.addPicture}/>
                <ErrorMessage error={this.state.error} clearError={this.clearError}/>
                <Pics pics={this.state.pics} user={this.state.user} 
                        deletePicture={this.deletePicture} 
                        likeOrUnlikePicture={this.likeOrUnlikePicture}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, app);