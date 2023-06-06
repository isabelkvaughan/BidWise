// Function to handle the bid form submission
const handleBidFormSubmit = async (event) => {
    event.preventDefault();
  
    const form = document.getElementById("bid-form");
    const auctionId = form.getAttribute("data-auction-id");
    const amountInput = form.elements["amount"];
    const amount = amountInput.value;
  
    try {
      // Send the bid request to the server
      const response = await fetch(`/auctions/${auctionId}/bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
  
      // Parse the response JSON data
      const data = await response.json();
  
      if (response.ok) {
        // Remove previous error message, if any
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = "";
        errorMessageElement.style.display = "none";
  
        // Update the starting price element on the page
        const startingPriceElement = document.getElementById("starting-price");
        startingPriceElement.textContent = `$${amount}`;
  
        // Display success message
        const successMessageElement = document.getElementById("success-message");
        successMessageElement.textContent = "Bid placed successfully!";
        successMessageElement.style.display = "block";
  
        // Clear the amount input
        amountInput.value = "";
      } else {
        // Remove previous success message, if any
        const successMessageElement = document.getElementById("success-message");
        successMessageElement.textContent = "";
        successMessageElement.style.display = "none";
  
        // Display error message
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = data.error;
        errorMessageElement.style.display = "block";
      }
    } catch (error) {
      console.log(error);
      // Display error message
      const errorMessageElement = document.getElementById("error-message");
      errorMessageElement.textContent = "An error occurred. Please try again later.";
      errorMessageElement.style.display = "block";
    }
  };
  
  // Add event listener to the bid form
  const bidForm = document.getElementById("bid-form");
  if (bidForm) {
    bidForm.addEventListener("submit", handleBidFormSubmit);
  }