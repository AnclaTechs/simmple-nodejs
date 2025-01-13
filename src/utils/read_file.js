const fs = require("fs");
const path = require("path");


exports.readFileSync = () => {
    let file = fs.readFileSync(path.join(__dirname, "../data/file.json"), "utf-8");
    return JSON.parse(file);
}