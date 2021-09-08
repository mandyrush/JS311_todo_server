const express = require("express");

const router = express.Router();

router.get('/users',  function(req, res){
    res.json("user list goes here");
})

router.put("/users/:id", function(req, res){
    res.json("update the user and return it here");
})

module.exports = router;