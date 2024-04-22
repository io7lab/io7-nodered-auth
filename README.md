# io7-nodered-auth

This is a node package that enables the NodeRED admin to authenticate against the io7 API server.


# Installation

It is included in the package.json of the io7 NodeRED by default, but if you want to configure for any reason,

1. `cd` into the NodeRED folder and run `npm i `
2. modify the settings.js for the NodeRED to add this line
```json
    adminAuth: require('io7-nodered-auth/io7-authentication')({
        AUTH_SERVER: YOUR_IO7_API_SERVER
    }),
```

