const fs = require('fs');
const path = require('path');

const sourceFolder =path.join(__dirname, "files");
const targetFolder =path.join(__dirname, "files-copy");

fs.mkdir(targetFolder, { recursive: true }, (err) => {
  if (err) throw err;

  fs.readdir(sourceFolder, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const sourcePath = path.join(sourceFolder, file);
      const targetPath = path.join(targetFolder, file);

      fs.copyFile(sourcePath, targetPath, (err) => {
        if (err) throw err;
        console.log(`File ${file} was copied successfully.`);
      });
    });
  });
});
