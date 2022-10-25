//We are importing filesystem in order to edit and read taskData.json file
const fs = require("fs");
const express = require("express");
//UUID package was installed to assign a unique id to each task for saving and deleting data
const { v1: uuid } = require("uuid");
// app = express initializes the framework
const app = express();
//port where server is running
const PORT = process.env.PORT || 3000;

app.use(express.json());
//express static is a middleware function for serving static files
app.use(express.static(__dirname + "/public"));

//Get route - requests data from the server
app.get("/getItems", (req, res) => {
  //readfile is async
  fs.readFile(__dirname + "/taskData.json", (err, data) => {
    console.log(JSON.parse(data).items);
    //The res.status functions basically sets the http status for the response
    //200 means the request is fufilled.
    res.status(200).json(JSON.parse(data).items);
  });
});

//Post route - used to send data to a server
app.post("/saveItem", (req, res) => {
  fs.readFile(__dirname + "/taskData.json", (err, data) => {
    //const id assigns a unique id for each task created
    const id = uuid();
    console.log(id);

    const taskData = JSON.parse(data);
    // The req.body object allows us to access data in a JSON object
    req.body.id = id;
    taskData.items[taskData.items.length] = req.body;
    //writeFileSync rewrites the file
    fs.writeFileSync(__dirname + "/taskData.json", JSON.stringify(taskData));
    res.status(200).json({ message: "New item Saved", id: id });
  });
});

//DELETE Route - deletes a resource from the server
app.delete("/deleteItem/:id", (req, res) => {
  fs.readFile(__dirname + "/taskData.json", (err, data) => {
    const taskData = JSON.parse(data);
    taskData.items.forEach((item, index) => {
      //checking if an item has an id equal to an id from the parameters
      if (item.id === req.params.id) {
        //splice allows 1 item to be removed
        taskData.items.splice(index, 1);
      }
    });
    fs.writeFileSync(__dirname + "/taskData.json", JSON.stringify(taskData));
    res.status(200).json({ message: "task deleted" });
  });
});
//Patch method - makes partial update (task completed)
app.patch("/updateItem/:id", (req, res) => {
  fs.readFile(__dirname + "/taskData.json", (err, data) => {
    const taskData = JSON.parse(data);
    taskData.items.forEach((item) => {
      if (item.id === req.params.id) {
        item[req.body.prop] = req.body.value;
      }
    });
    fs.writeFileSync(__dirname + "/taskData.json", JSON.stringify(taskData));
    res.status(200).json({ message: "task updated" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost ${PORT}`);
});
