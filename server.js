// Require Express.js
//const http = require('http')
//const {application} = require('express');
const express = require('express');
const app = express();
const args = require('minimist')(process.argv.slice(2))
args['port']
const HTTP_PORT = args.port ? args.port : 5000;

// var PORT1 = 5000
// if(args.PORT1 != null ){
    
//     PORT1 = args.PORT1 || process.env.PORT
    
// }

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage);
    // res.status(200).end('OK')
    // res.type('text/plain')
});

// app.get('/app/flip/', (req, res) => {
//     res.status(200).json({'flip' : coinFlip()});
//     res.writeHead(res.statusCode, {'Content-Type' : 'application/json'});
// });

app.get('app/flip/', (req,res) => {
    const flip = coinFlip();
    res.statusCode = 200;
    res.json({"flip" : flip});
});

// app.get('app/flip/', (req,res) => {
//     res.statusCode(200).json({"flip" : coinFlip()});
// })

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number);
    const summary = countFlips(flips);
    res.statusCode = 200;
    res.json({"raw" : flips, "summary" : summary});
   //res.statusCode(200).json({"raw": flips, "summary": summary});
});

app.get('/app/flip/call/:call', (req,res) => {
    const result = flipACoin(req.params.call);

    // var heads1 = flipACoin("heads");
    res.statusCode = 200;
    res.json(result);
});

// app.get('/app/flip/call/heads', (req,res) => {
//     var heads = flipACoin("heads");
//     res.statusCode(200).json(heads);
// });

// app.get('/app/flip/call/tails', (req,res) => {
//     var tails = flipACoin("tails");
//     res.statusCode(200).json(tails);
// });

// Default response for any other request
app.use(function(req, res){
    res.status(404).end('Endpoint does not exist');
    res.type("text/plain");
});

/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

 function coinFlip() {

    // let flip = Math.random();
    // // var outcome = "";
    // if (flip > 0.5) {
    //   // outcome =  "heads";
    //   return "heads";
    // }
    // else {
    //   // outcome = "tails";
    //   return "tails";
    // }
    // // return outcome;
    random = Math.random * 2;
    return random >=1 ? "heads" : "tails";
    //return (Math.random() < 0.5 ? 'heads' : 'tails');  
  }
  
  //console.log(coinFlip))
  
  /** Multiple coin flips
   * 
   * Write a function that accepts one parameter (number of flips) and returns an array of 
   * resulting "heads" or "tails".
   * 
   * @param {number} flips 
   * @returns {string[]} results
   * 
   * example: coinFlips(10)
   * returns:
   *  [
        'heads', 'heads',
        'heads', 'tails',
        'heads', 'tails',
        'tails', 'heads',
        'tails', 'heads'
      ]
   */
  
  function coinFlips(flips) {
  
    const flipArray = [];
  
    for(var x = 0; x < flips; x++) {
    //   let flip1 = Math.random();
    //   if(flip1 < 0.5){
    //     flipArray[x] = "heads"
    //   } else {
    //     flipArray[x] = "tails"
    //   } 
    // }
    // return flipArray
      flipArray[x] = coinFlip();
    }
  
    return flipArray;
  
  }
  
  /** Count multiple flips
   * 
   * Write a function that accepts an array consisting of "heads" or "tails" 
   * (e.g. the results of your `coinFlips()` function) and counts each, returning 
   * an object containing the number of each.
   * 
   * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
   * { tails: 5, heads: 5 }
   * 
   * @param {string[]} array 
   * @returns {{ heads: number, tails: number }}
   */
  
  function countFlips(array) {
  
    // var headCount = 0; 
    // var tailCount = 0;
  
    // for(var x = 0; x < array.length; x++) {
    //   if(array[x] == "tails"){
    //     tailCount ++;
    //   } else {
    //     headCount ++;
    //   }
    // }
    // return {
    //   "heads": headCount,
    //   "tails": tailCount
    // }

    let heads = 0;
    let tails = 0;

    for(var x = 0; x < array.length; x++){
        array[x] == "heads" ? heads++ : tails++
    }
    if(tails == 0) {
        return {
            heads : heads
        };
    } else if(heads == 0) {
        return {
            tails : tails
        };
    } else {
        return {
            heads: heads, tails: tails
        };
    }
  }
  
  /** Flip a coin!
   * 
   * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
   * 
   * @param {string} call 
   * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
   * 
   * example: flipACoin('tails')
   * returns: { call: 'tails', flip: 'heads', result: 'lose' }
   */
  
  function flipACoin(call) {
  
    // var results = coinFlip();
    // if(results == call) {
    //   return{ call:call, flip: results, results : "win"}
    // }
    // else {
    //   return{call:call, flip:results, results:"lose"}
    // };

    let results = {call: call, flip: "", result: ""};
    results.flip = coinFlip();
    results.result = results.flip === call ? "win" : "lose";
    return results; 
  }

