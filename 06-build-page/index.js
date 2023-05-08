const fs = require("fs");
const path = require("path");

const sourceFolder = path.join(__dirname, "components");
const targetFile = path.join(__dirname, "project-dist", "index.html");
const templateFile = path.join(__dirname, "template.html");

const sourceFol = path.join(__dirname, "assets");
const targetFol = path.join(__dirname, "project-dist", "assets");

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;

  fs.mkdir(targetFol, (err) => {
    if (err) throw err;

    fs.readdir(sourceFol, { withFileTypes: true }, (err, folders) => {
      if (err) throw err;

      folders.forEach((folder) => {
        const folderPath = path.join(sourceFol, folder.name);

        if (folder.isDirectory()) {
          fs.mkdir(
            path.join(targetFol, folder.name),
            { recursive: true },
            (err) => {
              if (err) throw err;

              fs.readdir(folderPath, (err, files) => {
                if (err) throw err;

                files.forEach((file) => {
                  const sourcePath = path.join(folderPath, file);
                  const targetPath = path.join(targetFol, folder.name, file);

                  fs.copyFile(sourcePath, targetPath, (err) => {
                    if (err) throw err;
                  });
                });
              });
            }
          );
        }
      });
    });
  });

  fs.readFile(templateFile, "utf8", (err, templateContent) => {
    if (err) throw err;

    fs.readdir(sourceFolder, (err, files) => {
      if (err) throw err;

      const components = {};

      files.forEach((file) => {
        const componentName = path.parse(file).name;
        const componentPath = path.join(sourceFolder, file);

        fs.readFile(componentPath, "utf8", (err, componentContent) => {
          if (err) throw err;

          components[componentName] = componentContent;

          if (Object.keys(components).length === files.length) {
            let outputContent = templateContent;

            for (const componentName in components) {
              const componentRegex = new RegExp(`{{${componentName}}}`, "g");
              outputContent = outputContent.replace(
                componentRegex,
                components[componentName]
              );
            }

            fs.writeFile(targetFile, outputContent, (err) => {
              if (err) throw err;

              console.log("Index file created successfully!");
            });
          }
        });
      });
    });
  });
});

const sourceF = path.join(__dirname, "styles");
const targetF = path.join(__dirname, "project-dist");

fs.readdir(sourceF, (err, files) => {
  if (err) throw err;

  const cssFiles = files.filter((file) => path.extname(file) === ".css");
  const cssContent = [];

  cssFiles.forEach((file, index) => {
    const sourcePath = path.join(sourceF, file);

    fs.readFile(sourcePath, "utf8", (err, content) => {
      if (err) throw err;

      cssContent[index] = content;

      if (cssContent.length === cssFiles.length) {
        const targetPath = path.join(targetF, "style.css");
        const cssContentString = cssContent.join("\n");

        fs.writeFile(targetPath, cssContentString, (err) => {
          if (err) throw err;

          console.log("Bundle created successfully!");
        });
      }
    });
  });
});
