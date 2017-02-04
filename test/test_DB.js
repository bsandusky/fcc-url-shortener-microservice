'use strict'
const DB = require("../DB")
const assert = require("chai").assert

describe("db", () => {
    
    let db = null;
    
    before(function() { db = new DB() })
  
    describe("insert()", () => {
        
        it("should not insert invalid document into database", () => {
            db.insert("hello, world")
        })
    
        it("should insert validated document into database", () => {
            db.insert("https://www.google.com")
        })
        
        it("should insert validated document into database", () => {
            db.insert("http://www.google.com")
        })
        
        it("should return true if valid document inserted into database", () => {
            let output = db.insert("http://www.brett.com")
            assert.isNotNull(output)
        })
    })
    
    describe("getShortUrlCode()", () => {
        
        it("should return null if url does not exist in the database", () => {
            db.getShortUrlCode("https://www.notindatabse.com", (doc) => {
                assert.isNull(doc)
            })
        })
        
        it("should return short_url_code if url exists in the database", () => {
            let output = db.insert("http://www.brett.com")
            assert.isNotNull(output)
            
            db.getShortUrlCode("http://www.brett.com", (doc) => {
               assert.strictEqual(doc, 1234)
            })
        })
    })
})
