const router = require('express').Router();
const colors = require('colors');
const dbProducts = require('./products-model.js');
const dbLocate = require('../location/location-model.js')

router.get('', async (req, res) => {
    try {
        const all_products = await dbProducts.find();
        res.status(200).json(all_products);
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
        const found_product = await dbProducts.findById(id);
        if (!found_product) {
            res.status(400).json({
                message: 'Product with that id could not be found :('
            })
        } else {
            res.status(200).json(found_product);
        }
    } catch (error) {
        console.log(error .bgRed);
        res.status(500).json({
            message: 'sever error',
            error
        })
    }
})

router.get('/categories/all', async(req, res) => {
    try {
        const all_categories = await dbProducts.findCat();
        res.status(200).json(all_categories);
    } catch (error) {
        console.log(error .bgRed);
        res.status(500).json({
            message: 'sever error',
            error
        })
    }
})

router.get('/categories/:categoryid', async (req, res) => {
    const {categoryid} = req.params
    try {
        const found_products = await dbProducts.findByCat(categoryid);
        if (found_products.length === 0) {
            res.status(400).json({
                message: 'Sorry, that category does not exist or there are no products under that caregory listed yet.'
            })
        } else {
            res.status(200).json(found_products);
        }
    } catch (error) {
        console.log(error .bgRed);
        res.status(500).json({
            message: 'sever error',
            error
        })
    }
})

// - - - - - - - - - - - - - - - - - - - - //
// GET /user/id
// returns array of products by user_id
// - - - - - - - - - - - - - - - - - - - - //
router.get('/user/:id', async (req, res) => {
    const {id} = req.params
    try {
        const found_products = await dbProducts.findByUser(id);
        if (found_products.length === 0) {
            res.status(400).json({
                message: 'Sorry, that user does not exist or has no products to sell yet.'
            })
        } else {
            res.status(200).json(found_products);
        }
    } catch (error) {
        console.log(error .bgRed);
        res.status(500).json({
            message: 'sever error',
            error
        })
    }
})


router.get('/locations/:id', async (req, res) => {
    const {id} = req.params
    try {
        const found_products = await dbProducts.findByLocation(id);
        if (found_products.length === 0) {
            res.status(400).json({
                message: 'Sorry, that location has no products to sell yet.'
            })
        } else {
            res.status(200).json(found_products);
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