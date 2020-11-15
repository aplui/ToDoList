//vereiste packages
const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const mongoose = require('mongoose');

//configuratie van packages
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB", {
      useNewUrlParser : true});

      const itemsSchema = {
        name: String
      }

      const Item = mongoose.model("Item", itemsSchema)

      const item1 = new Item({
        name: "Welcome to your ToDoList!"
      });

      const item2 = new Item({
        name: "Hit the + button to add a new item."
      });

      const item3 = new Item({
        name: "<- Hit this to delete an item."
      });

      const defaultItems = [item1, item2, item3];

      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully saved default items to DB!");
        }
      })
      //de gets sturen door naar bepaalde directories binnen de website
      app.get("/", function(req, res) {

        //toLocaleDateString om de huidige dag te krijgen, options bepaalt hoe de text wordt uitgeschreven.
        res.render("list", {
          // kindOfDay verbindt met 2 variables in list.ejs
          listTitle: day,
          newListItems: items
        });
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


      //post in de home route voor het object met de naam newItem ( de input dus )
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
