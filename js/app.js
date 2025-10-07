function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}


function showToast(message, color = "bg-pink-600") {
  const toast = document.createElement("div");
  toast.className = `${color} text-white text-sm px-4 py-2 rounded shadow-lg fixed bottom-4 right-4 animate-bounce`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}


let cart = loadData("cart");


function updateCartCount() {
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = total;
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const name = e.target.dataset.name;
    const price = parseInt(e.target.dataset.price);
    const existing = cart.find((item) => item.name === name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    saveData("cart", cart);
    updateCartCount();
    showToast(`🧁 ${name} agregado al carrito`);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");
  const clearCart = document.getElementById("clearCart");

  if (cartList) {
    const renderCart = () => {
      cartList.innerHTML = "";
      let total = 0;

      if (cart.length === 0) {
        cartList.innerHTML = `<li class="py-4 text-gray-500">Tu carrito está vacío 🧺</li>`;
        cartTotal.textContent = "";
        return;
      }

      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartList.innerHTML += `
          <li class="py-3 flex justify-between items-center border-b">
            <span>${item.name} (x${item.quantity})</span>
            <div class="flex items-center space-x-2">
              <span class="text-pink-700 font-semibold">$${(item.price * item.quantity).toLocaleString()}</span>
              <button class="text-red-500 hover:text-red-700 remove-item" data-index="${index}">🗑</button>
            </div>
          </li>`;
      });

      cartTotal.textContent = `Total: $${total.toLocaleString()}`;
    };

    renderCart();

    cartList.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        saveData("cart", cart);
        renderCart();
        updateCartCount();
      }
    });

    clearCart.addEventListener("click", () => {
      cart = [];
      saveData("cart", cart);
      renderCart();
      updateCartCount();
      showToast("🧹 Carrito vaciado", "bg-gray-500");
    });
  }
});

updateCartCount();



function calcPrice() {
  const size = document.getElementById("size").value;
  const flavor = document.getElementById("flavor").value;
  const message = document.getElementById("message").value.trim();
  const price = parseInt(size) * 1000 + 5000;

  const priceDisplay = document.getElementById("price");
  priceDisplay.textContent = `Precio estimado: $${price.toLocaleString()}`;

 
  const personalizedCake = {
    name: `Torta ${flavor} (${size} porciones)`,
    price: price,
    message: message || "Sin mensaje",
    quantity: 1
  };

  localStorage.setItem("personalizedCake", JSON.stringify(personalizedCake));
}


document.addEventListener("click", (e) => {
  if (e.target.id === "addPersonalized") {
    const cake = JSON.parse(localStorage.getItem("personalizedCake"));
    if (!cake) {
      alert("Primero calcula el precio antes de agregar al carrito 🍰");
      return;
    }
    cart.push(cake);
    saveData("cart", cart);
    updateCartCount();
    showToast("🎂 Torta personalizada agregada al carrito");
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const payBtn = document.getElementById("payButton");
  if (payBtn) {
    payBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      showToast("✅ Pago exitoso. Gracias por tu compra 💖");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const msg = document.getElementById("loginMsg");

      if (email === "cliente@example.com" && password === "123456") {
        msg.textContent = "✅ Inicio de sesión exitoso. Redirigiendo...";
        msg.className = "text-center text-green-600 mt-4";
        localStorage.setItem("user", JSON.stringify({ email }));
        setTimeout(() => window.location.href = "index.html", 1500);
      } else {
        msg.textContent = "❌ Correo o contraseña incorrectos.";
        msg.className = "text-center text-red-600 mt-4";
      }
    });
  }
});



document.addEventListener("click", (e) => {
  if (e.target.id === "logoutBtn") {
    localStorage.removeItem("user");
    showToast("👋 Sesión cerrada correctamente");
    setTimeout(() => window.location.href = "index.html", 1500);
  }
});



window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});