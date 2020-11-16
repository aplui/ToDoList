const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const mongoose = require('mongoose');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});

const itemsSchema = {name: String}
const Item = mongoose.model("Item", itemsSchema)
const item1 = new Item({ name: "Welcome to your ToDoList!"});
const item2 = new Item({ name: "Hit the + button to add a new item."});
const item3 = new Item({ name: "<- Hit this to delete an item."});
const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems) {
  if (foundItems.length === 0) {
    Item.insertMany(defaultItems, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Succesfully saved default items to DB!");
      }
    });
    res.redirect("/");
  } else {
    res.render("list", {
      listTitle: "Today",
      newListItems: foundItems
    });

  }

  })

  });

app.get("/work", function(req, res) {

  res.render("list", {
    listTitle: "Today",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {

  res.render("about")
})

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }
})



app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
