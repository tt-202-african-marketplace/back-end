const router = require('express').Router();
const colors = require('colors');

const dbAuth = require('../auth/auth-model.js');


router.get('', async (req, res) => {
    try {
        const all_users = await dbAuth.find();
        res.status(200).json(all_users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'sever error',
            error
        })
    }
})

router.post('/register/:role', giveRollId, async (req, res) => {
    const new_user = req.body;

    if (!new_user.email || !new_user.password || !new_user.first_name || !new_user.last_name || !new_user.role_id) {
        res.status(401).json({
            message: 'Please check that all fields are not empty!'
        });
    } else {
        try {
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


//middleware
function giveRollId(req, res, next) {
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



module.exports = router;