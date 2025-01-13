const fs = require("fs");
const path = require("path");


exports.writeFileSync = data => {
    let file = fs.writeFileSync(path.join(__dirname, "../data/file.json"), data, "utf-8");
    return file;
}