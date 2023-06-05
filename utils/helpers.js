const Handlebars = require("handlebars");
const moment = require("moment");

Handlebars.registerHelper("formatDate", (date) => {
  // Use Moment.js to format the date
  return moment(date).format("dddd Do MMMM, YYYY [at] h:mma");
});

module.exports = Handlebars;
