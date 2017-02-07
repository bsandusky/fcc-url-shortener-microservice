'use strict'

const generateURLCode = () => {
     // Generates random four digit number for link
    let num = Math.floor(100000 + Math.random() * 900000);
    return num.toString().substring(0, 4);
}

module.exports = generateURLCode