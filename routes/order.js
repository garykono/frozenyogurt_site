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
 * @api {get} /order Request to get all Order entries in the DB
 * @apiName GetOrder
 * @apiGroup Order
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://davisrm-tcss460-w21.herokuapp.com/order
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (400: JSON Error) {String} message "Invalid MemberID"
 * @apiError (403: JSON Error) {String} message err.detail when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {

    const theQuery = 
        `SELECT OrderID, OrderHistoryOrder, Name
         FROM Orders
         WHERE MemberID=$1`
    let values = [request.decoded.memberid]

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
            //console.log(err.details)
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
 * @api {post} /order Add an order to the orders table
 * @apiName AddOrder
 * @apiGroup Order
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Body-Example:
 *  {
 *      "orderhistoryorders":"{"bool":["f", "t", "f", "t", "f", "f", "t", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "f", "t", "t"]}",
 *      "name":"Test Special"
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
    if(isProvided(request.body.orderhistoryorders) && isProvided(request.body.name)) {
        next();
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }
}, (request, response, next) => {
    var boolArr = JSON.parse(request.body.orderhistoryorders)["bool"];
    if (boolArr.length == 29 && boolArr.map(elem => elem == "t" || elem == "f").reduce((acum, bool) => acum && bool, true)) {
        next();
    } else {
        //If this point is reached, then an invalid color was given
        response.status(400).send({
            message: "Invalid parameters"
        })
        return;
    }
}, (request, response) => {
    const theQuery = 
                `INSERT INTO Orders(MemberID, OrderHistoryOrder, Name) 
                 VALUES ($1, $2, $3) RETURNING OrderID`
    const values = [request.decoded.memberid, request.body.orderhistoryorders, request.body.name]

    pool.query(theQuery, values)
        .then(result => {
            response.status(201).send({
                body: result.rows[0].orderid,
                success: true,
                message: "Order added"
            })
        })
        .catch((error) => {
            //log the error
            //console.log(error.stack)
            response.status(400).send({
                message: error.detail
            })
        })
        return;
})

/**
 * @api {delete} /demosql/:name Request to remove entry in the DB for name
 * @apiName DeleteOrder
 * @apiGroup Order
 * 
 * @apiParam {String} name the name entry  to delete
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/demosql/charles
 * 
 * @apiSuccess {boolean} success true when the name is delete
 * @apiSuccess {String} message The string "Deleted: " followed by the value of the input parameter `orderid`
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "Deleted: "
 *     }
 * 
 * @apiError (404: Name Not Found) {String} message "Name not found"
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiError (400: SQL Error) {String} message the reported SQL error details
 * 
 * @apiUse JSONError
 */ 
router.delete("/:orderid?", (request, response) => {

    if (isProvided(request.params.orderid)) {
        const theQuery = "DELETE FROM Orders WHERE orderid = $1 RETURNING *"
        const values = [request.params.orderid]

        pool.query(theQuery, values)
            .then(result => {
                if (result.rowCount == 1) {
                    response.send({
                        success: true,
                        message: "Deleted: " + request.params.orderid
                    })
                } else {
                    response.status(404).send({
                        message: "Name not found"
                    })
                }
            })
            .catch(err => {
                //log the error
                // console.log(err)
                response.status(400).send({
                    message: err.detail
                })
            }) 
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    } 
})

module.exports = router