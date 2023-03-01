var db = require('../config/connection')  //CODE FOR ACCESS DB OBJECT FROM connection.js
var collection = require('../config/collections')
var functions = require('../config/functions')
const res = require('express/lib/response')
const { resolve } = require('promise')

module.exports = {
    //COMMON FUNCTONS START COMMON FUNCTONS START COMMON FUNCTONS START COMMON FUNCTONS START COMMON FUNCTONS START COMMON FUNCTONS START
    get_name_purifierStatus_zone: (cid) => {
        return new Promise(async (resolve, reject) => {
            let data = await db.get().collection(collection.CUSTOMER_DETAILS).find({ cid: cid }).project({ name: 1, purifier_customer_status: 1, zone: 1, purifier_service_package_start_from: 1, purifier_service_package_end_on: 1, purifier_next_periodical_service_date: 1, purifier_service_section_admin_description: 1, purifier_service_section_technician_description: 1 }).toArray();
            resolve(data);
        })
    },

    
}
