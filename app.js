'use strict'
const express = require("express")
const DB = require("./DB")
const validate = require("./inputValidation")
const generateURLCode = require("./generateURLCode")
const app = express()

app.use((req, res, next) => {
    
    if (!process.env.APP_URL) {
        process.env.APP_URL = "https://fcc-api-projects-bsandusky.c9users.io/"
    }
    next()
})

app.get('/', (req, res) => {
    res.send("Hello, world")
})

app.get('/:input', (req, res) => {
    res.send(req.params.input)
})

app.get('/new/*', (req, res) => {
    
    if (!validate(req.params[0])) {
        res.send({error: "Not a valid url input"})

    } else {
        const db = new DB()
        
        db.getRecordByUrl(req.params[0], (result) => {
            
            if (result) {
                res.send({error: "Duplicate record", urlInfo: result})
        
            } else {
                let urlObj = {original_url: req.params[0], short_url_code: generateURLCode()}
                db.insert(urlObj)
                res.send({success: "Entry completed", urlInfo: urlObj})
            }
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server running on " + process.env.IP + ":" + process.env.PORT)
})