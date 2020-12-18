module.exports = {
    validateLoginBody,
    giveRoleId
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