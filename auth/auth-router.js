const router = require('express').Router();
const colors = require('colors');

const dbAuth = require('../auth/auth-model.js');


router.get('', (req, res) => {
    res.send({
        message: 'login route!'
    })
})

router.get('/all', async (req, res) => {
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


module.exports = router;