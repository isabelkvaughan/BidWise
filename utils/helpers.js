const Handlebars = require("handlebars");
const moment = require("moment");

Handlebars.registerHelper("formatDate", (date) => {
  // Use Moment.js to format the date
  return moment(date).format("dddd Do MMMM, YYYY [at] h:mma");
});

Handlebars.registerHelper('isLink', function(url, options) {
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

module.exports = Handlebars;
