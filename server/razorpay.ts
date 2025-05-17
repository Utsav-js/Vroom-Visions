import Razorpay from "razorpay";

// Replace with your actual Razorpay Key ID and Key Secret
const razorpay = new Razorpay({
  key_id: "rzp_test_dHkauYoJzkvNij",
  key_secret: "gnXguBSM8RDG54KHJxuiuEG1",
});

export const createRazorpayOrder = async (amount: number, currency: string, receipt: string) => {
  const options = {
    amount: amount, // amount in the smallest currency unit
    currency: currency,
    receipt: receipt,
    notes: {
      // Add any notes here
    },
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};
