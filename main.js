window.addEventListener("load", () => {
  items = JSON.parse(localStorage.getItem("items")) || [];
  cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  validateUser();
  userName = document.querySelector(".userName");
  userName.innerHTML = userDetails[0].userName;
  orderedCount = document.getElementById("count");
  orderedCount.innerHTML = cartItems.length;
  fetchApi().then((response) => {
    localStorage.setItem("items", JSON.stringify(response));
  });

  displayItems();
});

function registerUser() {
  userName = document.querySelector("#user-Name");
  submit = document.querySelector("submit");
  let enteredUserName = userName.value;
  if (!userName.value) {
    alert("Please enter a user name");
    return;
  } else {
    const user = {
      userName: enteredUserName,
    };
    userDetails.push(user);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    form = document.querySelector("#welcome-form");
    form.style.display = "none";
    document.location.reload();
  }
}

async function fetchApi() {
  const response = await fetch(
    "https://raw.githubusercontent.com/vellaiyan/frontEndTraining/24-11-2022/.mockend.json"
  );
  const data = await response.json();
  return data;
}

function validateUser() {
  sectionContainer = document.querySelector(".top-section");
  container = document.querySelector(".container");
  loginForm = document.querySelector(".welcome");
  if (userDetails.length <= 0) {
    container.style.overflow = "hidden";
    sectionContainer.style.opacity = "5%";

    loginForm.style.display = "block";
  } else {
    container.style.overflow = "none";
    loginForm.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("userDetails");
  document.location.reload();
}
function displayItems() {
  const topSection = document.querySelector("#top-section");
  topSection.innerHTML = "";
  /* left side of the top section */
  const leftSide = document.createElement("div");
  leftSide.classList.add("left-side");

  topSection.appendChild(leftSide);
  const rightSide = document.createElement("div");
  rightSide.classList.add("right-side");
  rightSide.classList.add("items");

  topSection.appendChild(rightSide);

  /* right side of the top section */
  items.forEach((element) => {
    console.log(element.cost);
    const itemDivision = document.createElement("div");
    itemDivision.classList.add("item-division");

    const firstRow = document.createElement("div");
    firstRow.classList.add("first-row");

    const first = document.createElement("div");
    first.classList.add("first");

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    const firstItem = document.createElement("img");
    firstItem.setAttribute("src", element.url);
    firstItem.classList.add("first-item");
    itemContainer.appendChild(firstItem);

    const hotButton = document.createElement("button");
    hotButton.classList.add("hot");
    hotButton.innerHTML = "HOT";
    itemContainer.appendChild(hotButton);

    if (element.sale != "no") {
      const saleButton = document.createElement("button");
      saleButton.innerHTML = "SALE";
      saleButton.classList.add("sale");
      itemContainer.appendChild(saleButton);
    }

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
    price.innerHTML = "$" + element.cost;
    itemTitle.appendChild(price);

    if (element.offer != "") {
      const offer = document.createElement("span");
      offer.classList.add("offer");
      offer.innerHTML = "$" + element.offer;
      price.appendChild(offer);
    }

    first.appendChild(itemContainer);
    first.appendChild(itemTitle);

    firstRow.appendChild(first);

    itemDivision.appendChild(firstRow);
    rightSide.appendChild(itemDivision);

    addButton.addEventListener("click", () => {
      const cartItem = {
        itemName: element.ItemName,
        cost: element.cost,
      };
      console.log(cartItem);
      cartItems.push(cartItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      orderedCount = document.getElementById("count");
      orderedCount.innerText = cartItems.length;
    });
  });
}

function openOrders() {
  var totalCost = 0;
  ordersLayout = document.getElementById("ordered-items");
  ordersLayout.style.display = "block";
  console.log(cartItems.length);

  const cartItemsLayout = document.querySelector("#cartItems");
  cartItemsLayout.innerHTML = "";

  cartItems.forEach((cartItem, index) => {
    totalCost += parseInt(cartItem.cost);
    const orderedItem = document.createElement("div");
    orderedItem.classList.add("orderedItem");

    const orderedItemIndex = document.createElement("input");
    orderedItemIndex.classList.add("text");
    orderedItemIndex.classList.add("orderedItemIndex");
    orderedItemIndex.type = "text";
    orderedItemIndex.value = index + 1;
    //orderedItemIndex.classList.add("orderedItemIndex");
    //have to set the index of the item

    const indexElement = document.createElement("div");
    indexElement.classList.add("index");
    indexElement.appendChild(orderedItemIndex);

    /* index completed           */

    const orderedItemName = document.createElement("input");
    orderedItemName.classList.add("text");
    orderedItemName.classList.add("orderedItemName");
    orderedItemName.type = "text";
    orderedItemName.value = cartItem.itemName;

    const nameElement = document.createElement("div");
    nameElement.classList.add("cartItemName");
    nameElement.appendChild(orderedItemName);

    /* name completed */

    const deleteElement = document.createElement("button");
    deleteElement.classList.add("delete");
    deleteElement.innerHTML =
      "<i style = 'font-size: 30px; color: #ffeb3b; weight: 900' class='fa fa-trash-o'></i>";

    const orderedItemPrice = document.createElement("input");
    orderedItemPrice.classList.add("text");
    orderedItemPrice.classList.add("orderedItemPrice");
    orderedItemPrice.type = "text";
    orderedItemPrice.value = "$" + cartItem.cost;

    const priceElement = document.createElement("div");
    priceElement.classList.add("cartItemPrice");
    priceElement.appendChild(orderedItemPrice);

    /* price completed */

    orderedItem.appendChild(indexElement);
    orderedItem.appendChild(nameElement);
    orderedItem.appendChild(deleteElement);
    orderedItem.appendChild(priceElement);
    cartItemsLayout.appendChild(orderedItem);

    deleteElement.addEventListener("click", () => {
      cartItems = cartItems.filter((t) => t != cartItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      orderedCount = document.getElementById("count");
      orderedCount.innerText = cartItems.length;

      openOrders();
    });
  });

  const totalCostelement = document.getElementById("cost");
  totalCostelement.innerHTML = "$" + totalCost.toString();
}

function closeOrders() {
  ordersLayout = document.getElementById("ordered-items");
  ordersLayout.style.display = "none";
}
