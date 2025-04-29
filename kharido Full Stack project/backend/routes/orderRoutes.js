const express = require('express');
const Order = require('../models/ordersmodel');
const router = express.Router();

// 📌 Create a new order
router.post('/', async (req, res) => {
    try {
        const { user, items, totalPrice } = req.body;

        // ✅ Validate request body
        if (!user || !items || !Array.isArray(items) || items.length === 0 || totalPrice === undefined) {
            return res.status(400).json({ error: "Missing required order details." });
        }

        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 📌 Get orders by user ID
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId })
            .populate('items.product', 'name price itemImage') // ✅ Populate product details
            .populate('user', 'name email'); // ✅ Optionally populate user details

        if (!orders.length) {
            return res.status(404).json({ error: "No orders found for this user." });
        }

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching orders." });
    }
});

router.delete("/:orderId", async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);

        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error while deleting order" });
    }
});


module.exports = router;
