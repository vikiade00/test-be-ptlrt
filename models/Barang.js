const mongoose = require("mongoose");

// Schema Barang
const barangSchema = new mongoose.Schema({
  nama_barang: {
    type: String,
    required: [true, "Nama barang wajib diisi."],
  },
  kategori_barang: {
    type: String,
    enum: ["Elektronik", "Pakaian", "Makanan", "Lainnya"],
    required: [true, "Kategori barang wajib diisi."],
  },
  jumlah_barang: {
    type: Number,
    required: [true, "Jumlah barang wajib diisi."],
    min: [1, "Jumlah barang harus minimal 1."],
    validate: {
      validator: Number.isInteger,
      message: "Jumlah barang harus berupa angka positif.",
    },
  },
  harga_per_unit: {
    type: Number,
    required: [true, "Harga per unit wajib diisi."],
    min: [100, "Harga per unit harus minimal Rp100."],
  },
  tanggal_masuk: {
    type: Date,
    required: [true, "Tanggal masuk wajib diisi."],
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Tanggal masuk tidak boleh lebih dari hari ini.",
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Barang = mongoose.model("Barang", barangSchema);

module.exports = Barang;
