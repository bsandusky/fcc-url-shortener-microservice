'use strict'
const validate = require("../inputValidation")
const assert = require("chai").assert

describe("inputValidation", () => {
  
  describe("validate()", () => {
    
    it("should take in a string", () => {
      validate("hello, world")
    })
    
    it("should return false if string is not a url_string", () => {
      let output = validate("hello, world")
      assert.isFalse(output)
    })
    
    it("should return false if string is not a url_numbers", () => {
      let output = validate("123456789")
      assert.isFalse(output)
    })
    
    it("should return true if string is valid url_https", () => {
      let output = validate("https://www.google.com")
      assert.isTrue(output)
    })
    
    it("should return true if string is valid url_http", () => {
      let output = validate("http://www.google.com")
      assert.isTrue(output)
    })
    
    it("should return true if string is valid url_/search", () => {
      let output = validate("https://www.google.com/search")
      assert.isTrue(output)
    })
    
    it("should return true if string is valid url_subdomain", () => {
      let output = validate("https://search.google.com")
      assert.isTrue(output)
    })
    
    it("should return true if string is valid url_ip", () => {
      let output = validate("127.0.0.1:8080")
      assert.isTrue(output)
    })
  })
})
