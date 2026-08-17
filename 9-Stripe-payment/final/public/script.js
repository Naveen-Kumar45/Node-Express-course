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

            name: "Laxmi Teacher Store",
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