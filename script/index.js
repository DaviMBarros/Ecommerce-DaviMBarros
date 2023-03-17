const mainCards = document.querySelector(".main-cards");
const ulProduct = document.querySelector(".ulProduct");
const allProducts = document.querySelectorAll(".allProducts");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
const cartList = document.querySelector(".cart-list");
const countProduct = document.querySelector(".count-product");
const totalValues = document.querySelector(".total-values");
const cartEmpty = document.querySelector(".cart-empty");
let cartValue = 0;
let cartQuantity = 0;

function allCards(product) {
  ulProduct.innerHTML = "";
  for (let i = 0; i < product.length; i++) {
    const listProduct = document.createElement("li");
    const imgProduct = document.createElement("img");
    const divDescription = document.createElement("div");
    const spanProduct = document.createElement("span");
    const titleProduct = document.createElement("h3");
    const descriptionProduct = document.createElement("p");
    const promotionProduct = document.createElement("p");
    const valueProduct = document.createElement("p");
    const addToCart = document.createElement("button");

    listProduct.className = "liProduct";
    imgProduct.className = "image";
    divDescription.className = "containerDescription";
    spanProduct.className = "spanTag";
    titleProduct.className = "nameProduct";
    descriptionProduct.className = "description";
    promotionProduct.className = "promotion";
    valueProduct.className = "valueTrue";
    addToCart.className = "buttonCart";

    imgProduct.src = product[i].img;
    spanProduct.innerHTML = product[i].tag;
    titleProduct.innerHTML = product[i].nameItem;
    descriptionProduct.innerHTML = product[i].description;
    promotionProduct.innerHTML = `R$ ${product[i].discount}.00`;
    valueProduct.innerHTML = `R$ ${product[i].value}.00`;
    addToCart.innerHTML = product[i].addCart;

    listProduct.append(imgProduct, divDescription);
    divDescription.append(
      spanProduct,
      titleProduct,
      descriptionProduct,
      valueProduct,
      promotionProduct,
      addToCart
    );
    ulProduct.append(listProduct);

    addToCart.setAttribute("data-img", product[i].img);
    addToCart.setAttribute("data-h3", product[i].nameItem);
    addToCart.setAttribute("data-p", product[i].discount.toFixed(2));

    addToCart.addEventListener("click", function (e) {
      cartEmpty.className = "display-none";
      const divProductCart = document.createElement("div");
      const listProductCart = document.createElement("li");
      const imgProductCart = document.createElement("img");
      const titleProductCart = document.createElement("h3");
      const promotionProductCart = document.createElement("p");
      const removeCart = document.createElement("button");

      divProductCart.className = "divCart";
      listProductCart.className = "liCart";
      imgProductCart.className = "imgCart";
      titleProductCart.className = "hCart";
      promotionProductCart.className = "pCart";
      removeCart.className = "buttonRemoveCart";

      imgProductCart.src = e.target.dataset.img;
      titleProductCart.innerHTML = e.target.dataset.h3;
      promotionProductCart.innerHTML = e.target.dataset.p;
      removeCart.innerHTML = "Remover produto";
      cartQuantity++;
      countProduct.innerHTML = cartQuantity;
      cartValue += product[i].discount;
      totalValues.innerHTML = `R$ ${cartValue.toFixed(2)}`;

      listProductCart.append(imgProductCart, divProductCart);
      divProductCart.append(titleProductCart, promotionProductCart, removeCart);
      cartList.append(listProductCart);

      removeCart.addEventListener("click", function (event) {
        cartQuantity--;
        countProduct.innerHTML = cartQuantity;
        cartValue -= product[i].discount;
        totalValues.innerHTML = `R$ ${cartValue.toFixed(2)}`;
        event.target.parentNode.parentNode.remove();
        console.log(cartValue)
        if (cartQuantity == 0) {
          cartEmpty.className = "cart-empty";
        }
      });
    });
  }
}
allCards(data);

let tagTshirts = [];
let tagAccessories = [];
function filterTags(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].tag[0] == "Acessórios") {
      tagAccessories.push(list[i]);
    }
    if (list[i].tag[0] == "Camisetas") {
      tagTshirts.push(list[i]);
    }
  }
}
filterTags(data)

function filterCards(menu) {
  for (let i = 0; i < menu.length; i++) {
    menu[i].addEventListener("click", function (e) {
      if (e.target.textContent == "Acessórios") {
        allCards(tagAccessories);
      }
      if (e.target.textContent == "Camisetas") {
        allCards(tagTshirts);
      }
      if (e.target.textContent == "Todos") {
        allCards(data);
      }
    });
  }
}

searchButton.addEventListener("click", function () {
  let searchArr = [];
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].nameItem
        .toUpperCase()
        .includes(searchInput.value.toUpperCase()) ||
      data[i].description
        .toUpperCase()
        .includes(searchInput.value.toUpperCase())
    ) {
      searchArr.push(data[i]);
    }
  }
  allCards(searchArr);
});
filterCards(allProducts);