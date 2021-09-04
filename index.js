// import the express module
const express = require('express');

// instantiate an application server
const app  = express();

// add support to parsing json in the body
app.use(express.json());

// define the port that this app location is listening on
const PORT = 4000;

// @todo these should be classes?

let nextId = 3;

let db = [
    {
        "id": 1,
        "label": "Task One",
        "dueDate": "Tonight",
        "done": false,
        "priority": "High"
    },
    {
        "id": 2,
        "label": "Task Two",
        "dueDate": "Tomorrow",
        "done": false,
        "priority": "Medium"
    }
];

/**
 * GET       /
 * GET       /items
 * GET       /items/:id
 * POST      /items       body{}
 * PUT       /items/:id   body{}
 * DELETE    /items/:id
 */

// make sure everything is working correctly
app.get('/', function(req, res){
    res.json('This is working');
})

// GET /items
// return the basic info for all the items
app.get('/items', function(req, res){
    console.log('GET /items');
    // use .map() hof
    // to convert every item in the db array
    // to a simpler copy that only has the id, label and done
    // return simplified array
    res.json(db);
})

// GET /item/:id
// return the entire item matching the id
app.get('/items/:id', function(req, res){
    console.log('GET /items/:id', req.params);

    let id = req.params.id;

    // Get one of the objects from the array and return it
    let foundItem = db.find(item => item.id === id);

    res.json(foundItem);
})

// POST /items body{label(required), extra attributes are stored with the item}
// label is required
// if id is sent we will replace it
// if any other attribute is sent we will accept it as additional info
// if done is sent as true, we will accept it, otherwise we will set it to false

app.post('/items', function(req, res){
    console.log('POST /items', req.body);

    let dataIn = req.body;
    let newId = nextId;
    nextId++;
    
    // if they sent an id override it
    dataIn.id = newId;

    // checks if label was provided
    if(!dataIn.label) {
        // will execute if label is falsey
        res.status(400).send("Label Required");
        return;
    }

    // Not using strict equals so strings aren't counted as true
    // If sending anything other than true mark the item as not done
    if(dataIn.done != true) {
        dataIn.done = false;
    }

    // add item to db array
    db.push(dataIn);
    res.sendStatus(204);
})

// PUT /items/:id body {}
// if an id is included in the body, replace it with the id that is passed in on 
// the path param
// this should update an existing item from our DB
app.put("items/:id", function(req, res){

})


// DELETE /items/:id
// find the item with the id in the db, and remove it
app.delete("items/:id", function(req, res){
    
})

// start the application server
app.listen(PORT, function(){
    console.log("App started, listening on port: ",  PORT);
});