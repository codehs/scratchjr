const { cleanSvgCommandString } = require("./clean-svg-command-string.js");

async function main() {
    const commandString = process.argv[2];

    if (typeof commandString === "undefined") {
        console.error("No command string provided.");
        process.exit(1);
    }

    const cleanedCommandString = await cleanSvgCommandString(commandString);
    console.log(cleanedCommandString);
    process.exit(0);
}

main();
