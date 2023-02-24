// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  let timeStamp = new Date();

  // Format:
  // Thu, 01 Jan 1970 00:00:00 GMT
  // Formatting the utc time breaks the tests for this function

  res.json({unix : timeStamp.getTime(), "utc" : timeStamp})
})

app.get("/api/:date", function (req, res) {
  console.log("-----------------------------", req.params.date)
  let timeStamp = new Date(req.params.date);
  // if input is a number given as a string, attempt to cast
  if (timeStamp.toString() === "Invalid Date")
    timeStamp = new Date(Number(req.params.date));
  // If casting fails, return error
  if (timeStamp.toString() === "Invalid Date") 
  {
    res.json({ error : "Invalid Date"})
    return;
  }

  // Format:
  // Thu, 01 Jan 1970 00:00:00 GMT
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let weekDay = days[timeStamp.getDay()].substring(0,3);
  let month = months[timeStamp.getMonth()].substring(0,3);

  const timeFormat = (num) => {
    if (num < 10)
      return "0" + num;
    return num;
  }

  let date = timeFormat(timeStamp.getDate())
  let hour = timeFormat(timeStamp.getUTCHours());
  let minute = timeFormat(timeStamp.getMinutes());
  let second = timeFormat(timeStamp.getSeconds());

  let utcString = `${weekDay}, ${date} ${month} ${timeStamp.getFullYear()} ${hour}:${minute}:${second} GMT`

  res.json({ unix : timeStamp.getTime(), utc :  utcString });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
