const lib = require("./transform-svg_elm.js");

async function transformSvg(commandString, scaleX = 1, scaleY = 1) {
    const flags = { commandString, scaleX, scaleY };
    const { ports } = lib.Elm.Transform.init({ flags });
    return new Promise((resolve) => ports.output.subscribe(resolve));
}

async function main() {
    const commandString = process.argv[2];
    const scaleX = process.argv[3] == null ? 1 : parseFloat(process.argv[3]);
    const scaleY = process.argv[4] == null ? 1 : parseFloat(process.argv[4]);

    if (typeof commandString === "undefined") {
        console.error("No command string provided.");
        process.exit(1);
    }

    const cleanedCommandString = await transformSvg(
        commandString,
        scaleX,
        scaleY
    );
    console.log(cleanedCommandString);
    process.exit(0);
}

main();
