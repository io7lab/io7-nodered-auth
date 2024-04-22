const http = require('http');
const RED = require("node-red/lib/red.js");

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}

module.exports = function init(cfg) {
    return {
        type: "credentials",

        users: async function (username) {
            return { username, permissions: "*" };
        },

        authenticate: function (username, password) {
            const data = `{"email": "${username}", "password": "${password}"}`;
            return new Promise(async function (resolve) {
                const req = http.request(cfg.AUTH_SERVER, options, (res) => {
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