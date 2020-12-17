const router = require('express').Router();

router.get('', (req, res) => {
    res.send({
        message: 'login route!'
    })
})



module.exports = router;