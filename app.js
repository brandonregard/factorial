/**
 * REST API Application to compute factorials
 */
const express = require('express')
const bigInt = require("big-integer"); // BigInt is not available in node 8

const app = express()
const port = 3000;

/**
 * GET /factorial/random
 * return the result of a factorial for a random integer between 1-100
 * as a json object with properties {input -> random integer, output -> result}
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
app.get('/factorial/random', (req, res) => {
    const input = bigInt.randBetween(1, 100);

    res.json({
        input: input,
        output: factorial(input)
    });
})

/**
 * GET /factorial/:n
 * return the result of a factorial for an integer passed in by a parameter
 * via the URL
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
app.get('/factorial/:n', (req, res) => {
    try {
        const input = bigInt(req.params.n);

        if(input.leq(0)) {
            throw true;
        }
        res.json({
            input: input,
            output: factorial(input)
        });
    } catch(err) {
        res.status(500).send('When not using the "random" endpoint,\
            the parameter for factorial must be an integer\
            greater than zero.');
    }
})

/**
 * compute the factorial of a given bigInt
 * use an iterative algorithm as optimized tail recursion is not
 * supported by V8
 * @param {bigInt} n - the integer to compute the factorial for
 * @returns {bigInt} calculated factorial
 */
function factorial(n) {
    let f = bigInt.one;

    for (let i = bigInt(2); i.leq(n); i = i.next()) {
        f = f.multiply(i);
    }
    return f;
}

module.exports = app.listen(port);