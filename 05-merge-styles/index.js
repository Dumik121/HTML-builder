const fs = require("fs");
const path = require("path");

const sourceFolder = path.join(__dirname, "styles");
const targetFolder = path.join(__dirname, "project-dist");

fs.readdir(sourceFolder, (err, files) => {
  if (err) throw err;

  const cssFiles = files.filter((file) => path.extname(file) === ".css");
  const cssContent = [];

  cssFiles.forEach((file, index) => {
    const sourcePath = path.join(sourceFolder, file);

    fs.readFile(sourcePath, "utf8", (err, content) => {
      if (err) throw err;

      cssContent[index] = content;

      if (cssContent.length === cssFiles.length) {
        const targetPath = path.join(targetFolder, "bundle.css");
        const cssContentString = cssContent.join("\n");

        fs.writeFile(targetPath, cssContentString, (err) => {
          if (err) throw err;

          console.log("Bundle created successfully!");
        });
      }
    });
  });
});

