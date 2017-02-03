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
            assert.strictEqual(output, true)
        })
    })
    
    describe("getShortUrlCode()", () => {
        
        it("should return document if existing in the database", () => {
            db.insert("http://www.brett.com")
            let output = db.getShortUrlCode("http://www.brett.com")
            assert.strictEqual(output, 1234)
        })
    })
})
