const path = require("path");
const express = require("express");
const app = express();
const webroot = path.join(__dirname, "dist");
const pedals = require("./api/pedals.json");

app.use(express.static(webroot));
app.listen(8080);

app.get("/api/search/:query", (req, res) => {
  let clean = {};
  let query = decodeURI(req.params.query);

  if (/^[a-z0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\_\-\? ]+$/ig.test(query) === true) {
    let results = {};
    clean.query = query;

    if (clean.query === "*") {
      results = pedals;
    } else {
      for (let pedal in pedals) {
        let pedalEntry = pedals[pedal];
        let manufacturer = pedalEntry.manufacturer.toLowerCase();
        let model = pedalEntry.manufacturer.toLowerCase();
        let type = pedalEntry.type.toLowerCase();
        let productString = `${manufacturer} ${model}`;

        if (productString.indexOf(clean.query) !== -1) {
          results[pedal] = pedalEntry;
        } else {
          if (manufacturer.indexOf(clean.query) !== -1 || manufacturer.indexOf(clean.query) !== -1 || type.indexOf(clean.query) !== -1) {
            results[pedal] = pedalEntry;
          }
        }
      }
    }

    res.set("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
  } else {
    res.status(412);
    res.send("Input invalid.");
  }
});
