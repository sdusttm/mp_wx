// Load the core build.
var _ = require('lodash/core');
var sha1 = require('sha1');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const TOKEN = "Tm0112358"

    context.log(req.method);
    context.log("req: " + JSON.stringify(req));

    if (req.method === "GET" && req.query.timestamp && req.query.nonce && req.query.signature) {
        let arr = [TOKEN, req.query.timestamp, req.query.nonce];
        arr.sort();
        let arrStr = arr.join("");
        context.log("arrStr: " + arrStr);
        let encrypted = sha1(arrStr); 
        if (encrypted === req.query.signature) {
            context.log("echostr: " + req.query.echostr);            
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: req.query.echostr,
                headers: {
                    'Content-Type': 'text/xml'
                }, 
                isRaw: true
            }
        } else {
            context.res = {
                status: 401,
                body: ("en: " + encrypted + "   " + "ori: " + req.query.signature)
            }
        };
        
    } else {
        context.res = {
            status: 400,
            body: "something is wrong: " + JSON.stringify(req.query)
        };
    }
    context.done();
};

