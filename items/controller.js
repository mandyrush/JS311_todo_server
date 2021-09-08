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

// return the basic info for all the items
let getAllItems = function(req, res){
    console.log('GET /items');
    // use .map() hof
    // to convert every item in the db array
    // to a simpler copy that only has the id, label and done
    // return simplified array
    let simpleArray = db.map(task => {
        return {
            id: task.id,
            label: task.label,
            done: task.done
        }
    })
    res.json(simpleArray);
}

// return the entire item matching the id
let getItemById = function(req, res){
    console.log('GET /items/:id', req.params);

    let id = parseInt(req.params.id);

    // Get one of the objects from the array and return it
    let foundItem = db.find(item => item.id === id);

    res.json(foundItem);
}

// label is required
// if id is sent we will replace it
// if any other attribute is sent we will accept it as additional info
// if done is sent as true, we will accept it, otherwise we will set it to false
let createItem = function(req, res){
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
}

// if an id is included in the body, replace it with the id that is passed in on 
// the path param
// this should update an existing item from our DB
let updateItem = function(req, res){
    console.log('PUT /items/:id', req.params, req.body);

    let dataIn = req.body;
    let id = req.params.id;
    
    // Find item to update
    let foundItem = db.find(task => task.id == id);

    // if they sent an id override it
    dataIn.id = id;

    // If they didn't send a label, don't update it
    if(!dataIn.label) {
        dataIn.label = foundItem.label;
    }

    // If they didn't send a due date, but one already exists,
    // use the current due date
    if(!dataIn.dueDate && foundItem.dueDate) {
        dataIn.dueDate = foundItem.dueDate;
    }

    // Not using strict equals so strings aren't counted as true
    // If sending anything other than true mark the item as not done
    if(dataIn.done != true) {
        dataIn.done = false;
    }

    // If they didn't send a priority, but one already exists,
    // use the current priority
    if(!dataIn.priority && foundItem.priority) {
        dataIn.priority = foundItem.priority;
    }

    console.log("Data In: ", dataIn);

    // update item in db array
    let itemIndex = db.findIndex(task => task.id = id);
    db.splice(itemIndex, 1, dataIn);

    res.sendStatus(204);
}

// find the item with the id in the db, and remove it
let deleteItemById = function(req, res){
    console.log('DELETE /items/:id', req.params.id);

    let id = req.params.id;

    let itemIndex = db.findIndex(task => task.id == id);
    db.splice(itemIndex, 1);

    res.sendStatus(204);
}

module.exports = {
    getAllItems,
    getItemById,
    deleteItemById,
    updateItem,
    createItem
}