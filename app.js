const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("GetCurrentYear", () => {
    return new Date().getFullYear();
});
hbs.registerHelper("ScreamIt", (text) => {
    return text.toUpperCase();
});

app.set("view engine", "hbs");


app.use((req, res, next) => {
    var log = `${new Date().toString()}: ${req.method}, ${req.url}`;
    fs.appendFile("server.log", log + '\n', (err) => {
        if (err)
            console.log("Unable to append to log file");
    });
    console.log(log);
    next();
});

app.use((req, res, next) => {
    res.render("maintenance.hbs",{
        pageTitle:"Maintenance"
    });
});

app.use(express.static(__dirname + "/public"));

app.listen(3000, () => {
    console.log("server up on port 3000");
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        owner: "Osama",
        pageTitle: "About Page"
    });
});
app.get("/", (req, res) => {
    res.render("home.hbs", {
        owner: "Osama",
        pageTitle: "Home Page",
        welcomeMessage: "Welcome! HANDLEBARS!!!"
    });
});