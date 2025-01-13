const fs = require("fs");
const path = require("path");


exports.writeConsoleFileSync = data => {
    let file = fs.writeFileSync(path.join(__dirname, "../data/console.json"), data, "utf-8");
    return file;
}