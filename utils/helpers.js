const Handlebars = require("handlebars");
const moment = require("moment");

Handlebars.registerHelper("formatDate", (date) => {
  // Use Moment.js to format the date
  return moment(date).format("dddd Do MMMM, YYYY [at] h:mma");
});

// Checks if a given URL starts with "http://" or "https://" 
// and returns the corresponding block of code whether it is a link or not
Handlebars.registerHelper('isLink', function(url, options) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


module.exports = Handlebars;
