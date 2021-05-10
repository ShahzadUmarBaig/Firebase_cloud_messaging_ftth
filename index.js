const express = require("express");
var app = express();
var bodyParser = require("body-parser");
const gcm = require("node-gcm");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var port = process.env.PORT || 3000; // set our port

var sender = new gcm.Sender(
  "AAAAVLwPkVw:APA91bHanPCA7UiC6INVhzEtF6f_jtsBTyBO8Vrk7VHJRzsNDNzj21Lt1UmdtHZJtxCjbO-iTP8s2OYEXytICQddkKvfIqZU4ZP-n6EWd8Y6LMeNFPt0r4dWmqajinUJsKbBwKiNoCx-"
);

router.post("/register-device", (req, res, next) => {
  // Add your logic here to save device ids, which will
  // be used later to send notifications to.
});

app.post("/send-notification", (req, res, error) => {
  var firebaseDeviceTokens = [];
  firebaseDeviceTokens = req.body.tokens;

  sendNotificationAndroid(
    { title: req.body.title, body: req.body.body },
    firebaseDeviceTokens
  );
  res.json(firebaseDeviceTokens);
});

sendNotificationAndroid = (msg, devicesIds) => {
  const message = new gcm.Message({
    data: {
      ...msg,
    },
  });

  // this sends the notification to the device
  sender.send(
    message,
    { registrationTokens: devicesIds },
    function (err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(response);
      }
    }
  );
};

app.listen(port);
console.log("Server is live at " + port);
