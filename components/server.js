const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect("mongodb://localhost:27017/productDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// สร้าง Schema
const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  expiryDate: Date,
  category: String,
  storage: String,
  quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

// Multer สำหรับอัปโหลดไฟล์
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API สำหรับเพิ่มสินค้า
app.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { name, expiryDate, category, storage, quantity } = req.body;
    const image = req.file ? req.file.buffer.toString("base64") : "";

    const newProduct = new Product({
      image,
      name,
      expiryDate,
      category,
      storage,
      quantity,
    });

    await newProduct.save();
    res.status(201).send("Product added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// API ดึงข้อมูลสินค้า
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// API แก้ไขสินค้า
app.put("/edit-product/:id", async (req, res) => {
  try {
    const { name, expiryDate, category, storage, quantity } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      expiryDate,
      category,
      storage,
      quantity,
    });
    res.send("Product updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// API ลบสินค้า
app.delete("/delete-product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Product deleted successfully");
});

app.listen(5000, () => console.log("Server running on port 5000"));
