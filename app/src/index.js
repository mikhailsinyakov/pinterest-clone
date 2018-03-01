"use strict";
import Masonry from 'masonry-layout';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header';
import AddForm from '../components/AddForm';
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
            isShownOnlyUserPics: false,
            isShownForm: false,
            formShift: null,
            error: null
        };
        
        this.initMasonry = this.initMasonry.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.updatePics = this.updatePics.bind(this);
        this.addPicture = this.addPicture.bind(this);
        this.likeOrUnlikePicture = this.likeOrUnlikePicture.bind(this);
        this.deletePicture = this.deletePicture.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleError = this.handleError.bind(this);
        this.clearError = this.clearError.bind(this);
        this.showAllPics = this.showAllPics.bind(this);
        this.showOnlyUserPics = this.showOnlyUserPics.bind(this);
        this.replaceImageIfBroken = this.replaceImageIfBroken.bind(this);
    }
    
    initMasonry() {
        const grid = document.querySelector(".grid");
        const masonry = new Masonry(grid, {
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: 20
        });
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
    
    toggleForm(formShift) {
        if (!this.state.isShownForm) this.setState({isShownForm: true, formShift});
        else this.setState({isShownForm: false, formShift: null});
    }
    
    handleError(error) {
        let message;
        if (error == 403) message = "This image have already added";
        else if (error == 500) message = "Internal Server Error";
        else message = error;
        this.setState({error: message});
    }
    
    clearError() {
        this.setState({error: null});
    }
    
    showAllPics() {
        if (this.state.isShownOnlyUserPics) {
            this.setState({isShownOnlyUserPics: false});
        }
    }
    
    showOnlyUserPics(id) {
        if (this.state.isShownOnlyUserPics.id != id) {
            this.setState({isShownOnlyUserPics: id});
        }
    }
    
    replaceImageIfBroken() {
        function defaultImage(img) {
            img.onerror = null;
            img.src = "../../public/img/placeholder.png";
        }
        const images = Array.from(document.querySelectorAll("img"));
        images.forEach(img => img.onerror = () => defaultImage(img));
    }
    
    componentDidMount() {
        this.getUserInfo();
        this.updatePics();
    }
    
    componentDidUpdate() {
        this.initMasonry();
        this.replaceImageIfBroken();
    }
    
    
    render() {
        return (
            <div className="container">
                <Header user={this.state.user} toggleForm={this.toggleForm}
                        isShownOnlyUserPics={this.state.isShownOnlyUserPics}
                        showAllPics={this.showAllPics} 
                        showOnlyUserPics={this.showOnlyUserPics}/>
                {this.state.isShownForm && 
                        <AddForm formShift={this.state.formShift}
                                 toggleForm={this.toggleForm} 
                                 addPicture={this.addPicture}/>}
                <ErrorMessage error={this.state.error} clearError={this.clearError}/>
                <Pics pics={this.state.pics} user={this.state.user} 
                        deletePicture={this.deletePicture} 
                        likeOrUnlikePicture={this.likeOrUnlikePicture}
                        isShownOnlyUserPics={this.state.isShownOnlyUserPics}
                        showOnlyUserPics={this.showOnlyUserPics}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, app);