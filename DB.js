'use strict'
const mongo = require("mongodb").MongoClient  
const validate = require("./inputValidation")
const url = 'mongodb://localhost:27017/test'

module.exports = class DB {
    
    constructor(){}
    
    insert(input) {
        if (!validate(input)) return false
       
        let doc = {original_url: input}
        mongo.connect(url, (err, db) => {
            if (err) throw err
            db.collection('urls').update({original_url: input}, doc, {upsert: true})
            db.close()
        })
        return true
    }
    
}
