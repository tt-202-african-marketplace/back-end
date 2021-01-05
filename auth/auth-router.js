const router = require('express').Router();
const colors = require('colors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('./secrets.js');
const dbAuth = require('../auth/auth-model.js');
const { validateLoginBody, giveRoleId, restricted } = require('./middleware.js');

router.get('', restricted, async (req, res) => {
    try {
        const all_users = await dbAuth.find();
        res.status(200).json(all_users);
    } catch (error) {
        console.log(error .bgRed);
        res.status(500).json({
            message: 'sever error',
            error
        })
    }
})

router.post('/register/:role', giveRoleId, async (req, res) => {
    const new_user = req.body;
    if (!new_user.email || !new_user.password || !new_user.first_name || !new_user.last_name || !new_user.role_id || !new_user.shop_name || !new_user.location_id) {
        res.status(401).json({
            message: 'Please check that all fields are not empty!',
        });
    } else {
        try {
            const hash = bcrypt.hashSync(new_user.password, 10);
            new_user.password = hash;
            const registration = await dbAuth.register(new_user);
            console.log(`registered new user!` .bgMagenta);
            res.status(201).json(registration);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'server error - registration'
            })
        }
    }
    
})
// -------------------- //
// POST /login 
// -------------------- //
/* 
 request :
    {
        email: samsam3@email.com,
        password: 1234
    }

response: 
    {
        message: 'Welcome, Sam',
        role: 1
    }
*/
router.post('/login', validateLoginBody, async (req, res) => {
    const {email, password} = req.body;
    try {    
        const found_user = await dbAuth.findByEmail(email);
        if (found_user && bcrypt.compareSync(password, found_user.password)) {
            const token = await jwtGenerator(found_user);
            res.status(200).json({
                message: `Welcome, ${found_user.first_name}`,
                role: found_user.role_id,
                token,
            })
        } else {
        res.status(401).json({
            message: 'invalid credentials'
        }) 
        }
    } catch (error) {
        console.log(error .bgRed);
        res.status(500).json({
            message: 'server error - login',
            error,
        });
    }
})


// -------------------- //
// WEB TOKEN GEN
// -------------------- //
function jwtGenerator(user) {
    const payload = {
      subject: user.id,
      first_name: user.first_name,
      role: user.role_id
    }
    const secret = secrets.jwt_secret;
    const options = {
      expiresIn: 60
    };
  
    return jwt.sign(payload, secret, options);
  } 



module.exports = router;