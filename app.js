'use strict'
const express = require("express")
const DB = require("./DB")
const validate = require("./inputValidation")
const generateURLCode = require("./generateURLCode")
const app = express()

app.get('/', (req, res) => {
    res.send("Hello, world")
})

app.get('/new/:input', (req, res) => {
    
    if (!validate(req.params.input)) {
        res.send({error: "Not a valid url input"})
    } else {
        const db = new DB()
        let urlObj = {original_url: req.params.input, short_url_code: generateURLCode()}
        db.insert(urlObj)
        res.send({success: "Database entry completed", urlInfo: urlObj})
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server running on " + process.env.IP + ":" + process.env.PORT)
})