const cron = require("node-cron");
const { readFileSync } = require("../utils/read_file");
const { writeFileSync } = require("../utils/write_file");
const { readConsoleFileSync } = require("../utils/read_console");
const { writeConsoleFileSync } = require("../utils/write_console");

let url = "https://webhook.site/6e740239-034c-47b7-a88a-760c660dce8b";

const pushToDB = () => {
    try {
        let currentLogData = readFileSync();
        if (currentLogData.length > 1) {
            fetch(url, {
                method: "POST",
                body: currentLogData,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let emptyArray = [{}];
            writeFileSync(JSON.stringify(emptyArray, null, 2));
        }
    } catch (err) {
        if (err) throw err;
    }
}

const pushConsoleToDB = () => {
    try {
        let currentLogData = readConsoleFileSync();
        fetch(url, {
            method: "POST",
            body: currentLogData,
            headers: {
                "Content-Type": "application/json"
            }
        })
        let emptyArray = [{}];
        writeConsoleFileSync(JSON.stringify(emptyArray, null, 2));
    } catch (err) {
        if (err) throw err;
    }
}

const scheduleCronJobs = () => {
    cron.schedule('*/15 * * * * *', () => {
        pushToDB();
    });
}

module.exports = scheduleCronJobs;