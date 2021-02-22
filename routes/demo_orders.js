//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()
 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided

/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {get} /orders Request to get all Order entries in the DB
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {

    // const theQuery = 
    //     `SELECT My_Size, My_Color, Option1, Option2, Option3 
    //      FROM Orders`

    const theQuery = 
        `SELECT My_Size, My_Color, Option1, Option2, Option3 
         FROM Orders
         WHERE MemberID=$1`
    let values = [request.decoded.memberid]

    // const theQuery = 
    //     `SELECT * 
    //      FROM Orders`

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                response.send({
                    orders: result.rows
                })
            } else {
                response.status(404).send({
                    message: "No Orders"
                })
            }
        })
        .catch(err => {
            //log the error
            // console.log(err.details)
            response.status(400).send({
                message: err.detail
            })
        })
})

/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {post} /orders Add an order to the orders table
 * @apiName AddOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Body-Example:
 *  {
 *      "size":"medium",
 *      "color":"green",
 *      "option1":true,
 *      "option2":false,
 *      "option3":true
 *  }
 * 
 * @apiSuccess (Success 201) {boolean} success true when the Order is inserted
 * @apiSuccess (Success 201) {String} message "Order added"
 * 
 * @apiParamExample {json} Response-Example:
 *  HTTP/1.1 201 OK
 *     {
 *       "success": true,
 *       "message": "Order added"
 *     }
 * 
 * @apiError (400: Missing parameters) {String} message "Missing required information"
 * @apiError (400: Invalid parameters) {String} message "Invalid parameters"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.post("/", (request, response, next) => {
    if(isProvided(request.body.size) && isProvided(request.body.color) && isProvided(request.body.option1) && isProvided(request.body.option2) && isProvided(request.body.option3)) {
        next();
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
}, (request, response, next) => {
    let sizeValues;
    pool.query('SELECT enum_range(NULL::SIZE)')
    .then(result => {
        sizeValues = result.rows[0].enum_range.slice(1,-1).split(',')
        for(let size of sizeValues) {
            if(size === request.body.size) {
                next();
                return;
            }
        }
        //If this point is reached, then an invalid color was given
        response.status(400).send({
            message: "Invalid parameters"
        })
        return;
    })
    .catch(error => {
        //log the error
        console.log(error)
    })
}, (request, response, next) => {
    let colorValues;
    pool.query('SELECT enum_range(NULL::COLOR)')
    .then(result => {
        colorValues = result.rows[0].enum_range.slice(1,-1).split(',')

        for(let color of colorValues) {
            if(color === request.body.color) {
                next();
                return;
            }
        }
        //If this point is reached, then an invalid color was given
        response.status(400).send({
            message: "Invalid parameters"
        })
        return;
    })
    .catch(error => {
        //log the error
        console.log(error)
    })

}, (request, response, next) => {
    const postgresValidBooleanValues = ['TRUE', 't', 'true', 'y', 'yes', 'on','1',
                                        'FALSE', 'f', 'false', 'n', 'no', 'off', '0']
    if(postgresValidBooleanValues.includes(request.body.option1)
        && postgresValidBooleanValues.includes(request.body.option2)
        && postgresValidBooleanValues.includes(request.body.option3)) {
            next();
    } else {
        //If this point is reached, then an invalid color was given
        response.status(400).send({
            message: "Invalid parameters"
        })
        return;
    }
}, (request, response) => {
    const theQuery = "INSERT INTO Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
    const values = [request.decoded.memberid, request.body.size, request.body.color, request.body.option1, request.body.option2, request.body.option3]

    pool.query(theQuery, values)
        .then(result => {
            response.status(201).send({
                success: true,
                message: "Order added"
            })
        })
        .catch((error) => {
            //log the error
            console.log(error.stack)
            response.status(400).send({
                message: error.detail
            })
        })
        return;
})

module.exports = router