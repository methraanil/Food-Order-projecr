
//Checking the DOM is completly loaded or not
if (document.readyState == 'loading') {
	//Waits until the DOM completes its loading and executes the ready() function
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}


//Adding click event listner to every AddToCart button
function ready() {
	var addToCartButtons = document.getElementsByClassName('shop-item-button')
	for (var i = 0; i < addToCartButtons.length; i++) {
		var button = addToCartButtons[i]
		button.addEventListener('click', addToCartClicked)
	}

	document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


//Fetching the data of item
function addToCartClicked(event) {
	var button = event.target
	var shopItem = button.parentElement.parentElement
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
	addItemToCart(title, price, imageSrc)
	updateCartTotal()
}


//Adding the item to the cart
function addItemToCart(title, price, imageSrc) {
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
	console.log(cartItemNames.length)
	for (var i = 0; i < cartItemNames.length; i++) {
		if (cartItemNames[i].innerText == title) {
			alert('This item is already added to the cart')
			return
		}
	}
	var cartRowContents = `
		<div class="cart-item cart-column">
		<img class="cart-item-image" src="${imageSrc}" width="100" height="100">
		<span class="cart-item-title">${title}</span>
		</div>
		<span class="cart-price cart-column">${price}</span>
		<div class="cart-quantity cart-column">
		<input class="cart-quantity-input" type="number" value="1">
		<button class="btn btn-remove" type="button">REMOVE</button>
		</div>`
		cartRow.innerHTML = cartRowContents
		cartItems.append(cartRow)
		cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
		cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


//Actions on purchase button when clicked
function purchaseClicked() {
	var Tprice= document.getElementsByClassName('cart-total-price')[0]
	var price = parseFloat(Tprice.innerText)
	console.log(price)
	if(price <= 0){
		alert('Cart is empty, add our dishes to your cart')
	}
	else{
		alert('Thank you for your purchase')
		var cartItems = document.getElementsByClassName('cart-items')[0]
		while (cartItems.hasChildNodes()) {
			cartItems.removeChild(cartItems.firstChild)
		}
	}
	updateCartTotal()
}


//Removing item from the cart
function removeCartItem(event) {
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	updateCartTotal()
}


//Updates cart if there is change in quantity
function quantityChanged(event) {
	var input = event.target
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	}
	updateCartTotal()
}


//Updating cart total
function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-row')
	var total = 0
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-price')[0]
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price = parseFloat(priceElement.innerText)
		console.log(price)
		var quantity = quantityElement.value
		total = total + (price * quantity)
	}

	document.getElementsByClassName('cart-total-price')[0].innerText = total
}

