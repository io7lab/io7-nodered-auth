# io7-nodered-auth

This is a node package that enables the NodeRED admin to authenticate against the io7 API server.


# Installation

It is included in the package.json of the io7 NodeRED by default, but if you want to configure for any reason,

1. `cd data/nodered`
2. `npm i github:io7lab/io7-nodered-auth`
3. modify the settings.js for the NodeRED to add this line
```javascript
    adminAuth: require('io7-nodered-auth/io7-authentication')({
        AUTH_SERVER: YOUR_IO7_API_SERVER
    }),
```

