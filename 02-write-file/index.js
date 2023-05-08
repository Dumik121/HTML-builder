const fs = require("fs");
const path = require("path");

let dataStringified = "";
console.log("Вывод в консоль приветственного сообщения:");
process.stdin.on("data", (data) => {
  dataStringified = data.toString();

  fs.writeFile(path.join(__dirname, "text.txt"), dataStringified, (err) => {
    console.log("Реализация прощального сообщения при остановке процесса");
  process.exit();
  });

});
