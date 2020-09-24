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

    _parsePrefix (input) {
        if (input.startsWith(`${this.name}:`)) {
        let output = input.split(`${this.name}:`);
        output.shift();
        output = output.join(`${this.name}:`);
        return output;
        } else {
            let output = `${this.name}:${input}`
        }
    }

    _dbSet (key, value) {
        this.db.set(this._parsePrefix(key), value);
    }

    _dbGet (key) {
        this.db.get(this._parsePrefix(key)).then((value) => {
            return value;
        });
    }

    _mapSet (key, value) {
        super.set(key, value);
    }

    _mapGet (key, value) {
        return super.get(key, value);
    }

    _fetch () {
        this.db.list().then((keys) => {
            keys.forEach((key) => {
                if (!key.startsWith(`${this.name}:`)) {
                    return;
                }
                let value = this._dbGet(key);
                this._mapSet(this._parsePrefix(key), value)
            });
        });
        return this;
    }

    /* END INTERNAL METHODS */
}

// Export
module.exports = DB;