const express = require('express');
const Item = require('../models/items.model');
const router = express.Router();

router.get('/', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

router.get('/veg', async (req, res) => {
    const items = await Item.find({category:"vegetables"});
    res.json(items);
});

router.get('/munchies', async (req, res) => {
    const items = await Item.find({category:"munchies"});
    res.json(items);
});

router.get('/frozen', async (req, res) => {
    const items = await Item.find({category:"frozen"});
    res.json(items);
});

router.get('/bakery', async (req, res) => {
    const items = await Item.find({category:"bakery"});
    res.json(items);
});

router.get("/search", async (req, res) => {
    const query = req.query.q;
    try {
      const results = await Item.find({ name: { $regex: query, $options: "i" } }); // Case-insensitive search
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.post('/add', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        itemImage: req.body.itemImage,
        category: req.body.category
    });
    try {
        const newItem = await item.save();
        res.status(201).json({ newItem, message: 'Item Added Successfully.' });
    } catch (error) {
        res.send({ message: error.message });
    }
});

router.put("/update/:id", async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, { name: req.body.name });
    res.json({ message: "Item updated!" });
  });
  
  // Delete an item
router.delete("/delete/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted!" });
  });

module.exports = router;
