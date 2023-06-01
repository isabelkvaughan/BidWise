document
  .getElementById("update-listing-btn")
  .addEventListener("click", updateListing);

async function updateListing(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const startingPrice = document.getElementById("starting-price").value;
  const endDate = document.getElementById("end-date").value;

  try {
    const auctionData = {
      title,
      description,
      startingPrice,
      endDate,
    };

    const updateAuctionResponse = await fetch(`/auctions/${auctionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auctionData),
    });

    // Redirect to the Auction item created if OK
    if (updateAuctionResponse.ok) {
      window.location.replace(`/auctions/${auctionId}`);
    } else {
      throw new Error("Failed to update auction");
    }
  } catch (error) {
    console.error(error);
    // Handle error condition
  }
}
