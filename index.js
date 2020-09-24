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

    _internalSet (key, value) {
        super.set(key, value);
    }

    _internalGet (key) {
        return super.get(key);
    }

    _fetchDb () {
        this.db.list().then((keys) => {
            keys.forEach((key) => {
                this.db.get(key).then((value) => {
                    this._internalSet(key, value);
                });
            });
        });
    }

    /* END INTERNAL METHODS */

    
}

// Export
module.exports = DB;