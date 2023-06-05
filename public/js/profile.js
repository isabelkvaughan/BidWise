const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#item-name").value.trim();
  const startingPrice = document.querySelector("#item-price").value.trim();
  const description = document.querySelector("#item-desc").value.trim();
  const endDate = document.getElementById("endDate").value;

  if (title && startingPrice && description && endDate) {
    const response = await fetch(`/auctions`, {
      method: "POST",
      body: JSON.stringify({ title, description, startingPrice, endDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create auction");
    }
  }
};

document
  .querySelector(".new-auction-form")
  .addEventListener("submit", newFormHandler);

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/auctions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete auction");
    }
  }
};

const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button) => {
  button.addEventListener("click", delButtonHandler);
});

///////////UPDATE

// Get the necessary elements
const userAuctionsElement = document.getElementById("userAuctions");
const userAuctions = JSON.parse(userAuctionsElement.textContent);

// Event listener for showing the update form
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("show-update-form-btn")) {
    const auctionId = event.target.getAttribute("data-id");
    const updateAuctionForm = document.getElementById("updateAuctionForm");
    const auction = userAuctions.find((auction) => auction.id === auctionId);

    if (auction) {
      updateAuctionForm.style.display = "block";
      updateAuctionForm.setAttribute("data-id", auction.id);
      document.getElementById("title").value = auction.title;
      document.getElementById("description").value = auction.description;
      document.getElementById("startingPrice").value = auction.startingPrice;
      document.getElementById("endDate").value = auction.endDate;
    }
  }
});

// Event listener for updating an auction
document
  .getElementById("updateAuctionForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const auctionId = event.target.getAttribute("data-id");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const startingPrice = document.getElementById("startingPrice").value;
    const endDate = document.getElementById("endDate").value;

    const response = await fetch(`/auctions/${auctionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, startingPrice, endDate }),
    });

    if (response.ok) {
      document.location.replace(`/auctions/${auctionId}`);
    } else {
      alert("Failed to update auction");
    }
  });
