// Get the current date
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();

// Format the current date as "yyyy-mm-dd"
var formattedDate = year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");

// Set the minimum date for the input field
var endDateInput = document.getElementById("end-date");
endDateInput.min = formattedDate;