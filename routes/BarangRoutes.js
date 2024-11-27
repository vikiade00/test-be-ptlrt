const express = require("express");
const router = express.Router();
const BarangController = require("../controllers/BarangController");

// Rute CRUD Barang
router.post("/", BarangController.createBarang);
router.get("/", BarangController.getAllBarang);
router.get("/:id", BarangController.getBarangById);
router.put("/:id", BarangController.updateBarangById);
router.delete("/:id", BarangController.deleteBarangById);

module.exports = router;
