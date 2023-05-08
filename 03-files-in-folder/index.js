const fs = require("fs");
const path = require("path");
const folderPath = path.join(__dirname, "secret-folder");

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  console.log("\nCurrent directory files:");
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      console.log(file);
    });
  }
});
