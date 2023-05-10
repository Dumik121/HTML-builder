const fs = require("fs");
const path = require("path");

console.log("Вывод в консоль приветственного сообщения:");

process.stdin.on("data", (data) => {
  const userInput = data.toString().trim();

  if (userInput === "exit") {
    console.log("Реализация прощального сообщения при остановке процесса");
    process.exit();
  } else {
    const filePath = path.join(__dirname, "text.txt");
    const writeStream = fs.createWriteStream(filePath, { flags: "a" });

    writeStream.write(userInput + "\n", () => {
      console.log(`Текст "${userInput}" записан в файл.`);
    });
  }
});
