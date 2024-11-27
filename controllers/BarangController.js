const Barang = require("../models/Barang");

// Create Barang
exports.createBarang = async (req, res) => {
  try {
    const barang = new Barang(req.body);
    const savedBarang = await barang.save();
    res.status(201).json({
      success: true,
      message: "Barang berhasil ditambahkan",
      data: barang,
    });
  } catch (error) {
    const errors = [];

    if (error.errors) {
      for (const [field, details] of Object.entries(error.errors)) {
        let code = "VALIDATION_ERROR";

        // Tentukan kode error berdasarkan kondisi
        if (details.kind === "required") {
          code = "REQUIRED";
        } else if (details.kind === "min") {
          code = "MINIMUM_VALUE";
        } else if (field === "tanggal_masuk") {
          code = "INVALID_DATE";
        }

        // Tambahkan pesan error ke array
        errors.push({
          field: field,
          code: code,
          message: details.message,
        });
      }
    }

    res.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors: errors,
    });
  }
};

// Get All Barang
exports.getAllBarang = async (req, res) => {
  try {
    // Ambil query parameter untuk pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Hitung total jumlah data
    const totalBarang = await Barang.countDocuments();
    const totalPages = Math.ceil(totalBarang / limit);

    // Ambil data dengan skip dan limit
    const barangList = await Barang.find().skip(skip).limit(limit);

    res.status(200).json({
      message: "Daftar barang berhasil diambil",
      data: barangList,
      pagination: {
        totalItems: totalBarang,
        currentPage: page,
        totalPages: totalPages,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil daftar barang",
      error: error.message,
    });
  }
};

// Get Single Barang by ID
exports.getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id);
    if (!barang) {
      return res.status(404).json({
        message: "Barang tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "Barang berhasil ditemukan",
      data: barang,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil barang",
      error: error.message,
    });
  }
};

// Update Barang by ID
exports.updateBarangById = async (req, res) => {
  try {
    const updatedBarang = await Barang.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBarang) {
      return res.status(404).json({
        message: "Barang tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "Barang berhasil diperbarui",
      data: updatedBarang,
    });
  } catch (error) {
    res.status(400).json({
      message: "Gagal memperbarui barang",
      error: error.message,
    });
  }
};

// Delete Barang by ID
exports.deleteBarangById = async (req, res) => {
  try {
    const deletedBarang = await Barang.findByIdAndDelete(req.params.id);
    if (!deletedBarang) {
      return res.status(404).json({
        message: "Barang tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "Barang berhasil dihapus",
      data: deletedBarang,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus barang",
      error: error.message,
    });
  }
};
