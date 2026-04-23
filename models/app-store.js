'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const appStore = {
    store: new JsonStore('./models/app-store.json', {info: {}, employee: {}}),

    getAppInfo(){
        return this.store.findAll("info");
    },
    getEmployee(){
        return this.store.findAll("employee");
    }
};

export default appStore;