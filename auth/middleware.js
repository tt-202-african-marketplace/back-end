const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets.js');

module.exports = {
    validateLoginBody,
    giveRoleId,
    restricted
}

/* 
giveRoleId(): 
FOR REGISTRATION, gives role id to new user depending on param in registration url ('/shopper' or '/owner') and inserts this property into the request body 
*/
function giveRoleId(req, res, next) {
    const { role } = req.params;
    switch(role) {
        case 'shopper':
            req.body.role_id = 1;
            break;
        case 'owner':
            req.body.role_id = 2;
            break;
        default:
            res.status(400).json({
                message: 'invalid role'
            })
    }
    next();
}

/* 
validateLoginBody()
FOR LOGIN, checks that request body has email and password as properties.
*/
function validateLoginBody(req, res, next) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            message: 'please provide email and password!'
        })
    } else {
        next();
    }
}

function restricted(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
  
    console.log(req.headers)
    if (token) {
      jwt.verify(token, secrets.jwt_secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({
            message: 'token invalid',
          })
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      })
    } else {
      res.status(401).json({
        message: 'token required'
      })
    };
}