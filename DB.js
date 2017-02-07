'use strict'
const mongo = require("mongodb").MongoClient  
const url = 'mongodb://localhost:27017/test'

module.exports = class DB {
    
    constructor(){}
    
    insert(urlObj) {
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('urls').update({original_url: urlObj.original_url}, urlObj, {upsert: true})
            db.close()
        })
    }
    
    getShortUrlCode(input, callback) {
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('urls').findOne({original_url: input}, (err, doc) => {
                if (err) throw err
                callback(doc.short_url_code)
                db.close()
            })
        })
    }
}
