const { selfQuery } = require("./selfQuery");
const { recurTimeout } = require("./parameters");

function recurQuery() {
  selfQuery();

  setTimeout(recurQuery, recurTimeout);
}

recurQuery();

module.exports = { recurQuery, recurTimeout };
