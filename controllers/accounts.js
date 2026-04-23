'use strict';

import logger from "../utils/logger.js";
import userStore from "../models/user-store.js";
import { v4 as uuidv4 } from 'uuid';

//create an accounts object
const accounts = {

    //function to render index page
    index(request, response){
        const viewData = {
            title: 'Login or Signup'
        };
        response.render('index', viewData);
    },

    //login function
    login(request, response){
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('login', viewData);
    },
    
    //logout function
    logout(request, response){
        response.cookie('playlist', '');
        response.redirect('/');
    },

    //signup function
    signup(request, response){
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('signup', viewData);
    },

    //register function for adding a new user
    register(request, response){
        const user = request.body;
        user.id = uuidv4();
        const profilePicture = request.files.profilePicture;

        userStore.addUser(user, profilePicture, function() {
            //same function as log in
            response.cookie('playlist', user.email);
            logger.info('registering'+ user.email);
            response.redirect('/start');
        });
    },

    //authenticate function to check user credentials
    authenticate(request, response){
        const user = userStore.getUserByEmail(request.body.email);
        if(user && user.password === request.body.password){
            response.cookie('playlist', user.email);
            logger.info('logging in' + user.email);
            response.redirect('/start');
        } else{
            response.redirect('/login');
        }
    },

    //utility function getCurrentUser to check is currently logged in
    getCurrentUser(request){
        const userEmail = request.cookies.playlist;
        return userStore.getUserByEmail(userEmail);
    }
}

export default accounts;