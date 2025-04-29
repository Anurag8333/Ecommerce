const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: 'your_key_id', // Replace with your Razorpay Key ID
    key_secret: 'your_key_secret' // Replace with your Razorpay Key Secret
});

// Route to create an order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;

        const options = {
            amount: amount * 100, // Amount in smallest currency unit (e.g., paise for INR)
            currency: currency || 'INR',
            receipt: receipt || 'receipt#1',
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Route to verify payment signature
router.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
        .createHmac('sha256', 'your_key_secret') // Replace with your Razorpay Key Secret
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    if (generatedSignature === razorpay_signature) {
        res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
});

module.exports = router;