const lib = require("./clean-svg-command-string_elm.js");

async function cleanSvgCommandString(commandString) {
  const { ports } = lib.Elm.Clean.init({ flags: commandString });
  return new Promise((resolve) => ports.output.subscribe(resolve));
}

module.exports = {
  cleanSvgCommandString,
};
