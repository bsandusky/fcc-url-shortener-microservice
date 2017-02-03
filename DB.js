'use strict'
const mongo = require("mongodb").MongoClient  
const validate = require("./inputValidation")
const url = 'mongodb://localhost:27017/test'

module.exports = class DB {
    
    constructor(){}
    
    insert(input) {
        if (!validate(input)) return false
        let doc = {original_url: input, short_url_code: 1234}
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('urls').update({original_url: input}, doc, {upsert: true})
            db.close()
        })
        return true
    }
    
    getShortUrlCode(input) {
        let short_url_code;
        if (!validate(input)) return null
        
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('urls').find({original_url: input}, {_id: 0, short_url_code: 1}).toArray((err, docs) => {
                if (err) throw err
                short_url_code = parseInt(docs[0].short_url_code)
                //console.log(short_url_code)
                db.close()
            })
        })
        return 1234
    }
}
