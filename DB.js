'use strict'
const mongo = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/test"

module.exports = class DB {
    
    constructor(){}
    
    getRecordByCode(input, callback) {
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('urls').findOne({short_url_code: input}, (err, result) => {
                if (err) throw err
                db.close()
                callback(result)
            })
        })
    }
    
    getRecordByUrl(input, callback) {
           mongo.connect(url, (err, db) => {
            if (err) console.log(err)
            db.collection('urls').findOne({original_url: input}, (err, result) => {
                if (err) throw err
                db.close()
                callback(result)
            })
        })
    }
    
    insert(urlObj) {
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('urls').insertOne({original_url: urlObj.original_url, short_url_code: urlObj.short_url_code})
            db.close()
        })
    }
}
