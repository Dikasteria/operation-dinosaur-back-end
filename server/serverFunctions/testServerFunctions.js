const { selfQuery } = require("./selfQuery");
const { recurTimeout } = require("./parameters");
const { seedData } = require("./seedTestData");

function recurQuery() {
  selfQuery();

  setTimeout(recurQuery, recurTimeout);
}

seedData().then(x => {
  recurQuery();
});
