const http = require('http');
const https = require('https');
const fs = require('fs');
const RED = require("node-red/lib/red.js");

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}

module.exports = function init(cfg) {
    let url_string = cfg.AUTH_SERVER_URL || 'http://io7api:2009/users/login';
    let url = new URL(url_string);
    let client = http;
    const cafile = cfg.cafile || '/data/certs/ca.pem';
    if (url.protocol === 'https:') {
        client = https;
        if (fs.existsSync(cafile)) {
            options.ca = fs.readFileSync(cafile);
        }
    }

    return {
        type: "credentials",

        users: async function (username) {
            return { username, permissions: "*" };
        },

        authenticate: function (username, password) {
            const data = `{"email": "${username}", "password": "${password}"}`;
            return new Promise(async function (resolve) {
                const req = client.request(url_string, options, (res) => {
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