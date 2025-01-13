const { readConsoleFileSync } = require("../utils/read_console");
const { writeConsoleFileSync } = require("../utils/write_console");

const originalConsoleLogger = console.log;

const customLogger = (...args) => {
    const logMessage = {
        timestamp: new Date().toISOString(),
        message: args.join(' '),
    };

    // Read existing log data
    let currentConsoleData = readConsoleFileSync();
    currentConsoleData.push(logMessage);

    let newJSONData = JSON.stringify(currentConsoleData, null, 2);
    writeConsoleFileSync(newJSONData);
}

// Override console.log globally
console.log = function (...args) {
    customLogger(...args);
    originalConsoleLogger.apply(console, args);
};

module.exports = customLogger;