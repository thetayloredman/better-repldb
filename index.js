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
        /**
         * Credit to @kyra#0001 for this greatly simplified
         * code, unlike my 7 line version of this. They
         * deserve cake! xd
         */
        return input.startsWith(`${this.name}:`)
  ? input.slice(this.name.length + 1)
  : `${this.name}:${input}`;
    }

    _mapSet (key, value) {
        super.set(key, value);
    }

    _mapGet (key, value) {
        return super.get(key, value);
    }

    _fetch () {
        super.clear();
        this.db.list().then((keys) => {
            keys.forEach((key) => {
                if (!key.startsWith(`${this.name}:`)) {
                    return;
                }
                this.db.get(key).then((value) => {
                    this._mapSet(this._parsePrefix(key), value)
                });
            });
        });
    }

    /* END INTERNAL METHODS */

    get (key) {
        return this._mapGet(key);
    }

    set (key, value) {
        let vkey = this._parsePrefix(key);
        this.db.set(vkey, value);
        this._mapSet(key, value);
    }

    clear () {
        this.db.list().then((keys) => {
            keys.forEach((key) => {
                if (key.startsWith(`${this.name}:`)) {
                    this.db.delete(key);
                }
            });
        });
        super.clear();
    }
}

// Export
module.exports = DB;