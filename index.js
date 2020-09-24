// Import
const Database = require('@replit/database')

// Class
class DB extends Map {
    /**
     * Creates a new DB.
     * @constructor
     * @param {String} name The name of the "table" (Where all objects are stored)
     * @example
     * const DB = require('better-repldb');
     * 
     * // New DB
     * const myDB = new DB("myDB");
     */
    constructor (name) {
        super();
        if (!name) {
            throw new Error('[BRDBError] Missing "name" attribute.')
        }
        this.db = new Database();
        this.name = name;
    }

    /* BEGIN INTERNAL METHODS */

    

    /* END INTERNAL METHODS */

    /**
     * Gets a value from the Database.
     * @function
     * @param {String} key The database key to get.
     * @returns {*} The value
     */
    get (key) {
        let value = null;
        this.db.get(this.name + ':' + key).then((data) => {
            value = data;
        });
        return value;
    }

    set (key, value) {
        this.db.set(this.name + ':' + key, value)
    }

    fetch () {
        this.db.list().then((keys) => {
            keys.forEach((key) => {
                this.db.get(key).then((value) => {
                    this.set(key, value);
                })
            })
        })
    }
}

// Export
module.exports = DB;