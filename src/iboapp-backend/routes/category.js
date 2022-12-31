const express = require("express");
const Category = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    console.log(category);
    res.json({ content: category, status: 200 });
  } catch (err) {
    res.json({ message: err, status: 500 });
  }
});

router.post("/add", async (req, res) => {
  try {
    const allCategory = await Category.find();
    allCategory.forEach((u) => {
      if (u.name == req.body.name) {
        res.json({ message: "Category already exist!", status: 400 });
        throw res;
      }
    });
    const category = new Category({
      name: req.body.name,
    });

    const saveCategory = await category.save();
    res.json({ content: saveCategory, status: 200 });
  } catch (err) {
    res.json({
      message: "Error had been occurred while adding category",
      status: 500,
    });
    throw err;
  }
});

router.post("/update", async (req, res) => {
  try {
    const updatedCategory = await Category.updateOne(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
        },
      }
    );
    res.json({ content: updatedCategory, status: 200 });
  } catch (err) {
    res.json({ message: err, status: 500 });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const deletedCategory = await Category.deleteOne({ _id: req.body.id });
    res.json({ content: deletedCategory, status: 200 });
  } catch (err) {
    res.send({ message: err, status: 500 });
  }
});

module.exports = router;
