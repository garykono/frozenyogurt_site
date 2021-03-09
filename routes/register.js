//express is the framework we're going to use to handle requests
const express = require('express')

//We use this create the SHA256 hash
const crypto = require("crypto")

//Access the connection to Heroku Database
const pool = require('../utilities/exports').pool

const getHash = require('../utilities/exports').getHash

const isProvided = require('../utilities/exports').helpers.isProvided
const { request } = require('express')

const router = express.Router()

/**
 * @api {post} /auth Request to register a user
 * @apiName PostAuth
 * @apiGroup Auth
 * 
 * @apiParam {String} email a users email *unique
 * @apiParam {String} password a users password
 * @apiParam {String} username a users username used only for display purposes
 * @apiParam {String} phone a users phone number
 * 
 * @apiParamExample {json} Request-Body-Example:
 *  {
 *      "email":"cfb3@fake.email",
 *      "password":"test12345"
 *      "username": "test",
 *      "phone":"1234567890"
 *  }
 * 
 * @apiSuccess (Success 201) {boolean} success true when the name is inserted
 * @apiSuccess (Success 201) {String} email the email of the user inserted 
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiError (400: Email exists) {String} message "Email exists"
 * 
 * @apiError (400: Invalid parameters) {String} message "Invalid parameters"
 * 
 */ 
router.post('/', (request, response, next) => {
    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(isProvided(request.body.email) && isProvided(request.body.username) && isProvided(request.body.password) && isProvided(request.body.phone)) {
        next();
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
}, (request, response, next) => {
    if(validateFields(request.body.email, request.body.username, request.body.password, request.body.phone)) {
        next();
    } else {
        response.status(400).send({
            message: "Invalid parameters"
        })
    }
}, (request, response) => {
        //Retrieve data from query params
        const email = request.body.email
        const username = request.body.username
        const password = request.body.password
        const phone = request.body.phone

        //We're storing salted hashes to make our application more secure
        //If you're interested as to what that is, and why we should use it
        //watch this youtube video: https://www.youtube.com/watch?v=8ZtInClXe1Q
        let salt = crypto.randomBytes(32).toString("hex")
        let salted_hash_pass = getHash(password, salt)
        let salted_hash_phone = getHash(phone, salt)
        
        //We're using placeholders ($1, $2, $3) in the SQL query string to avoid SQL Injection
        //If you want to read more: https://stackoverflow.com/a/8265319
        let theQuery = "INSERT INTO MEMBERS(Email, Username, Password, Phone, Salt) VALUES ($1, $2, $3, $4, $5) RETURNING Email"
        let values = [email, username, salted_hash_pass, salted_hash_phone, salt]
        pool.query(theQuery, values)
            .then(result => {
                //We successfully added the user!
                response.status(201).send({
                    success: true,
                    email: result.rows[0].email
                })
            })
            .catch((error) => {
                //log the error
                // console.log(error)
                if (error.constraint == "members_email_key") {
                    response.status(400).send({
                        message: "Email exists"
                    })
                } else {
                    response.status(400).send({
                        message: error.detail
                    })
                }
            })
})

router.get('/hash_demo', (request, response) => {
    let password = 'hello12345'

    let salt = crypto.randomBytes(32).toString("hex")
    let salted_hash = getHash(password, salt)
    let unsalted_hash = getHash(password)

    response.status(200).send({
        'salt': salt,
        'salted_hash': salted_hash,
        'unsalted_hash': unsalted_hash
    })
})

/**
 * Helper functions for verification
 * @param {*} email 
 * @param {*} username
 * @param {*} password 
 * @param {*} phone 
 */
function validateFields(email, username, password, phone) {
    if(!validateEmail(email)) {
        return false;
    }
    if(username.length < 4 || username.length > 16) {
        return false;
    }
    if(password.length < 4 || password.length > 16) {
        return false;
    }
    if(!containsLetter(password) || !containsNumber(password)) {
        return false;
    }
    if(phone.length != 10) {
        return false;
    }
    if(!onlyContainsNumbers(phone)) {
        return false;
    }

    return true;
}

function containsNumber(myString) {
    return /\d/.test(myString);
}
function containsLetter(myString) {
    return /[a-zA-Z]/g.test(myString);
}
function onlyContainsNumbers(myString) {
    return /^\d+$/.test(myString);
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


module.exports = router