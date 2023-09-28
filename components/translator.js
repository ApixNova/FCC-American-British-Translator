const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  getWords(string) {
    return string.match(/\S+/g);
  }

  toBritish(string, highlight) {
    // text to lowercase:
    let text = string.toLowerCase();

    // got through each translation
    let british = americanToBritishSpelling;
    for (const american in british) {
      if (text.includes(american)) {
        // if a match is found, replace it in the text
        text = text.replaceAll(
          new RegExp("(?<=^|\\W)" + "(" + american + ")" + "(?=\\W|$)", "g"),
          '<span class="highlight">' + british[american] + "</span>"
        );
      }
    }
    for (const american in americanOnly) {
      if (text.includes(american)) {
        // if a match is found, replace it in the text
        text = text.replaceAll(
          new RegExp("(?<=^|\\W)" + "(" + american + ")" + "(?=\\W|$)", "g"),
          '<span class="highlight">' + americanOnly[american] + "</span>"
        );
      }
    }
    let titles = americanToBritishTitles;
    for (const american in titles) {
      if (text.includes(american)) {
        // if a match is found, replace it in the text
        text = text.replaceAll(
          new RegExp("(?<=^|\\W)" + "(" + american + ")" + "(?=\\W|$)", "g"),
          '<span class="highlight">' +
            titles[american][0].toUpperCase() +
            titles[american].slice(1) +
            "</span>"
        );
      }
    }
    //convert time
    text = text.replaceAll(
      /(\d+)[:](\d+)/g,
      '<span class="highlight">' + "$1" + "." + "$2" + "</span>"
    );
    //Uppercase the first letter of proper nouns
    let initialArray = this.getWords(string);
    for (let i = 0; i < initialArray.length; i++) {
      let word = initialArray[i];
      if (/[A-Z]/.test(word[0]) && i != 0) {
        let putCharactersInBrackets = word
          .toLowerCase()
          .replace(/(.)/g, "[" + "$1" + "]");
        text = text.replaceAll(
          new RegExp(
            "(?<=^|\\s)" +
              "(" +
              putCharactersInBrackets +
              ")" +
              "(?=\\s|[.]|$)",
            "g"
          ),
          word
        );
      }
    }
    // Uppercase the first letter. And Each letter that's after a period
    let wordArray = this.getWords(text);
    for (let i = 0; i < wordArray.length - 1; i++) {
      if (i == 0) {
        wordArray[0] = wordArray[0][0].toUpperCase() + wordArray[0].slice(1);
      }
      if (wordArray[i] == "i") {
        wordArray[i] = "I";
      }
      if (
        ".?!".includes(wordArray[i][wordArray[i].length - 1]) ||
        ["Mr", "Mrs", "Ms", "Mx", "Dr", "Prof"].includes(wordArray[i])
      ) {
        wordArray[i + 1] =
          wordArray[i + 1][0].toUpperCase() + wordArray[i + 1].slice(1);
      }
    }

    let result = wordArray.join(" ");
    if (!highlight) {
      result = result.replaceAll('<span class="highlight">', "");
      result = result.replaceAll("</span>", "");
    }
    console.log(result);
    return result;
  }

  toAmerican(string, highlight) {
    // text to lowercase:
    let text = string.toLowerCase();

    // got through each translation
    let british = americanToBritishSpelling;
    for (const american in british) {
      if (text.includes(british[american])) {
        // if a match is found, replace it in the text
        text = text.replaceAll(
          new RegExp(
            "(?<=^|\\s)" + "(" + british[american] + ")" + "(?=\\s|$|[.])",
            "g"
          ),
          '<span class="highlight">' + american + "</span>"
        );
      }
    }
    for (const american in britishOnly) {
      if (text.includes(american)) {
        // if a match is found, replace it in the text
        text = text.replaceAll(
          new RegExp(
            "(?<=^|\\s)" + "(" + american + ")" + "(?=\\s|$|[.])",
            "g"
          ),
          '<span class="highlight">' + britishOnly[american] + "</span>"
        );
      }
    }
    let titles = americanToBritishTitles;
    for (const american in titles) {
      if (text.includes(titles[american])) {
        // if a match is found, replace it in the text
        text = text.replaceAll(
          new RegExp(
            "(?<=^|\\s)" + "(" + titles[american] + ")" + "(?=\\s|$)",
            "g"
          ),
          '<span class="highlight">' +
            american[0].toUpperCase() +
            american.slice(1) +
            "</span>"
        );
      }
    }
    //convert time
    text = text.replaceAll(
      /(\d)[.](\d+)/g,
      '<span class="highlight">' + "$1" + ":" + "$2" + "</span>"
    );
    //Uppercase the first letter of proper nouns
    let initialArray = this.getWords(string);
    for (let i = 0; i < initialArray.length; i++) {
      let word = initialArray[i];
      if (/[A-Z]/.test(word[0]) && i != 0) {
        let putCharactersInBrackets = word
          .toLowerCase()
          .replace(/(.)/g, "[" + "$1" + "]");
        text = text.replaceAll(
          new RegExp(
            "(?<=^|\\s)" +
              "(" +
              putCharactersInBrackets +
              ")" +
              "(?=\\s|[.]|$)",
            "g"
          ),
          word
        );
      }
    }

    // Uppercase the first letter. And Each letter that's after a period
    let wordArray = this.getWords(text);
    for (let i = 0; i < wordArray.length - 1; i++) {
      if (i == 0) {
        wordArray[0] = wordArray[0][0].toUpperCase() + wordArray[0].slice(1);
      }
      if (wordArray[i] == "i") {
        wordArray[i] = "I";
      }
      if (
        ".?!".includes(wordArray[i][wordArray[i].length - 1]) ||
        ["Mr.", "Mrs.", "Ms.", "Mx.", "Dr.", "Prof."].includes(wordArray[i])
      ) {
        wordArray[i + 1] =
          '<span class="highlight">' +
          wordArray[i + 1][0].toUpperCase() +
          wordArray[i + 1].slice(1) +
          "</span>";
      }
    }
    let result = wordArray.join(" ");
    if (!highlight) {
      result = result.replaceAll('<span class="highlight">', "");
      result = result.replaceAll("</span>", "");
    }
    console.log(result);
    return result;
  }
}

module.exports = Translator;
