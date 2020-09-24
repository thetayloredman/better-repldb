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
                if (key.startsWith(this.name + ':')) {
                    key = key.split(this.name + ':');
                    key.shift();
                    key = key.join(this.name + ':')
                    this.db.get(key).then((value) => {
                        this._internalSet(key, value);
                    })
                }
            });
        });
    }

    /* END INTERNAL METHODS */

    set (key, value) {
        this.db.set(key, value);
        this._internalSet(key, value);
    }
}

// Export
module.exports = DB;