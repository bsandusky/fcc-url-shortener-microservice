'use strict'
const mongo = require("mongodb").MongoClient  
const validate = require("./inputValidation")
const url = 'mongodb://localhost:27017/test'

module.exports = class DB {
    
    constructor(){}
    
    insert(input) {
        if (!validate(input)) return null
        
        let doc = {original_url: input, short_url_code: 1234}
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('urls').update({original_url: input}, doc, {upsert: true})
            db.close()
        })
    }
    
    getShortUrlCode(input, callback) {
        if (!validate(input)) return null
        
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
