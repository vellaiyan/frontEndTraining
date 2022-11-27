window.addEventListener("load", () => {
  items = JSON.parse(localStorage.getItem("items")) || [];
  cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  validateUser();
  updateDetails();
  fetchApi().then((response) => {
    localStorage.setItem("items", JSON.stringify(response));
  });

  displayItems();
});

//To update the details
function updateDetails() {
  userName = document.querySelector(".userName");
  userName.innerHTML = userDetails[0].userName;
  orderedCount = document.getElementById("count");
  orderedCount.innerHTML = cartItems.length;
}

//To register the new user.
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

//To get the api
async function fetchApi() {
  const response = await fetch(
    "https://raw.githubusercontent.com/vellaiyan/frontEndTraining/24-11-2022/.mockend.json"
  );
  const data = await response.json();
  return data;
}

//To validate the current user.
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

//To log out.
function logout() {
  localStorage.removeItem("userDetails");
  document.location.reload();
}

//To display items.
function displayItems() {
  const topSection = document.querySelector("#top-section");
  topSection.innerHTML = "";

  const leftSide = createEle("div", "left-side");

  topSection.appendChild(leftSide);
  const rightSide = createEle("div", "right-side");
  rightSide.classList.add("items");
  topSection.appendChild(rightSide);

  /* right side of the top section */
  items.forEach((element) => {
    const itemDivision = createEle("div", "item-division");
    const firstRow = createEle("div", "first-row");
    const item = createEle("div", "item");
    const itemContainer = createEle("div", "item-container");

    const firstItem = createEle("img", "first-item");
    firstItem.setAttribute("src", element.url);
    itemContainer.appendChild(firstItem);

    const hotButton = createEle("button", "hot");
    hotButton.innerHTML = "HOT";
    itemContainer.appendChild(hotButton);

    if (element.sale != "no") {
      const saleButton = createEle("button", "sale");
      saleButton.innerHTML = "SALE";
      itemContainer.appendChild(saleButton);
    }

    const addButton = createEle("button", "add-button");
    addButton.innerHTML = "Add";
    itemContainer.appendChild(addButton);

    const itemTitle = createEle("div", "item-title");
    itemContainer.appendChild(itemTitle);

    const itemTitleText = createEle("h2", "item-name");
    itemTitleText.innerHTML = element.ItemName;
    itemTitle.appendChild(itemTitleText);

    const price = createEle("p", "price");
    price.innerHTML = "$" + element.cost;
    itemTitle.appendChild(price);

    if (element.offer != "") {
      const offer = createEle("span", "offer");
      offer.innerHTML = "$" + element.offer;
      price.appendChild(offer);
    }

    item.appendChild(itemContainer);
    item.appendChild(itemTitle);

    firstRow.appendChild(item);

    itemDivision.appendChild(firstRow);
    rightSide.appendChild(itemDivision);

    addButton.addEventListener("click", () => {
      const cartItem = {
        itemName: element.ItemName,
        cost: element.cost,
        quantity: 1,
        itemCost: element.cost,
      };
      isPresent = 0;
      cartItems.forEach((item) => {
        if (item.itemName === cartItem.itemName) {
          item.quantity += cartItem.quantity;
          item.cost = item.quantity * element.cost;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          isPresent = 1;
        }
      });

      if (isPresent == 0) {
        console.log(cartItem);
        cartItems.push(cartItem);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        orderedCount = document.getElementById("count");
        orderedCount.innerText = cartItems.length;
        isPresent;
      }
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
    const orderedItem = createEle("div", "orderedItem");

    const orderedItemIndex = createEle("input", "text");
    orderedItemIndex.classList.add("orderedItemIndex");
    orderedItemIndex.type = "text";
    orderedItemIndex.value = index + 1;
    //orderedItemIndex.classList.add("orderedItemIndex");
    //have to set the index of the item

    const indexElement = createEle("div", "index");
    indexElement.appendChild(orderedItemIndex);

    /* index completed           */

    const orderedItemName = createEle("input", "text");
    orderedItemName.classList.add("orderedItemName");
    orderedItemName.type = "text";
    orderedItemName.value = cartItem.itemName;

    const nameElement = createEle("div", "cartItemName");
    nameElement.appendChild(orderedItemName);

    /* name completed */

    const quantity = createEle("input", "quantity");
    quantity.type = "number";
    quantity.value = cartItem.quantity;

    const quantityElement = createEle("div", "quantity");
    quantityElement.appendChild(quantity);

    const deleteElement = createEle("button", "delete");
    deleteElement.innerHTML =
      "<i style = 'font-size: 30px; color: #ffeb3b; weight: 900' class='fa fa-trash-o'></i>";

    const orderedItemPrice = createEle("input", "test");
    orderedItemPrice.classList.add("orderedItemPrice");
    orderedItemPrice.type = "text";
    orderedItemPrice.value = "$" + cartItem.cost;

    const priceElement = createEle("div", "cartItemPrice");
    priceElement.appendChild(orderedItemPrice);

    /* price completed */

    orderedItem.appendChild(indexElement);
    orderedItem.appendChild(nameElement);
    orderedItem.appendChild(deleteElement);
    orderedItem.appendChild(quantityElement);
    orderedItem.appendChild(priceElement);
    cartItemsLayout.appendChild(orderedItem);

    quantityElement.addEventListener("change", () => {
      let input = event.target;

      cartItem.cost = input.value * cartItem.itemCost;
      cartItem.quantity = input.value;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      openOrders();
    });

    deleteItem(deleteElement, cartItems);

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

function deleteItem(deleteElement, cartItems) {}

function closeOrders() {
  ordersLayout = document.getElementById("ordered-items");
  ordersLayout.style.display = "none";
}

function createEle(ele, classlist) {
  element = document.createElement(ele);
  element.classList.add(classlist);
  return element;
}
