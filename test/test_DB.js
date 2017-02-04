'use strict'
const DB = require("../DB")
const assert = require("chai").assert

describe("db", () => {
    
    let db = null;
    
    before(() => { db = new DB() })
  
    describe("insert()", () => {
        
        it("should return null when insert invalid document into database", () => {
            let output = db.insert("hello, world")
            assert.isNull(output)
        })
    
        it("should insert validated document into database", () => {
            let output = db.insert("https://www.google.com")
            assert.isNotNull(output)
        })
        
        it("should insert validated document into database", () => {
            let output = db.insert("http://www.google.com")
            assert.isNotNull(output)
        })
        
        it("should return true if valid document inserted into database", () => {
            let output = db.insert("http://www.brett.com")
            assert.isNotNull(output)
        })
    })
    
    describe("getShortUrlCode()", () => {
        
        it("should return null if url does not exist in the database", () => {
            db.getShortUrlCode("https://www.notindatabse.com", (result) => {
                assert.isNull(result)
            })
        })
        
        it("should return short_url_code if url exists in the database", () => {
            db.insert("https://www.brett.com")
            
            db.getShortUrlCode("https://www.brett.com", (result) => {
               assert.strictEqual(result, 1234)
            })
        })
    })
})
