// hijack.js
const http = require('http');
const https = require('https');

function hijack() {
  let output = [];
  let data = override(http);
  output.push(data);
  let datas = override(https);
  output.push(datas);
  console.log('output', output);
}

function override(module) {
  let original = module.request;
  function wrapper(outgoing) {
    let req = original.apply(this, arguments);
    let emit = req.emit;
    let body = '';

    req.emit = function (eventName, response) {
      switch (eventName) {
        case 'response': {
          response.on('data', (d) => {
            // NEW: Collect data chunks
            body += d;
          });

          response.on('end', () => {
            // NEW: Complete response
            let res = {
              statusCode: response.statusCode,
              headers: response.headers,
              message: response.statusMessage,
              body,
            };
            // console.log(res);
            // array
          });
        }
      }
      return emit.apply(this, arguments);
    };

    // logger(outgoing);
    // console.log('here');
    return req;
  }

  function logger(req) {
    let log = {
      method: req.method || 'GET',
      host: req.host || req.hostname || 'localhost',
      port: req.port || '443',
      path: req.pathname || req.path || '/',
      headers: req.headers || {},
    };
    // console.log(log);
    // return log;
  }
  // console.log('the wrapper', wrapper);
  module.request = wrapper;
}

module.exports = hijack;
