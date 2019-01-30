const fs = require('fs');
const crypto = require('crypto');

fs.writeFileSync( "./test.txt", crypto.randomBytes(2048).toString('base64') )