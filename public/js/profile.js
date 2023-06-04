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

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/auctions/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to delete auction");
//     }
//   }
// };

document
  .querySelector(".new-auction-form")
  .addEventListener("submit", newFormHandler);

// document
//   .querySelector(".project-list")
//   .addEventListener("click", delButtonHandler);
