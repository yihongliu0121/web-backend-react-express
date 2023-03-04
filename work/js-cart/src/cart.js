"use strict";
import itemList from "./const";

(function() {
    
    let displayCartButton = true;
    
    const appEL = document.querySelector("#cart-app");
    
    render();

    appEL.addEventListener('click', (e) => {
        if(e.target.classList.contains("view-cart-button")) {
            displayCartButton = !displayCartButton;
            render();
        }
        if(e.target.classList.contains("hide-cart-button")) {
            displayCartButton = !displayCartButton;
            render();
        }
        if (e.target.classList.contains("checkout-button")) {
            displayCartButton = !displayCartButton;
            itemList.splice(0, itemList.length);
            render();
        }
        if (e.target.classList.contains("add-to-cart")) {
            const name = e.target.parentElement.getElementsByClassName('name')[0].innerText;
            const price = Number(e.target.parentElement.getElementsByClassName('product-price')[0].innerText.slice(1));
            console.log(price);
            if (itemList.some(x => x.name === name)) {
                itemList.find(x => x.name === name).quantity++;
                render();
            }
            else {
                const newItem = {
                    name: name,
                    img: e.target.parentElement.getElementsByClassName('cat-image')[0].src,
                    price: price,
                    quantity: 1
                }
                itemList.push(newItem);
                render();
            }
        }
        if (e.target.classList.contains("delete")) {
            const index = e.target.dataset.index; // read data-index from the element
            itemList.splice(index, 1); // remove the indicated element from list
            render();
        }
        if (e.target.classList.contains("increase")) {
            const index = e.target.dataset.index;
            itemList[index].quantity++;
            render();
        }
        if (e.target.classList.contains("decrease")) {
            const index = e.target.dataset.index;
            itemList[index].quantity--;
            //console.log(itemList[index].quantity);
            if(itemList[index].quantity < 1) {
                itemList.splice(index, 1);
            }
            render();
        }
    });

   
    function render() {
        const catListHtml = generateCatListHtml();
        const cartListHtml = generateCartListHtml(itemList);
        const viewCartBtn = generateViewCartBtn();
        const hideCartBtn = generateHideCartBtn();
        const chekoutBtn = generateCheckoutBtn();
        if (displayCartButton) {
            appEL.innerHTML = `${catListHtml}
                                ${viewCartBtn}
                                
            `;
        }
        else {
            appEL.innerHTML = `${catListHtml}
            ${hideCartBtn}
            ${cartListHtml}
            ${chekoutBtn}
            `;
        }
    }

    function generateCatListHtml() {
        return `<ul class="cat-list">
        <li class="cat">
            <span class="name">cat1</span>
            <img class="cat-image" src="http://placekitten.com/150/150?image=1" alt="cat-1">
            <button class="add-to-cart">Add to cart</button>
            <span class="product-price">$0.99</span>
        </li>
        <li class="cat">
            <span class="name">cat2</span>
            <img class="cat-image" src="http://placekitten.com/150/150?image=2" alt="cat-2">
            <button class="add-to-cart">Add to cart</button>
            <span class="product-price">$3.14</span>
        </li>
        <li class="cat">
            <span class="name">cat3</span>
            <img class="cat-image" src="http://placekitten.com/150/150?image=3" alt="cat-3">
            <button class="add-to-cart">Add to cart</button>
            <span class="product-price">$2.73</span>
        </li>
    </ul>`;
    };

    function generateCartListHtml(itemList) {
        if (itemList.length === 0) {
            return `<div><p>Your Cart is Empty!</p></div>`
        }
        const html = `<ul class="item-list">` + itemList.map( (item, index) => {
            const disabled = item.quantity === 0 ? 'disabled' : '';
            return `
              <li>
                <div class="name-form">
                  <span class="itemName" data-index="${index}">${item.name}</span>
                  <img class="itemImg" src=${item.img} data-index="${index}">
                  <span class="itemPrice" data-index="${index}">${(item.price * item.quantity).toFixed(2)}</span>
                  <button class="delete" data-index="${index}">X</button>
                </div>
                <div class="qty-form">
                  <button class="decrease ${disabled}" data-index="${index}" ${disabled}>-</button>
                  <span class="itemQty" data-index="${index}">${item.quantity}</span>
                  <button class="increase" data-index="${index}">+</button>
                <div>
              </li>
            `;
        }).join('') + `</ul>` + `<div><p class="total-price">Total Price is ${getTotalCost()}</p></div>`;
        return html;
    }

    function getTotalCost() {
        let sum = 0;
        for(let i = 0; i < itemList.length; i++) {
            sum += itemList[i].price * itemList[i].quantity;
        }
        return sum.toFixed(2);
    }

    function generateViewCartBtn() {
        return `<div><button class="view-cart-button">View Cart ${Object.keys(itemList).length}</button></div>`;
    }

    function generateHideCartBtn() {
        return `<div><button class="hide-cart-button">Hide Cart</button></div>`;
    }

    function generateCheckoutBtn() {
        return `<div><button class="checkout-button">Checkout</button></div>`;
    }


    




})();