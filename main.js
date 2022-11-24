window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  fetch(
    "https://raw.githubusercontent.com/vellaiyan/frontEndTraining/24-11-2022/.mockend.json",
    { cache: "no-store" }
  )
    .then((response) => {
      return response.json();
    })
    .then((items) => {
      localStorage.setItem("todos", JSON.stringify(items));
    });

  displayItems();
});

function displayItems() {
  const topSection = document.querySelector("#top-section");
  topSection.innerHTML = "";
  /* left side of the top section */
  const leftSide = document.createElement("div");
  leftSide.classList.add("left-side");

  topSection.appendChild(leftSide);

  /* right side of the top section */
  todos.forEach((element) => {
    const rightSide = document.createElement("div");
    rightSide.classList.add("right-side");
    rightSide.classList.add("items");

    const itemDivision = document.createElement("div");
    itemDivision.classList.add("item-division");

    const firstRow = document.createElement("div");
    firstRow.classList.add("first-row");

    const first = document.createElement("div");
    first.classList.add("first");

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    const firstItem = document.createElement("img");
    firstItem.setAttribute("src", "images/Tiramisu-Flavor.jpg");
    firstItem.classList.add("first-item");
    itemContainer.appendChild(firstItem);

    const hotButton = document.createElement("button");
    hotButton.classList.add("hot");
    hotButton.innerHTML = "HOT";
    itemContainer.appendChild(hotButton);

    const addButton = document.createElement("div");
    addButton.classList.add("add-button");
    addButton.innerHTML = "Add";
    itemContainer.appendChild(addButton);

    const itemTitle = document.createElement("div");
    itemTitle.classList.add("item-title");
    itemContainer.appendChild(itemTitle);

    const itemTitleText = document.createElement("h2");
    itemTitleText.classList.add("item-name");
    itemTitleText.innerHTML = element.ItemName;
    itemTitle.appendChild(itemTitleText);

    const price = document.createElement("p");
    price.classList.add("price");
    price.innerHTML = element.cost;
    itemTitle.appendChild(price);

    first.appendChild(itemContainer);
    first.appendChild(itemTitle);

    firstRow.appendChild(first);

    /* first row completed */

    // const secondRow = document.createElement("div");
    // secondRow.classList.add("second-row");

    // const itemContainer2 = document.createElement("div");
    // itemContainer2.classList.add("item-container");
    // secondRow.appendChild(itemContainer2);

    // const thirdItem = document.createElement("img");
    // thirdItem.setAttribute("src", "images/Tiramisu-Flavor.jpg");
    // thirdItem.classList.add("third-item");
    // itemContainer2.appendChild(thirdItem);

    // const hotButton2 = document.createElement("button");
    // hotButton.innerHTML = "HOT";
    // hotButton2.classList.add("hot");

    // itemContainer2.appendChild(hotButton2);

    // const addButton2 = document.createElement("div");
    // addButton2.classList.add("add-button");
    // addButton2.innerHTML = "Add";
    // itemContainer2.appendChild(addButton2);

    // const itemTitle2 = document.createElement("div");
    // itemTitle2.classList.add("item-title");
    // itemContainer2.appendChild(itemTitle2);

    // const itemTitleText2 = document.createElement("h2");
    // itemTitleText2.classList.add("item-name");
    // itemTitleText2.innerHTML = "Vellaiyan";
    // itemTitle2.appendChild(itemTitleText2);

    // const price2 = document.createElement("p");
    // price2.classList.add("price");
    // price2.innerHTML = "$12";
    // itemTitle2.appendChild(price2);

    // itemContainer2.appendChild(itemTitle2);

    itemDivision.appendChild(firstRow);
    //itemDivision.appendChild(secondRow);
    rightSide.appendChild(itemDivision);
    topSection.appendChild(rightSide);

    addButton.addEventListener("click", () => {
      console.log(element.cost);
    });
  });
}

function openForm() {
  ordersLayout = document.getElementById("ordered-items");
  ordersLayout.style.display = "block";
}
