'use strict'
const express = require("express")
const DB = require("./DB")
const validate = require("./inputValidation")
const generateURLCode = require("./generateURLCode")
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/:input', (req, res) => {
    
    const db = new DB()
    db.getRecordByCode(req.params.input, (result) => {
        
        if (result) {
            res.redirect(result.original_url)
        } else {
            res.send({error: "short_url_code not found in database"})
        }
    })
})

app.get('/new/*', (req, res) => {
    
    if (!validate(req.params[0])) {
        res.send({error: "not a valid url input"})

    } else {
        const db = new DB()
        
        db.getRecordByUrl(req.params[0], (result) => {
            
            if (result) {
                res.send({record_found: "duplicate record", urlInfo: result})
        
            } else {
                let urlObj = {original_url: req.params[0], short_url_code: generateURLCode()}
                db.insert(urlObj)
                res.send({success: "entry completed", urlInfo: urlObj})
            }
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server running on " + process.env.IP + ":" + process.env.PORT)
})