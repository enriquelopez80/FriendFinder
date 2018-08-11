//Dependencies

const path = require("path");

//HTML Get Requests

module.exports = function (app) {

    //User is shown survey HTML page
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    //Default to home
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

};