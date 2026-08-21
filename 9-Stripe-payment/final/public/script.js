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

            handler: async (paymentResponse) => {

            console.log("Payment successful:", paymentResponse);

            const response = await axios.post("/api/payments/verify",{
                razorpay_payment_id : paymentResponse.razorpay_payment_id,
                razorpay_order_id : paymentResponse.razorpay_order_id,
                razorpay_signature : paymentResponse.razorpay_signature
            });

            console.log("Payment verification response:", response.data);
            
            // window.location.href = "./order.html";
            //console.log("payment successful");
        },
        modal: {
            ondismiss: () => {
                console.log("Payment modal dismissed");
            }
        }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
    } catch (error) {
        console.error("Checkout failed:", error.response?.data || error.message);
        alert("Payment failed. Please try again.");
    }
});

