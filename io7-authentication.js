const http = require('http');
const https = require('https');
const fs = require('fs');
const RED = require("node-red/lib/red.js");

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    ca : fs.readFileSync('/data/certs/ca.pem')
}

module.exports = function init(cfg) {

    return {
        type: "credentials",

        users: async function (username) {
            return { username, permissions: "*" };
        },

        authenticate: function (username, password) {
            const data = `{"email": "${username}", "password": "${password}"}`;
            let url = new URL(cfg.AUTH_SERVER);
            let client = url.protocol === 'https:' ? https : http;
            return new Promise(async function (resolve) {
                const req = client.request(cfg.AUTH_SERVER, options, (res) => {
                    if (res.statusCode === 200) {
                        RED.log.info(`admin ${username} login succeeded`);
                        resolve({ username, permissions: "*" });
                    } else {
                        RED.log.error('adminAuth Response: ' + res.statusCode);
                        resolve(null);
                    }
                    //res.setEncoding('utf8');
                    //res.on('data', function (chunk) {
                    //        console.log('Response: ' + chunk);
                    //});
                });
                req.end(data);
                req.on('error', function (err) {
                    console.log('Error: ' + err);
                });
            });
        },
    }
}