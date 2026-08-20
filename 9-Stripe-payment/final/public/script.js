const payBtn = document.getElementById("payBtn");

payBtn.addEventListener("click", async () => {
    const items = [
        {
            productId: "6a74dd01bc6d4d25cf047155",
            quantity: 2,
            productName: "Wireless Headphones",
        },
        {
            productId: "6a74dd6ebc6d4d25cf047157",
            quantity: 1,
            productName: "Smartwatch",
        },
    ];

    try {
        const response = await axios.post("/api/payments/checkout", { items });
        const data = response.data;

        const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            order_id: data.orderId,

            name: "Laxmi Stores",
            description: "Everything will be delivered at your doorstep",

            handler: (response) => {
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
        },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
    } catch (error) {
        console.error("Checkout failed:", error.response?.data || error.message);
        alert("Payment failed. Please try again.");
    }
});

// Cart behavior is kept separate from the existing checkout flow.
(() => {
    const cart = [];
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cart-count");
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("total");
    const clearCartBtn = document.getElementById("clearCartBtn");

    const formatPrice = (price) => `₹${price}`;

    const renderCart = () => {
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartTotal = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        cartCount.textContent = itemCount;
        subtotal.textContent = formatPrice(cartTotal);
        total.textContent = formatPrice(cartTotal);

        if (cart.length === 0) {
            cartItems.innerHTML = '<li class="empty-cart">Your cart is empty.</li>';
            return;
        }

        cartItems.innerHTML = cart
            .map(
                (item) => `
                    <li class="cart-item">
                        <div>
                            <strong>${item.name}</strong>
                            <span>${item.quantity} × ${formatPrice(item.price)}</span>
                        </div>
                        <button class="remove-btn" type="button" data-remove-id="${item.id}">
                            Remove
                        </button>
                    </li>`
            )
            .join("");
    };

    document.querySelectorAll(".add-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const product = button.closest(".product-card");
            const id = product.dataset.id;
            const existingItem = cart.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id,
                    name: product.dataset.name,
                    price: Number(product.dataset.price),
                    quantity: 1,
                });
            }

            renderCart();
        });
    });

    cartItems.addEventListener("click", (event) => {
        const removeButton = event.target.closest("[data-remove-id]");

        if (!removeButton) {
            return;
        }

        const itemIndex = cart.findIndex(
            (item) => item.id === removeButton.dataset.removeId
        );

        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            renderCart();
        }
    });

    clearCartBtn.addEventListener("click", () => {
        cart.length = 0;
        renderCart();
    });

    renderCart();
})();