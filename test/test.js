'use strict'
const assert = require("chai").assert

let foo = "bar"

describe("Test", () => {
  
  describe("foo", () => {
    
    it("should be a string", () => {
        assert.isString(foo)
    })
  })
})
