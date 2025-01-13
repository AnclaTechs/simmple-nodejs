require("./console");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { readFileSync } = require("../utils/read_file");
const { writeFileSync } = require("../utils/write_file");
const { v4: uuidv4 } = require('uuid');
const scheduleCronJobs = require("../cron/index");

const login = (req, res, next) => {

}

const getAllLogData = () => {

    let getFile = fs.readFileSync(path.join(__dirname, "file.json"), "utf-8");
    return JSON.parse(getFile);

    // console.log("yo gee")
    // let getDataFile = await fs.readFile(path.join(__dirname, "file.json"), "utf-8", (err, res) => {
    //     if (err) throw err;
    //     console.log(res)
    // })
    // console.log(getDataFile)
    // console.log("how far bro")
    // console.log("sup egbon")
    // let data = JSON.parse(fs.readFileSync(path.join(__dirname, "file.json"), "utf-8", (err, res) => {
    //     console.log("here")
    //     if (err) throw err;
    // }))
    // return data;
}
const writeToLogData = data => {
    let getFile = fs.writeFile(path.join(__dirname, "file.json"), data, "utf-8", (err, file) => {
        if (err) throw err;
        return file;
    });
    return JSON.parse(getFile);
}

const createLog = (req, res, next) => {
    let startTime = new Date();
    let currentFileData = readFileSync();

    let dataId = uuidv4();
    currentFileData.push({
        _id: dataId,
        method: req.method,
        original_url: req.originalUrl,
        user_agent: req.header("user-agent"),
        raw_header: req.rawHeaders[0],
        startTime
    })

    let initialResponseCall = JSON.stringify(currentFileData, null, 2);

    // write new data to file
    writeFileSync(initialResponseCall);

    res.on("close", () => {
        const updatedFileData = readFileSync();

        // updatedFileData
        let currentLogCallIndex = null;
        updatedFileData.forEach((log, index) => {
            if (log._id === dataId) {
                currentLogCallIndex = index;
            }
        });

        let endTime = new Date();
        let dateDiffInMSecs = endTime - startTime;
        let dateDiffInSecs = dateDiffInMSecs / (1000);
        updatedFileData[currentLogCallIndex].end_time = endTime;
        updatedFileData[currentLogCallIndex].duration = dateDiffInSecs + "secs";
        updatedFileData[currentLogCallIndex].status_code = res.statusCode;
        updatedFileData[currentLogCallIndex].status_message = "Connection closed before response was finished";
        updatedFileData[currentLogCallIndex].event = "close";

        let stringifyJSON = JSON.stringify(updatedFileData, null, 2);
        writeFileSync(stringifyJSON);

        // override console.log to make a request to our own file and db instead of the console
    })

    res.on("error", () => {
        const updatedFileData = readFileSync();

        // updatedFileData
        let currentLogCallIndex = null;
        updatedFileData.forEach((log, index) => {
            if (log._id === dataId) {
                currentLogCallIndex = index;
            }
        });

        let endTime = new Date();
        let dateDiffInMSecs = endTime - startTime;
        let dateDiffInSecs = dateDiffInMSecs / (1000);
        updatedFileData[currentLogCallIndex].end_time = endTime;
        updatedFileData[currentLogCallIndex].duration = dateDiffInSecs + "secs";
        updatedFileData[currentLogCallIndex].status_code = 500;
        updatedFileData[currentLogCallIndex].status_message = "An error occurred while returning data";
        updatedFileData[currentLogCallIndex].error_stack = res.stack;
        updatedFileData[currentLogCallIndex].error_message = res.message;
        updatedFileData[currentLogCallIndex].event = "error";

        let stringifyJSON = JSON.stringify(updatedFileData, null, 2);
        writeFileSync(stringifyJSON);
    })

    res.on("finish", () => {
        const updatedFileData = readFileSync();

        // updatedFileData
        let currentLogCallIndex = null;
        updatedFileData.forEach((log, index) => {
            if (log._id === dataId) {
                currentLogCallIndex = index;
            }
        });

        let endTime = new Date();
        let dateDiffInMSecs = endTime - startTime;
        let dateDiffInSecs = dateDiffInMSecs / (1000);
        updatedFileData[currentLogCallIndex].end_time = endTime;
        updatedFileData[currentLogCallIndex].duration = dateDiffInSecs + "secs";
        updatedFileData[currentLogCallIndex].status_code = res.statusCode;
        updatedFileData[currentLogCallIndex].status_message = res.statusMessage;
        updatedFileData[currentLogCallIndex].event = "finish";

        let stringifyJSON = JSON.stringify(updatedFileData, null, 2);
        writeFileSync(stringifyJSON);

    })
    next();
}

// scheduleCronJobs();

module.exports = {
    login,
    createLog
}