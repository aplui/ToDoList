//vereiste packages
const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const date = require(__dirname + "/date.js");

console.log(date);

const items = [];
const workItems = [];

//configuratie van packages
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))

//de gets sturen door naar bepaalde directories binnen de website
app.get("/", function(req, res) {

  let day = date.getDate();

  //toLocaleDateString om de huidige dag te krijgen, options bepaalt hoe de text wordt uitgeschreven.
  res.render("list", {
    // kindOfDay verbindt met 2 variables in list.ejs
    listTitle: day,
    newListItems: items
  });
});
app.get("/work", function(req, res) {

  res.render("list", {
    listTitle: "Work List",
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
