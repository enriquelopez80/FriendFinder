//Load data
//Source holds array of information on friends

let friendsData = require("../app/data/friends");

//Routing

module.exports = function (app) {

    // This will be used to display a JSON of all possible friends.    

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });


    //This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

    app.post("/api/friends", function (req, res) {

        //console.log(req.body.scores)

        let person = req.body

        let numArray = []

        person.scores.forEach(function (score) {
            numArray.push(score * 1);
        })

        //console.log (numArray)

        person.scores = numArray;

        //Array holding differences
        allDifferences = []

        friendsData.forEach(function (friend) {

            totalDiff = 0

            for (let i = 0; i < friend.scores.length; i++) {
                totalDiff += Math.abs(friend.scores[i] - person.scores[i])
            }
            //console.log(totalDiff)

            allDifferences.push(totalDiff)
        })

        //console.log(allDifferences)

        let finalNumber = 100;
        let finalIndex = 0;

        allDifferences.forEach(function (number, index) {
            if (number <= finalNumber) {
                finalNumber = number;
                finalIndex = index;
            }
        });

        let match = friendsData[finalIndex]

        friendsData.push(person)

        res.json(match)

    });


};