const router = require('express').Router();
const colors = require('colors');
const dbLocate = require('./location-model.js');

router.get('/', async (req, res) => {
    try {
        const all = await dbLocate.find();
        res.status(200).json(all);
    } catch (error) {
        console.log(error .bgRed);
        res.status(500).json({
            message: 'sever error',
            error
        })
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const found = await dbLocate.findById(id);
        if (!found) {
            res.status(400).json({
                message: 'Location with that id could not be found or does not exist :('
            })
        } else {
            res.status(200).json(found);
        }
    } catch (error) {
        console.log(error .bgRed);
        res.status(500).json({
            message: 'sever error',
            error
        })
    }
})

module.exports = router;