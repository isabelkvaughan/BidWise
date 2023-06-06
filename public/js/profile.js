// const fileInput = document.getElementById("fileInput");
// fileInput.addEventListener("change", async (event) => {
//   console.log("change event listener triggered");
//   const files = event.target.files;
//   console.log(files);

//   // Access the directory path
//   const directoryPath = files[0].webkitRelativePath;

//   console.log(directoryPath);
// });

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#item-name").value.trim();
  const startingPrice = document.querySelector("#item-price").value.trim();
  const description = document.querySelector("#item-desc").value.trim();
  const endDate = document.getElementById("endDate").value;
  const fileInput = event.target.elements.image;
  //console.log(fileInput);
  // Get the selected file
  const file = fileInput.files[0];

  if (title && startingPrice && description && endDate) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startingPrice", startingPrice);
    formData.append("endDate", endDate);

    try {
      const response = await fetch("/auctions", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to create auction");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while creating the auction");
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

document.addEventListener("DOMContentLoaded", () => {
  console.log(userAuctions);

  // Event listener for showing the update form
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("show-update-form-btn")) {
      const auctionId = parseInt(event.target.getAttribute("data-id"));
      // console.log("auctionId:", auctionId);
      // console.log("userAuctions:", userAuctions);
      const updateAuctionForm = document.getElementById("updateAuctionForm");
      const auction = userAuctions.find((auction) => auction.id === auctionId);
      // console.log("auction:", auction);

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
      const endDateUpdate = document.getElementById("endDateUpdate").value;

      const response = await fetch(`/auctions/${auctionId}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
          startingPrice,
          endDate: endDateUpdate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedAuction = await response.json();
        console.log("Auction updated successfully:", updatedAuction);
        document.location.replace(`/auctions/${auctionId}`);
      } else {
        const errorData = await response.json();
        console.log("Failed to update auction:", errorData.error);
        alert("Failed to update auction");
      }
    });
  document
    .getElementById("cancel-button")
    .addEventListener("click", (event) => {
      //console.log("cancel clicked");
      document.getElementById("updateAuctionForm").style.display = "none";
    });
});
