const express = require("express");
const db = require("./config/db");
const cors = require(cors);
const barangRoutes = require("./routes/BarangRoutes");

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/barang", barangRoutes);

db.then(() => {
  console.log("Berhasil connect ke mongoose db inventaris");
}).catch((error) => {
  console.log("Gagal connect ke mongoose " + error);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
