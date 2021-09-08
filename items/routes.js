const express = require('express');

const router = express.Router();

const controller = require("./controller");

/**
 * GET       /
 * GET       /items
 * GET       /items/:id
 * POST      /items       body{}
 * PUT       /items/:id   body{}
 * DELETE    /items/:id
 */

// make sure everything is working correctly
router.get('/', function(req, res){
    res.json('This is working');
})

// GET /items
router.get('/items', controller.getAllItems);

// GET /item/:id
router.get('/items/:id', controller.getItemById);

// POST /items body{label(required), extra attributes are stored with the item}
router.post('/items', controller.createItem);

// PUT /items/:id body {}
router.put("/items/:id", controller.updateItem);

// DELETE /items/:id
router.delete("/items/:id", controller.deleteItemById);

module.exports = router;