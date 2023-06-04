document
  .getElementById("create-listing-btn")
  .addEventListener("click", createListing);

async function createListing(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const startingPrice = document.getElementById("startingPrice").value;
  const endDate = document.getElementById("endDate").value;

  if (title && startingPrice && description && endDate) {
    try {
      const auctionData = {
        title,
        description,
        startingPrice,
        endDate,
      };

      const createAuctionResponse = await fetch("/auctions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auctionData),
      });

      // Redirect to the Auction item created if OK
      if (createAuctionResponse.ok) {
        const createdAuction = await createAuctionResponse.json();
        const auctionId = createdAuction.id;
        window.location.replace(`/auctions/${auctionId}`);
      } else {
        throw new Error("Failed to create auction");
      }
    } catch (error) {
      console.error(error);
      // Handle error condition
    }
  }
}
