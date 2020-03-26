const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us19.api.mailchimp.com/3.0/lists/f68ea8e76e";

  const options = {
    method: "POST",
    auth: "drigzzy:9ffd741d5a374f5bad3d49beecfb25ee-us19"
  };

  const request = https.request(url, options, function(response) {


    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

  });

  request.write(jsonData);
  request.end();

});


app.post("/failure" , function(req ,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000");
})


// 9ffd741d5a374f5bad3d49beecfb25ee-us19

// f68ea8e76e
