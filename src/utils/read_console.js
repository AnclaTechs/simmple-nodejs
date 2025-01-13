const fs = require("fs");
const path = require("path");


exports.readConsoleFileSync = () => {
    let file = fs.readFileSync(path.join(__dirname, "../data/console.json"), "utf-8");
    return JSON.parse(file);
}