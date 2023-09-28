"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    let text = req.body.text;
    let locale = req.body.locale;
    if (text == "") {
      res.json({ error: "No text to translate" });
    } else if (text == undefined) {
      res.json({ error: "Required field(s) missing" });
    } else {
      if (locale == undefined) {
        res.json({ error: "Required field(s) missing" });
      } else {
        if (!["american-to-british", "british-to-american"].includes(locale)) {
          res.json({ error: "Invalid value for locale field" });
        } else {
          if (locale == "american-to-british") {
            console.log(
              "conparing '" +
                text +
                "' andb '" +
                translator.toBritish(text, false) +
                "'"
            );
            if (translator.toBritish(text, false) == text) {
              console.log("all fine");
              res.json({
                text: text,
                translation: "Everything looks good to me!",
              });
            } else {
              res.json({
                text: text,
                translation: translator.toBritish(text, true),
              });
            }
          } else {
            if (translator.toAmerican(text, false) == text) {
              res.json("Everything looks good to me!");
            } else {
              res.json({
                text: text,
                translation: "Everything looks good to me!",
              });
            }
          }
        }
      }
    }
  });
};
