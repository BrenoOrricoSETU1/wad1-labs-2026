'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js"

const about = {
    createView(request, response){
        logger.info("About page loading!");
        const employee = appStore.getAppInfo();

        const viewData ={
            title: "About Playlist App",
            employee : employee
        };

    response.render('about', viewData);
    },
};


export default about;