//  Variable Declarations 
let cartTotal = 0;      
let cartItems = [];     
let discountApplied = false; 

//  Custom Functions 

// Function 1: Check if discount applies (>= $100 general notification)
function checkDiscount(total) {
  return total >= 100;
}

// Function 2: Check if free shipping applies (>= $200)
function checkFreeShipping(total) {
  return total >= 200;
}

// Add Items to Cart 
function addItem(price) {
  cartTotal += price;
  cartItems.push(price);
  discountApplied = false; // Reset discount on adding new items
  updateCart();
}

//  Update Cart (Loops & DOM Interactions) 
function updateCart() {
  // 1st Loop: Display all items in the cart
  let cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  for (let i = 0; i < cartItems.length; i++) {
    let li = document.createElement("li");
    li.textContent = `Item ${i + 1}: $${cartItems[i]}`;
    cartList.appendChild(li);
  }

  // Calculate total 
  let sum = 0;
  for (let price of cartItems) {
    sum += price;
  }

  // Update total
  document.getElementById("total").textContent = `Total: $${cartTotal}`;
  document.getElementById("total").classList.remove("discounted"); 

  // Conditional DOM updates
  let message = "";
  if (checkDiscount(cartTotal)) {
    message += "🎉 Eligible for discounts! ";
    document.getElementById("total").classList.add("highlight");
  } else {
    document.getElementById("total").classList.remove("highlight");
  }

  if (checkFreeShipping(cartTotal)) {
    message += "🚚 Free shipping included!";
  }

  document.getElementById("message").textContent = message;
}

//forms

document.getElementById("promo-form").addEventListener("submit", function(event) {
  event.preventDefault();
  let promoCode = document.getElementById("promo-code").value;
  if (promoCode === "BLACKFRIDAY") {
    cartTotal *= 0.8; // Apply 20% discount
    updateCart();
    document.getElementById("message").textContent = "🎊 Promo code applied successfully!";
  } else {
    document.getElementById("message").textContent = "⚠️ Invalid promo code.";
  }
});


// Form validation for promo code
document.getElementById("promo-form").addEventListener("submit", function(event) {
  event.preventDefault();
  let promoCodeInput = document.getElementById("promo-code");
  let promoCode = promoCodeInput.value.trim();
  if (promoCode === "") {
    document.getElementById("message").textContent = "⚠️ Please enter a promo code.";
    promoCodeInput.focus();
    return;
  }
  if (promoCode === "BLACKFRIDAY") {
    cartTotal *= 0.8; // Apply 20% discount
    updateCart();
    document.getElementById("message").textContent = "🎊 Promo code applied successfully!";
  } else {
    document.getElementById("message").textContent = "⚠️ Invalid promo code.";
  }
});

// Add color change to textarea on focus (click)
const textarea = document.querySelector("textarea");
if (textarea) {
  textarea.addEventListener("focus", function() {
    textarea.style.backgroundColor = "#94cfa1ff";
  });
  textarea.addEventListener("blur", function() {
    textarea.style.backgroundColor = "";
  });
}

// Checkout Function 
function checkout() {
  if (cartTotal >= 150 && !discountApplied) {
    let discountedTotal = cartTotal * 0.8; // Apply 20% discount
    document.getElementById("total").textContent =
      `Discounted Total (20% off): $${discountedTotal.toFixed(2)}`;
    document.getElementById("total").classList.add("discounted");
    document.getElementById("message").textContent =
      "🎊 Discount applied successfully!";
    discountApplied = true;
  } else if (cartTotal < 150) {
    document.getElementById("message").textContent =
      "⚠️ Add items worth $150 or more to get a 20% discount.";
  } else {
    document.getElementById("message").textContent =
      "✅ Discount already applied.";
  }
}

